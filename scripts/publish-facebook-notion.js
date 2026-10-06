const https = require('https');
const fs = require('fs');
const path = require('path');

// 1. CONFIGURATION & CHARGEMENT AUTOMATIQUE DES VARIABLES
const envFilePath = path.join(__dirname, '..', '.env.facebook');
if (fs.existsSync(envFilePath)) {
  const envContent = fs.readFileSync(envFilePath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...values] = trimmed.split('=');
      if (key && values.length > 0 && process.env[key.trim()] === undefined) {
        process.env[key.trim()] = values.join('=').trim();
      }
    }
  });
}

const NOTION_TOKEN = process.env.NOTION_API_KEY || '';
const NOTION_DB_ID = process.env.NOTION_DATABASE_ID || '3ea24d1bf2a781f89aa7f1bf219c3363';

// Identifiants Meta / Facebook Graph API
const FB_PAGE_ACCESS_TOKEN_D514 = process.env.FB_PAGE_ACCESS_TOKEN_D514 || '';
const FB_PAGE_ID_D514 = process.env.FB_PAGE_ID_D514 || '';

const FB_PAGE_ACCESS_TOKEN_AIZEEEH = process.env.FB_PAGE_ACCESS_TOKEN_AIZEEEH || '';
const FB_PAGE_ID_AIZEEEH = process.env.FB_PAGE_ID_AIZEEEH || '';

const GRAPH_API_VERSION = 'v20.0';
const IS_DRY_RUN = process.env.DRY_RUN === 'true';

// 2. UTILITAIRES HTTPS
function requestHttps(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      if (Buffer.isBuffer(body)) {
        req.write(body);
      } else if (typeof body === 'string') {
        req.write(body);
      } else {
        req.write(JSON.stringify(body));
      }
    }
    req.end();
  });
}

function notionApi(endpoint, method = 'GET', body = null) {
  const options = {
    hostname: 'api.notion.com',
    path: endpoint,
    method,
    headers: {
      'Authorization': `Bearer ${NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    }
  };
  return requestHttps(options, body);
}

// 3. ENVOI MULTIPART POUR IMAGE LOCALE VERS FACEBOOK (/photos)
async function uploadLocalPhotoToFacebook({ pageId, accessToken, message, localImagePath }) {
  const boundary = '----FacebookMultipartBoundary' + Date.now().toString(16);
  const fileBuffer = fs.readFileSync(localImagePath);
  const fileName = path.basename(localImagePath);
  const mimeType = fileName.endsWith('.png') ? 'image/png' : 'image/jpeg';

  const parts = [];

  // Champ message / caption
  parts.push(Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="message"\r\n\r\n` +
    `${message}\r\n`
  ));

  // Champ access_token
  parts.push(Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="access_token"\r\n\r\n` +
    `${accessToken}\r\n`
  ));

  // Champ source (binaire image)
  parts.push(Buffer.from(
    `--${boundary}\r\n` +
    `Content-Disposition: form-data; name="source"; filename="${fileName}"\r\n` +
    `Content-Type: ${mimeType}\r\n\r\n`
  ));
  parts.push(fileBuffer);
  parts.push(Buffer.from(`\r\n--${boundary}--\r\n`));

  const payload = Buffer.concat(parts);

  return requestHttps({
    hostname: 'graph.facebook.com',
    path: `/${GRAPH_API_VERSION}/${pageId}/photos`,
    method: 'POST',
    headers: {
      'Content-Type': `multipart/form-data; boundary=${boundary}`,
      'Content-Length': payload.length
    }
  }, payload);
}

// 4. META GRAPH API (Publication de Post avec ou sans Visuel + Commentaire)
async function publishToFacebookPage({ pageId, accessToken, message, link, imageUrl, localImagePath, firstComment }) {
  if (IS_DRY_RUN || !accessToken) {
    console.log(`[DRY RUN / Simulation] Publication Facebook sur Page ID: ${pageId || 'PAGE_ID_NON_DEFINI'}`);
    if (localImagePath) console.log(`- Image Locale Jointe : ${localImagePath}`);
    if (imageUrl) console.log(`- Image URL Notion Jointe : ${imageUrl}`);
    console.log(`- Message : \n${message}\n`);
    if (firstComment) console.log(`- Premier commentaire : "${firstComment}"\n`);
    return { success: true, simulated: true, postId: 'simulated_fb_post_id_123' };
  }

  let postRes;
  let targetForCommentId;

  // CAS 1 : Image hébergée sur Notion ou URL externe (Priorité 1 : ce qui est dans Notion)
  if (imageUrl) {
    console.log(`🖼️ Publication avec l'image issue de Notion : ${imageUrl.substring(0, 80)}...`);
    const photoParams = new URLSearchParams();
    photoParams.append('url', imageUrl);
    photoParams.append('message', message);
    photoParams.append('access_token', accessToken);

    postRes = await requestHttps({
      hostname: 'graph.facebook.com',
      path: `/${GRAPH_API_VERSION}/${pageId}/photos`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, photoParams.toString());

    if (postRes.status !== 200 || (!postRes.data.post_id && !postRes.data.id)) {
      throw new Error(`Erreur Facebook Photo URL: ${JSON.stringify(postRes.data)}`);
    }
    targetForCommentId = postRes.data.post_id || postRes.data.id;
  }
  // CAS 2 : Image locale présente (PNG / JPG)
  else if (localImagePath && fs.existsSync(localImagePath)) {
    console.log(`📸 Téléversement du visuel local : ${localImagePath}...`);
    postRes = await uploadLocalPhotoToFacebook({ pageId, accessToken, message, localImagePath });
    if (postRes.status !== 200 || (!postRes.data.post_id && !postRes.data.id)) {
      throw new Error(`Erreur Facebook Photo Upload: ${JSON.stringify(postRes.data)}`);
    }
    targetForCommentId = postRes.data.post_id || postRes.data.id;
  }
  // CAS 3 : Publication texte + lien standard (/feed)
  else {
    const postParams = new URLSearchParams();
    postParams.append('message', message);
    postParams.append('access_token', accessToken);
    if (link) postParams.append('link', link);

    postRes = await requestHttps({
      hostname: 'graph.facebook.com',
      path: `/${GRAPH_API_VERSION}/${pageId}/feed`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, postParams.toString());

    if (postRes.status !== 200 || !postRes.data.id) {
      throw new Error(`Erreur Facebook Post: ${JSON.stringify(postRes.data)}`);
    }
    targetForCommentId = postRes.data.id;
  }

  console.log(`✅ Post publié sur Facebook avec succès ! ID: ${targetForCommentId}`);

  // Poster le Premier Commentaire
  if (firstComment && targetForCommentId) {
    const commentParams = new URLSearchParams();
    commentParams.append('message', firstComment);
    commentParams.append('access_token', accessToken);

    const commentRes = await requestHttps({
      hostname: 'graph.facebook.com',
      path: `/${GRAPH_API_VERSION}/${targetForCommentId}/comments`,
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }, commentParams.toString());

    if (commentRes.status === 200 && commentRes.data.id) {
      console.log(`💬 Premier commentaire posté ! ID: ${commentRes.data.id}`);
    } else {
      console.warn(`⚠️ Échec du premier commentaire: ${JSON.stringify(commentRes.data)}`);
    }
  }

  return { success: true, postId: targetForCommentId };
}

// Correspondance automatique des fichiers locaux par Jour
function findLocalImageForTitle(title) {
  const folder = path.join(__dirname, '..', 'public', 'marketing', 'facebook');
  if (!fs.existsSync(folder)) return null;

  if (title.includes('J-7')) {
    const p = path.join(folder, 'j7_mecano.jpg');
    if (fs.existsSync(p)) return p;
  }
  if (title.includes('J-6')) {
    const p = path.join(folder, 'j6_pharmacie.jpg');
    if (fs.existsSync(p)) return p;
  }
  if (title.includes('J-5')) {
    const p = path.join(folder, 'j5_quiz.jpg');
    if (fs.existsSync(p)) return p;
  }
  if (title.includes('J-4')) {
    const p = path.join(folder, 'j4_gastronomie.jpg');
    if (fs.existsSync(p)) return p;
  }
  if (title.includes('J-3')) {
    const p = path.join(folder, 'j3_transport.jpg');
    if (fs.existsSync(p)) return p;
  }
  if (title.includes('J-2')) {
    const p = path.join(folder, 'j2_teasing.jpg');
    if (fs.existsSync(p)) return p;
  }
  if (title.includes('J-1')) {
    const p = path.join(folder, 'j1_revelation.jpg');
    if (fs.existsSync(p)) return p;
  }
  if (title.includes('JOUR J')) {
    const p = path.join(folder, 'jour_j_lancement.jpg');
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// 5. PIPELINE PRINCIPAL DE SYNCHRONISATION
async function main() {
  console.log('--- 🚀 Démarrage du Robot d\'Automatisation Facebook AIZEEEH ---');
  const now = new Date();
  console.log(`Heure actuelle : ${now.toISOString()} | Mode Simulation (DRY_RUN) : ${IS_DRY_RUN}`);

  const dbQuery = await notionApi(`/v1/databases/${NOTION_DB_ID}/query`, 'POST', {});
  if (!dbQuery.data || !dbQuery.data.results) {
    console.error('Impossible de lire la base Notion :', dbQuery);
    return;
  }

  const pages = dbQuery.data.results;
  console.log(`Nombre total de publications dans le calendrier : ${pages.length}`);

  let scheduledOrDueCount = 0;

  for (const page of pages) {
    const props = page.properties;
    const title = props['Nom du Post']?.title?.[0]?.plain_text || 'Sans titre';
    const status = props['Statut']?.status?.name || 'Not started';
    const rawDate = props['Date']?.date?.start;
    const canal = props['Canal']?.select?.name || 'Page DIGITAL 514';
    const firstCommentProp = props['Premier Commentaire']?.rich_text?.[0]?.plain_text || '';

    // Vérifier si une image est attachée dans la propriété Notion "Visuel" (type files) ou dans la page
    let notionImageUrl = null;
    if (props['Visuel']?.files?.length > 0) {
      const fileObj = props['Visuel'].files[0];
      notionImageUrl = fileObj.file?.url || fileObj.external?.url || null;
    }

    const texteDeon = props['Texte (Déon)']?.select?.name || 'À vérifier';
    const designBidy = props['Design (Bidy)']?.select?.name || 'À faire';

    const postDate = rawDate ? new Date(rawDate) : null;
    const isDateReached = !postDate || postDate <= now;

    console.log(`\n📌 [${title}] | Texte(Déon): ${texteDeon} | Design(Bidy): ${designBidy} | Validation(Statut): ${status} | Date: ${rawDate || 'N/A'}`);

    // RÈGLE STRICTE : Seul le passage en "In progress" par Sylvio ET la date atteinte déclenchent la publication
    if (status === 'In progress' && isDateReached) {
      scheduledOrDueCount++;
      console.log(`-> 🔔 Validé par Sylvio ("In progress") & Date atteinte : Post prêt pour diffusion immédiate !`);

      // Récupérer le contenu des blocs (Texte + éventuel bloc image collé dans Notion)
      const blocksRes = await notionApi(`/v1/blocks/${page.id}/children`, 'GET');
      let postMessage = '';

      if (blocksRes.data && blocksRes.data.results) {
        const paragraphs = [];
        for (const b of blocksRes.data.results) {
          if (b.type === 'paragraph') {
            const text = b.paragraph.rich_text.map(t => t.plain_text).join('');
            if (text.trim().length > 0) paragraphs.push(text);
          }
          if (b.type === 'image' && !notionImageUrl) {
            notionImageUrl = b.image.file?.url || b.image.external?.url || null;
          }
        }
        postMessage = paragraphs.join('\n\n---\n\n');
      }

      if (!postMessage) {
        console.warn('⚠️ Aucun texte trouvé dans la page Notion, post ignoré.');
        continue;
      }

      const localImagePath = findLocalImageForTitle(title);

      let pageId = FB_PAGE_ID_D514;
      let pageAccessToken = FB_PAGE_ACCESS_TOKEN_D514;

      if (canal.includes('AIZÉ') || canal.includes('Aizeeeh')) {
        pageId = FB_PAGE_ID_AIZEEEH;
        pageAccessToken = FB_PAGE_ACCESS_TOKEN_AIZEEEH;
      }

      try {
        const publishResult = await publishToFacebookPage({
          pageId,
          accessToken: pageAccessToken,
          message: postMessage,
          link: postMessage.includes('aizeeeh.digital514.mg') ? 'https://aizeeeh.digital514.mg' : undefined,
          imageUrl: notionImageUrl,
          localImagePath,
          firstComment: firstCommentProp
        });

        if (publishResult.success && !publishResult.simulated) {
          const fbUrl = `https://www.facebook.com/${publishResult.postId}`;
          await notionApi(`/v1/pages/${page.id}`, 'PATCH', {
            properties: {
              'Statut': {
                status: { name: 'Done' }
              },
              'Lien Facebook': {
                url: fbUrl
              }
            }
          });
          console.log(`✅ Statut Notion mis à jour vers "Done" et Lien Facebook enregistré : ${fbUrl}`);
        }
      } catch (err) {
        console.error(`❌ Erreur lors de la publication de ${title}:`, err.message);
      }
    }
  }

  if (scheduledOrDueCount === 0) {
    console.log('\n✨ Aucun post à publier immédiatement (tous les statuts sont à jour ou futurs).');
  }
}

main().catch(console.error);
