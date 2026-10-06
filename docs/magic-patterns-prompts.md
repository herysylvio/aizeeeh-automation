# Prompts Officiels Magic Patterns — AIZÉ Moramanga

## 🎨 Configuration Globale du Design System
- **Plateforme :** Mobile Web PWA (largeur viewport : 375px).
- **Style visuel :** Épuré, chaleureux, lisible en plein soleil, bords arrondis (`rounded-xl` à `rounded-2xl`).
- **Typographie :** Sans-serif moderne, haute lisibilité (Inter / Plus Jakarta Sans).
- **Palette chromatique stricte :**
  - **Fond & Cartes :** Blanc Pur (`#ffffff`)
  - **Typographie principale & Header :** Bleu Nuit Profond (`#0a1931`)
  - **Boutons CTA prioritaires & Éléments actifs :** Corail Vibrant (`#ff6b6b`)
  - **Bordures, séparateurs & Textes secondaires :** Gris Acier (`#b0b8c4`)
  - **Fonds de badges & Surlignages doux :** Crème Pêche (`#ffeac1`)

---

## 📦 Pack 1 : Découverte & Consultation (Cœur Grand Public)

```text
Design a clean, modern, mobile-first hyperlocal directory app called "AIZÉ" for Moramanga (Madagascar).
Target device: Mobile viewport (375px width).

Color Palette:
- Background: Pure White (#ffffff)
- Primary text & Dark elements: Midnight Navy (#0a1931)
- Primary Action & Accent: Vibrant Coral (#ff6b6b)
- Borders & Secondary text: Slate Grey (#b0b8c4)
- Warm Badges & Highlights: Soft Cream (#ffeac1)

Create 3 interconnected screens:

1. HOME SCREEN:
- Header: App logo 'AIZÉ' in Navy with a Coral pin icon. Subtitle: 'L'annuaire local de Moramanga' and location tag 'Moramanga Ville'.
- Search Bar: Prominent white card with #b0b8c4 border, search icon, placeholder: 'Rechercher un service, une pharmacie, un garage...'.
- Quick Emergency Bar: 2 alert pills with #ffeac1 cream background and Coral red icons: 'Pharmacies de garde' and 'Urgences & Sécurité'.
- Categories Grid (2 columns): White cards with subtle border, Navy titles, colorful icons:
  * Santé & Médecins
  * Transports (Bajaj / Taxi-brousse)
  * Hôtels & Hébergements
  * Restaurants & Snacks
  * Mécaniciens (Auto & Moto)
  * Services Publics & Mairie
- Bottom Navigation Bar (4 tabs): Accueil (active Coral), Catégories, Événements, Menu.

2. CATEGORY RESULTS SCREEN:
- Top bar with back arrow and title 'Santé & Médecins' in Midnight Navy (#0a1931).
- Quick Filter Pills: 'Tous', '✓ Vérifiés uniquement' (active with Navy background), 'Ouvert maintenant'.
- Service Cards:
  * White card with rounded corners and fine #b0b8c4 border.
  * Name in bold Navy (#0a1931).
  * Green/Coral verified badge: '✓ Vérifié & Validé'.
  * Prominent physical landmark with pin: 'Repère : En face de la station Jovena'.
  * Operating status pill: 'Ouvert'.
  * Side-by-side action buttons: Solid Coral (#ff6b6b) button '📞 Appeler' and outlined Navy button '💬 WhatsApp'.

3. DETAIL VIEW (Single Place Sheet):
- Header image banner showing the storefront photo.
- Business name, verified badge, and category tag.
- Highlighted Landmark Box: Styled with soft #ffeac1 cream background and coral pin icon: 'Repère : À 50m du restaurant Bezanozano, près de la Mairie'.
- Working Hours Section: Daily schedule with active status 'Ouvert actuellement (ferme à 18h)'.
- About / Services note: Short bullet points of provided services.
- Link: 'Signaler une erreur sur cette fiche'.
- Sticky Bottom Bar: Full-width primary CTA 'Appeler le contact' in Coral (#ff6b6b) and secondary WhatsApp button.
```

---

## 📦 Pack 2 : Contribution & Qualité des Données (Engagement)

```text
Design the contribution and community quality screens for the hyperlocal mobile app "AIZÉ" in Moramanga.
Target viewport: Mobile 375px.

Brand Colors:
- Background: Pure White (#ffffff)
- Text & Titles: Midnight Navy (#0a1931)
- CTA & Primary Buttons: Vibrant Coral (#ff6b6b)
- Borders & Dividers: Slate Grey (#b0b8c4)
- Accent Backgrounds: Soft Cream (#ffeac1)

Create 3 mobile screens / dialogs:

1. 'PROPOSE A BUSINESS / LISTING' FORM:
- Header with back arrow and title 'Ajouter un commerce ou service'.
- Helper banner with #ffeac1 background: 'Aidez les habitants de Moramanga à trouver votre activité. Inscription 100% gratuite.'
- Form fields (clean white inputs with #b0b8c4 borders and Navy labels):
  * Nom de l'établissement / prestataire (required)
  * Catégorie (dropdown select)
  * Numéro de téléphone (required, with +261 format helper)
  * Numéro WhatsApp (optional)
  * Quartier (e.g. Moramanga Ambony, Camp des Mariés...)
  * Repère physique (crucial placeholder: 'Ex: En face de la pharmacie Espoir, à côté de...')
  * Photo de la devanture (upload box with camera icon)
- Bottom Sticky Button: Full-width Coral (#ff6b6b) button 'Soumettre la fiche pour validation'.

2. 'REPORT AN ERROR' BOTTOM SHEET MODAL:
- Half-screen bottom sheet with drag handle.
- Title: 'Signaler une information inexacte'.
- Subtitle in muted grey: 'Aidez-nous à garder AIZÉ à jour pour Moramanga'.
- Radio options with clean selectable cards:
  * ❌ 'Le numéro de téléphone ne répond plus / a changé'
  * 🔒 'L'établissement a définitivement fermé'
  * 📍 'Le repère ou l'adresse est incorrecte'
  * 🕒 'Les horaires d'ouverture sont faux'
  * ✍️ 'Autre précision'
- Optional text area: 'Précisez votre remarque...'.
- Action buttons: Coral (#ff6b6b) button 'Envoyer le signalement' and cancel link.

3. EMPTY SEARCH RESULT SCREEN:
- Header with search input showing 'dentiste de nuit'.
- Friendly illustration / icon of an explorer or map pin.
- Headline in bold Navy (#0a1931): 'Aucun résultat trouvé à Moramanga'.
- Body text: 'Nous n'avons pas encore référencé ce service dans notre annuaire.'
- Suggestion Cards:
  * Card 1: 'Consulter les pharmacies de garde' (one-click filter)
  * Card 2 (Highlight with #ffeac1 background): 'Vous connaissez ce prestataire ? Proposez-le en 1 minute' with Coral button.
```

---

## 📦 Pack 3 : Modération Mobile Légère (Équipe AIZÉ & Terrain)

```text
Design a lightweight mobile moderation dashboard for the "AIZÉ" hyperlocal directory team in Moramanga.
Target viewport: Mobile 375px.

Colors: White (#ffffff), Midnight Navy (#0a1931), Vibrant Coral (#ff6b6b), Slate Grey (#b0b8c4), Soft Cream (#ffeac1).

Create 2 screens:

1. PENDING SUBMISSIONS QUEUE:
- Header: 'Modération AIZÉ' with counter pill '5 en attente'.
- Filter tabs: 'En attente' (active), 'Signalements d'erreur' (badge 2), 'Validées'.
- Queue Cards:
  * Submitted place name and date/time.
  * Tag 'Soumis par : Commerçant' or 'Équipe terrain'.
  * Contact details preview (Phone & WhatsApp).
  * Quick photo thumbnail of the storefront.
  * Two prominent swipe / tap buttons: Green/Navy button '✓ Approuver & Publier' and Coral outlined button '✕ Rejeter / Corriger'.

2. QUICK REVIEW DETAIL SHEET:
- Side-by-side comparison of user-submitted data vs verified standard.
- Call button directly in the sheet so Sylvio or Déon can verify the phone number in 1 tap before approving.
- Verification checkbox: 'Numéro testé et vérifié par appel'.
- Final approval bar with Coral button 'Confirmer et mettre en ligne'.
```
