# Guide d'installation des MCPs — AIZÉ

## Configuration
Le fichier de configuration se trouve dans :
`.agents/mcp_config.json`

## État des MCPs

| MCP | Statut | Token requis |
|-----|--------|-------------|
| Filesystem | ✅ Prêt | Aucun |
| Chrome DevTools | ✅ Prêt | Aucun |
| GitHub | ⏳ Token requis | GitHub PAT |
| Supabase | ⏳ Token requis | URL + Anon Key |
| Notion | ⏳ Token requis | Integration Token |
| Lovable | ⏳ À tester | Aucun (local) |

---

## Obtenir les tokens

### GitHub Personal Access Token (PAT)
1. Aller sur https://github.com/settings/tokens?type=beta
2. Cliquer **Generate new token** (Fine-grained).
3. Nom : `AIZE-Antigravity`
4. Permissions recommandées :
   - **Repository access** : sélectionner le repo AIZÉ
   - **Contents** : Read and write
   - **Issues** : Read and write
   - **Pull requests** : Read and write
   - **Metadata** : Read
5. Copier le token généré.
6. Remplacer `REMPLACER_PAR_TON_GITHUB_PAT` dans `.agents/mcp_config.json`.

### Supabase (URL + Anon Key)
1. Aller sur https://supabase.com/dashboard
2. Ouvrir le projet AIZÉ.
3. Aller dans **Settings > API**.
4. Copier :
   - **Project URL** (ex: `https://xxxxxxx.supabase.co`)
   - **anon public key** (pas la service_role !)
5. Remplacer dans `.agents/mcp_config.json` :
   - `REMPLACER_PAR_TON_SUPABASE_URL/rest/v1` → `https://xxxxxxx.supabase.co/rest/v1`
   - `REMPLACER_PAR_TA_SUPABASE_ANON_KEY` → ta clé anon

### Notion Integration Token
1. Aller sur https://www.notion.so/my-integrations
2. Cliquer **New integration**.
3. Nom : `AIZE-Antigravity`
4. Capabilities : **Read content**, **Update content**, **Insert content**.
5. Copier le **Internal Integration Secret**.
6. Remplacer `REMPLACER_PAR_TON_NOTION_TOKEN` dans `.agents/mcp_config.json`.
7. **Important** : dans Notion, partager les pages/bases de données
   concernées avec l'intégration (clic `...` > Connexions > AIZE-Antigravity).

---

## Après avoir ajouté les tokens
1. Redémarrer Antigravity pour recharger les MCPs.
2. Vérifier les MCPs actifs via **Additional Options (...) > MCP Servers**.
3. Tester chaque MCP avec une commande simple.

## Sécurité
- Ne jamais commiter `.agents/mcp_config.json` s'il contient des tokens.
- Ajouter `.agents/mcp_config.json` à `.gitignore`.
