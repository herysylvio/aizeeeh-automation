# Conception — Carte Épurée, Vue Satellite Hybride (0 Coût) & Boutons de Recentrage

**Date** : 2026-10-04  
**Projet** : Aizeeeh (Moramanga — DIGITAL 514)  
**Statut** : Validé

---

## 1. Objectif & Problème résolu
1. **Éliminer la confusion visuelle avec les données tierces** : Le fond OpenStreetMap standard affiche des dizaines de petits symboles commerciaux tiers non vérifiés directement sur les tuiles, entrant en conflit avec les fiches vérifiées d'Aizeeeh.
2. **Offrir une Vue Satellite gratuite** : Permettre aux habitants et visiteurs de Moramanga de basculer en 1 clic sur une vraie vue aérienne/satellite avec les toits et bâtiments réels, sans clé API payante ni surcoût.
3. **Recentrage rapide en 1 clic** : Permettre à l'utilisateur qui explore ou déplace la carte de revenir instantanément soit sur **le point de l'établissement consulté (`Ce lieu`)**, soit sur **la vue globale de la ville (`Plan Moramanga`)**.

---

## 2. Architecture Cartographique (Leaflet — 100 % Gratuit, Sans Clé API)

### A. Deux modes de fond de carte (`Plan` vs `Satellite`)
1. **Mode `Plan` (Par défaut — Léger sur réseau mobile 3G/4G)** :
   - **Fournisseur** : *OpenStreetMap Humanitarian (HOT)* (`https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png`, `subdomains: 'abc'`, `maxZoom: 19`).
   - **Avantage** : Testé directement sur Moramanga — affiche toutes les **empreintes des bâtiments**, la RN2, les rues secondaires, la voie ferrée et les noms de quartiers, **sans les icônes commerciales parasites** et **sans aucune clé API**.
2. **Mode `Satellite` (Hybride — Imagerie réelle + Axes routiers)** :
   - **Couche de base** : *Esri World Imagery* (`https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}`, `maxZoom: 19`).
   - **Couche d'étiquettes superposée** : *Esri World Transportation* (`https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}`, `maxZoom: 19`), 100 % gratuit sans clé API.

### B. Contrôles Flottants sur toutes les cartes (`PlacesMapImpl` et `MapPickerImpl`)
1. **En haut à droite (`top-2.5 right-2.5 z-[400]`) — Sélecteur de Vue** :
   - Boutons pilules compacts : **`🗺️ Plan`** | **`🛰️ Satellite`**.
2. **En bas à droite (`bottom-3 right-2.5 z-[400]`) — Boutons de Recentrage** :
   - **Sur la fiche d'un établissement (`/lieu/$placeId`) et dans le sélecteur de point (`MapPickerImpl` sur `/ajouter`, `/mon-etablissement`, `/admin/contenus`)** :
     - **`🎯 Ce lieu`** : `map.flyTo([lat, lng], 17, { duration: 0.6 })` — recentre et zoome sur le bâtiment de l'établissement en cours de consultation.
     - **`🏙️ Plan Moramanga`** : `map.flyTo([-18.948, 48.228], 14, { duration: 0.6 })` — dézoome pour situer l'établissement dans la ville de Moramanga.
   - **Sur la carte générale (Accueil `/`)** :
     - Si un marqueur a été sélectionné / cliqué : bouton **`🎯 Ce lieu`** + bouton **`🏙️ Plan Moramanga`**.
     - Sinon : bouton **`🏙️ Recentrer Moramanga`** qui recadre sur l'ensemble des marqueurs de Moramanga (`fitBounds` ou centre `[-18.948, 48.228]`, zoom `14`).
