const fs = require('fs');
const path = require('path');

// Couleurs officielles
const NAVY = '#0a1931';
const CORAL = '#ff6b6b';
const WHITE = '#ffffff';
const CREME = '#ffeac1';
const GREY = '#b0b8c4';

const visuals = [
  {
    filename: 'j7_mecanicien_moramanga.svg',
    title: 'J-7 : Mécaniciens Moto',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a1931" />
          <stop offset="100%" stop-color="#060e1d" />
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.4" />
        </filter>
      </defs>

      <!-- Fond -->
      <rect width="1080" height="1080" fill="url(#bgGrad)" />

      <!-- Cercles d'ambiance géométriques -->
      <circle cx="940" cy="140" r="320" fill="${CORAL}" opacity="0.08" />
      <circle cx="120" cy="960" r="260" fill="${CREME}" opacity="0.05" />

      <!-- Badge En-tête -->
      <g transform="translate(80, 80)">
        <rect width="320" height="56" rx="28" fill="${CORAL}" fill-opacity="0.15" stroke="${CORAL}" stroke-width="2"/>
        <text x="160" y="36" fill="${CORAL}" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="22" text-anchor="middle" letter-spacing="2">ENQUÊTE LOCALE • 514</text>
      </g>

      <!-- Tag Ville -->
      <text x="1000" y="118" fill="${GREY}" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="24" text-anchor="end">📍 MORAMANGA</text>

      <!-- Illustration Centrale -->
      <g transform="translate(540, 430)" filter="url(#shadow)">
        <!-- Disque de fond -->
        <circle cx="0" cy="0" r="190" fill="#112445" stroke="#1d355e" stroke-width="6"/>
        <circle cx="0" cy="0" r="160" fill="${CORAL}" opacity="0.1"/>

        <!-- Clé mécanique et Pin croisés stylisés -->
        <path d="M-50,60 L50,-40 M-30,80 L30,-20 M-60,50 L40,-50" stroke="${CORAL}" stroke-width="28" stroke-linecap="round" />
        <circle cx="-65" cy="75" r="28" fill="none" stroke="${CORAL}" stroke-width="18" />
        
        <!-- Pin Location Corail & Blanc -->
        <g transform="translate(25, -20)">
          <path d="M0,-80 C44,-80 80,-44 80,0 C80,55 0,110 0,110 C0,110 -80,55 -80,0 C-80,-44 -44,-80 0,-80 Z" fill="${CORAL}" />
          <circle cx="0" cy="-5" r="30" fill="${WHITE}" />
        </g>
      </g>

      <!-- Carte Question Principale -->
      <g transform="translate(80, 680)">
        <rect width="920" height="240" rx="24" fill="#0f203c" stroke="#1a3156" stroke-width="2" filter="url(#shadow)" />
        
        <text x="460" y="75" fill="${CREME}" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="34" text-anchor="middle" letter-spacing="1">
          SENDRA NY MAFY HARIVA ? 🏍️
        </text>

        <text x="460" y="140" fill="${WHITE}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="44" text-anchor="middle">
          AIZA NO MISY MÉCANO AFAKA
        </text>
        <text x="460" y="195" fill="${CORAL}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="44" text-anchor="middle">
          MANAO DÉPANNAGE MAIKA ?
        </text>
      </g>

      <!-- Bas de page : Appel à l'action -->
      <g transform="translate(540, 990)">
        <text x="0" y="0" fill="${GREY}" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="24" text-anchor="middle">
          👇 Zarao amin'ny commentaire ny adiresy sy numéro fantatrareo !
        </text>
      </g>
    </svg>`
  },
  {
    filename: 'j6_pharmacie_garde_moramanga.svg',
    title: 'J-6 : Pharmacie de Garde',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
      <defs>
        <linearGradient id="bgGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#071224" />
          <stop offset="100%" stop-color="#020710" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="16" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <filter id="shadow2" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.5" />
        </filter>
      </defs>

      <rect width="1080" height="1080" fill="url(#bgGrad2)" />

      <!-- Ciel nocturne étoilé subtil -->
      <circle cx="200" cy="180" r="3" fill="#ffffff" opacity="0.6"/>
      <circle cx="850" cy="140" r="4" fill="#ffffff" opacity="0.7"/>
      <circle cx="920" cy="300" r="3" fill="#ffffff" opacity="0.4"/>
      <circle cx="150" cy="450" r="3.5" fill="#ffffff" opacity="0.5"/>

      <!-- Badge Urgent -->
      <g transform="translate(80, 80)">
        <rect width="360" height="56" rx="28" fill="${CORAL}" fill-opacity="0.2" stroke="${CORAL}" stroke-width="2"/>
        <text x="180" y="36" fill="${CORAL}" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="20" text-anchor="middle" letter-spacing="2">URGENCE SANTÉ • MORAMANGA</text>
      </g>

      <!-- Symbole Pharmacie Lumineux -->
      <g transform="translate(540, 410)" filter="url(#shadow2)">
        <circle cx="0" cy="0" r="190" fill="#0c1f3d" stroke="#16325c" stroke-width="4"/>
        
        <!-- Croix Verte/Corail lumineuse -->
        <g filter="url(#glow)">
          <rect x="-35" y="-110" width="70" height="220" rx="16" fill="${CORAL}" />
          <rect x="-110" y="-35" width="220" height="70" rx="16" fill="${CORAL}" />
        </g>
        <rect x="-24" y="-95" width="48" height="190" rx="12" fill="${WHITE}" />
        <rect x="-95" y="-24" width="190" height="48" rx="12" fill="${WHITE}" />
        
        <!-- Croissant de Lune / Nuit -->
        <path d="M70,-110 A 50 50 0 0 0 120,-60 A 60 60 0 1 1 70,-110 Z" fill="${CREME}" opacity="0.9" />
      </g>

      <!-- Carte Question Principale -->
      <g transform="translate(80, 680)">
        <rect width="920" height="240" rx="24" fill="#0c1d36" stroke="#1c3761" stroke-width="2" filter="url(#shadow2)" />
        
        <text x="460" y="70" fill="${CREME}" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="32" text-anchor="middle" letter-spacing="1">
          MARARY TAMPOKA AMIN'NY ALINA ? 💊
        </text>

        <text x="460" y="138" fill="${WHITE}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="42" text-anchor="middle">
          PHARMACIE DE GARDE ANIO :
        </text>
        <text x="460" y="195" fill="${CORAL}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="44" text-anchor="middle">
          AHOANA NO FAHITA AZY ?
        </text>
      </g>

      <g transform="translate(540, 990)">
        <text x="0" y="0" fill="${GREY}" font-family="system-ui, -apple-system, sans-serif" font-weight="600" font-size="24" text-anchor="middle">
          Mbola mandeha mitsapa eny an-toerana ve sa efa manana numéro ? 👇
        </text>
      </g>
    </svg>`
  },
  {
    filename: 'j1_revelation_aizeeeh.svg',
    title: 'J-1 : Révélation Aizeeeh',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
      <defs>
        <linearGradient id="bgGradReveal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a1931" />
          <stop offset="100%" stop-color="#112548" />
        </linearGradient>
        <filter id="shadow3" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="20" stdDeviation="28" flood-color="#000000" flood-opacity="0.6" />
        </filter>
      </defs>

      <rect width="1080" height="1080" fill="url(#bgGradReveal)" />

      <!-- Cercles de rayonnement -->
      <circle cx="540" cy="460" r="360" fill="${CORAL}" opacity="0.04" />
      <circle cx="540" cy="460" r="260" fill="${CORAL}" opacity="0.08" />

      <!-- Header -->
      <g transform="translate(540, 110)">
        <text x="0" y="0" fill="${CREME}" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="24" text-anchor="middle" letter-spacing="4">DIGITAL 514 PRESENTE</text>
      </g>

      <!-- Logo Central AIZEEEH -->
      <g transform="translate(540, 460)" filter="url(#shadow3)">
        <!-- Carte Blanche Éclatante -->
        <rect x="-420" y="-220" width="840" height="440" rx="36" fill="${WHITE}" />

        <!-- Pin Géolocalisation Corail -->
        <g transform="translate(0, -70)">
          <path d="M0,-55 C30,-55 55,-30 55,0 C55,40 0,78 0,78 C0,78 -55,40 -55,0 C-55,-30 -30,-55 0,-55 Z" fill="${CORAL}" />
          <circle cx="0" cy="-5" r="20" fill="${WHITE}" />
        </g>

        <!-- Titre Aizeeeh -->
        <text x="0" y="80" fill="${NAVY}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="88" text-anchor="middle" letter-spacing="2">
          Aizeeeh<tspan fill="${CORAL}">.</tspan>
        </text>

        <!-- Slogan -->
        <text x="0" y="140" fill="#4a5568" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="24" text-anchor="middle" letter-spacing="1">
          L'ANNUAIRE LOCAL &amp; REPERE DE MORAMANGA
        </text>
      </g>

      <!-- Message Lancement Demain -->
      <g transform="translate(540, 830)">
        <rect x="-380" y="-40" width="760" height="80" rx="40" fill="${CORAL}" filter="url(#shadow3)" />
        <text x="0" y="12" fill="${WHITE}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="32" text-anchor="middle" letter-spacing="1">
          🚀 LANCEMENT OFFICIEL DEMAIN À 10H !
        </text>
      </g>

      <g transform="translate(540, 980)">
        <text x="0" y="0" fill="${CREME}" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="28" text-anchor="middle">
          🌐 aizeeeh.digital514.mg
        </text>
      </g>
    </svg>`
  },
  {
    filename: 'jour_j_lancement_officiel.svg',
    title: 'JOUR J : Ouverture de la Plateforme Aizeeeh',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1080 1080" width="1080" height="1080">
      <defs>
        <linearGradient id="bgGradJ" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="100%" stop-color="#f5f7fb" />
        </linearGradient>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="20" stdDeviation="30" flood-color="#0a1931" flood-opacity="0.15" />
        </filter>
      </defs>

      <rect width="1080" height="1080" fill="url(#bgGradJ)" />

      <!-- Bande supérieure Navy -->
      <path d="M0,0 L1080,0 L1080,240 L0,320 Z" fill="${NAVY}" />

      <!-- En-tête sur bandeau -->
      <g transform="translate(540, 100)">
        <rect x="-240" y="-30" width="480" height="60" rx="30" fill="${CORAL}" />
        <text x="0" y="10" fill="${WHITE}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="26" text-anchor="middle" letter-spacing="2">
          🎉 C'EST OFFICIEL &amp; EN LIGNE !
        </text>
      </g>

      <text x="540" y="210" fill="${CREME}" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="34" text-anchor="middle">
        Moramanga ao am-paosinao 100% Maimaim-poana 🇲🇬
      </text>

      <!-- Mockup Smartphone Central Stylisé -->
      <g transform="translate(540, 560)" filter="url(#cardShadow)">
        <!-- Coque du téléphone -->
        <rect x="-220" y="-230" width="440" height="460" rx="36" fill="${NAVY}" stroke="#1d355e" stroke-width="8" />
        <!-- Écran de l'application -->
        <rect x="-200" y="-210" width="400" height="420" rx="24" fill="${WHITE}" />

        <!-- App Header -->
        <rect x="-200" y="-210" width="400" height="70" rx="20" fill="${NAVY}" />
        <text x="0" y="-165" fill="${WHITE}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="24" text-anchor="middle">
          Aizeeeh<tspan fill="${CORAL}">.</tspan>
        </text>

        <!-- Barre de recherche mockup -->
        <rect x="-170" y="-120" width="340" height="46" rx="23" fill="#edf2f7" stroke="${GREY}" stroke-width="1.5" />
        <text x="-130" y="-91" fill="#718096" font-family="system-ui, -apple-system, sans-serif" font-weight="500" font-size="16">🔍 Mikaroka dokotera, garage, posy...</text>

        <!-- Grille 4 Catégories -->
        <g transform="translate(-160, -45)">
          <rect width="145" height="60" rx="12" fill="#fff5f5" stroke="${CORAL}" stroke-width="1.5"/>
          <text x="72" y="36" fill="${CORAL}" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="15" text-anchor="middle">🏥 Pharmacie</text>
        </g>
        <g transform="translate(15, -45)">
          <rect width="145" height="60" rx="12" fill="#f0f7ff" stroke="#3182ce" stroke-width="1.5"/>
          <text x="72" y="36" fill="#2b6cb0" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="15" text-anchor="middle">🔧 Mécanique</text>
        </g>
        <g transform="translate(-160, 25)">
          <rect width="145" height="60" rx="12" fill="#fffaf0" stroke="#dd6b20" stroke-width="1.5"/>
          <text x="72" y="36" fill="#c05621" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="15" text-anchor="middle">🍲 Sakafo / Resto</text>
        </g>
        <g transform="translate(15, 25)">
          <rect width="145" height="60" rx="12" fill="#f0fff4" stroke="#38a169" stroke-width="1.5"/>
          <text x="72" y="36" fill="#276749" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="15" text-anchor="middle">🚐 Taxi-brousse</text>
        </g>

        <!-- Carte établissement vérifié -->
        <g transform="translate(-170, 100)">
          <rect width="340" height="90" rx="16" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
          <circle cx="45" cy="45" r="24" fill="${CORAL}" opacity="0.15"/>
          <text x="45" y="52" fill="${CORAL}" font-size="22" text-anchor="middle">📍</text>
          <text x="85" y="38" fill="${NAVY}" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="16">Garage Central Moramanga</text>
          <text x="85" y="60" fill="#48bb78" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="13">✓ Vérifié • Ouvert</text>
          <rect x="250" y="26" width="75" height="38" rx="19" fill="${CORAL}"/>
          <text x="287" y="50" fill="${WHITE}" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" font-size="13" text-anchor="middle">Appel</text>
        </g>
      </g>

      <!-- Bouton CTA Principal -->
      <g transform="translate(540, 920)" filter="url(#cardShadow)">
        <rect x="-360" y="-45" width="720" height="90" rx="45" fill="${CORAL}" />
        <text x="0" y="12" fill="${WHITE}" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="34" text-anchor="middle" letter-spacing="1">
          👉 aizeeeh.digital514.mg
        </text>
      </g>

      <g transform="translate(540, 1025)">
        <text x="0" y="0" fill="#718096" font-family="system-ui, -apple-system, sans-serif" font-weight="700" font-size="22" text-anchor="middle">
          Tsy mila misoratra anarana • Maimaim-poana 100%
        </text>
      </g>
    </svg>`
  }
];

const outDir = path.join(__dirname, '..', 'public', 'marketing', 'facebook');
visuals.forEach(v => {
  fs.writeFileSync(path.join(outDir, v.filename), v.svg, 'utf8');
  console.log(`Visuel créé : ${v.filename}`);
});
console.log('Tous les visuels vectoriels Facebook ont été générés avec succès !');
