# Changelog — Aizeeeh

## [1.1.0] — 2026-10-02

### Ajouté
- **Sous-catégories multiples & bulles d'info (`i`)** sur les 8 catégories officielles (`subcategories` + composant `SubcategoryBar` avec `Popover` explicatif).
- **Espace Utilisateur complet dans `/menu`** : édition du profil (`display_name`, `username`, `phone`), gestion des **Favoris (`❤️`)** et **Centre de Notifications & Abonnements (`🔔`)** par catégorie ou établissement.
- **Sécurité KYC Pro 48h & Consentement légal (Loi n° 2014-038)** sur `/mon-etablissement` : vérification GPS Moramanga (rayon 30 km), compte à rebours de 48h pour le dépôt de pièce d'identité, et blocage automatique de l'édition Pro en cas d'expiration.
- **Espace Gérant enrichi par métier (`specific_details` JSONB)** : champs dédiés pour Hôtels, Restaurants, Santé, Transports, Mécaniciens, Services + bouton d'action prioritaire **Réservation / Commande / Prise de RDV** (WhatsApp pré-rempli ou appel) et liens Email/Facebook.
- **Système d'Avis complet (`place_reviews`)** : tri par date ou pertinence, vote *"Utile 👍"*, partage, signalement, modification/suppression par l'auteur et **réponse officielle du gérant**.
- **Espace dédié "Lions Club Moramanga — Dons & Actions Solidaires" (`/actions-solidaires`)** : proposition de dons (objets ou soutien financier) avec option d'anonymat strict, validation par le Lions Club et publication de rapports d'actions avec mentions J'aime et commentaires.
- **Guide d'utilisation en 3 étapes (`/#guide`) & FAQ interactive (`/#faq`)** sur la page d'accueil (avec onglets *Habitants & Visiteurs* et *Commerçants & Professionnels*) et raccourci depuis `/menu`.
- **Rotation hebdomadaire automatique des Pharmacies de garde (Samedi 12h00 UTC+3)** : panneau d'administration du cycle des 3 pharmacies dans `/admin/contenus`, bascule automatique chaque samedi à midi, dérogation ponctuelle et affichage de la prochaine pharmacie de garde.
- **Carte Épurée (OSM HOT) & Vue Satellite Haute Résolution (Zoom 20) + Recentrage** : sélecteur *Plan | Satellite* sans commerces parasites et boutons rapides *« 🎯 Ce lieu »* et *« 🏙️ Plan Moramanga »*.
- **Base de Données Notion complète (`3f024d1b-f2a7-811c-b3d9-ea71f0df838f`, 174 établissements fusionnés) & Synchronisation Bidirectionnelle (`Notion ↔ Aizeeeh`)** : remplacement du Google Sheet par Notion dans `/admin/import` (avec purge/réimport), et envoi automatique en temps réel vers Notion de tout nouvel ajout (`/ajouter`) ou modification (`/mon-etablissement`, `/admin/contenus`).
- **Améliorations UX v1.1.1 & Nouveau Favicon** :
  - **Pharmacie de garde** : affichage direct de la photo et de la position exacte sur la carte interactive, avec masquage des détails de la règle de rotation pour le public.
  - **Filtres Carte & Compteurs** : ajout du menu déroulant `Tous | Moramanga` sous la carte et masquage des compteurs globaux d'adresses pour le public (visibles uniquement par les comptes Admin et Modérateurs).
  - **Dons Lions Club** : ajout du champ photo pour les dons d'objets et du champ montant en Ariary pour les dons financiers.
  - **Formulaire `/ajouter` & Notifications Favoris** : bouton « Valider » directement intégré au formulaire et création automatique d'une alerte dans le centre de notifications (avec badge de compteur non lu) lors de l'ajout aux favoris.
- **Package Android Officiel (`Aizeeeh.apk` & `Aizeeeh.aab`) via TWA & Conformité Google Play Store** :
  - Manifeste PWA complet (`/manifest.json`), icônes `any` et `maskable` (`192x192` et `512x512`), Service Worker *Network-First* (`/sw.js`) garantissant des mises à jour 100 % automatiques depuis Lovable, Digital Asset Links (`/.well-known/assetlinks.json` pour `mg.digital514.aizeeeh`) et page `/confidentialite`.
  - Génération de `Aizeeeh.apk` (1,29 Mo) et `Aizeeeh.aab` (1,38 Mo) dans `release-android/`.

### Corrigé
- **Calcul temps réel « Ouvert / Fermé »** : prise en compte exacte du jour de la semaine (Lundi-Vendredi, Samedi, Dimanche) en heure de Madagascar (`UTC+3`).
- **Fluidité & Transitions de pages** : activation du préchargement intelligent (`defaultPreload: 'intent'`), de l'API `View Transitions`, du retour tactile (`active:scale-[0.98]`) et du défilement fluide sur mobile.
- **Filtres de la Carte de Moramanga (`/`)** : affichage des 8 catégories en défilement horizontal avec message de repli vers la liste lorsqu'une catégorie n'a pas encore de point GPS précis.
- **Suppression du double footer** et ajout de la barre de recherche directe dans le Hero d'accueil.

---

## [1.0.0] — 2026-09-30

### Ajouté
- Annuaire des services locaux
- Fiches professionnelles
- Recherche et filtres
- Administration des fiches
- Charte graphique et palette officielle (ADR-005, 09-brand-identity.md)
- Directives DA et sous-agent aize_art_director
- Textes juridiques officiels : CGU, Confidentialité, Mentions légales (10-legal-and-compliance.md)
- Stratégie et calendrier éditorial de lancement Facebook (2026-09-30-lancement-facebook-aize-design.md)
- Spécifications techniques : Tracking commercial, Signalements citoyens et PWA Hors-ligne (2026-09-30-analytics-pwa-signalement-design.md)
- Évolution du nom du projet : Aizeeeh (ADR-006)

