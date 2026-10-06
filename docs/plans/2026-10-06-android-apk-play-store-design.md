# Conception & Guide de Déploiement Android (APK & Google Play Store) — Aizeeeh

**Date :** 6 octobre 2026  
**URL de production :** `https://aizeeeh.digital514.mg`  
**Identifiant de package Android (Application ID) :** `mg.digital514.aizeeeh`  
**Architecture retenue :** **Approche 1 — TWA (Trusted Web Activity) via PWABuilder / Bubblewrap**

---

## 1. Comment fonctionnent les mises à jour après la création de l'APK ?

Avec la technologie **TWA (Trusted Web Activity)** officielle de Google/Chrome :

### ✅ Ce qui se met à jour 100 % AUTOMATIQUEMENT (sans toucher à l'APK ni à Google Play)
Dès que tu modifies quelque chose sur **Lovable** (et cliques sur *Update* pour publier sur `https://aizeeeh.digital514.mg`) ou dans **Notion / Supabase** :
- **Nouvelles pages, nouveaux composants, corrections de bugs UI** → mis à jour instantanément dans l'application Android installée chez les utilisateurs.
- **Nouveaux commerces, pharmacies de garde, numéros d'urgence, événements** → synchronisés en temps réel.
- **Changements de couleurs, textes, cartes Leaflet, filtres** → appliqués automatiquement à l'ouverture suivante de l'application.

> **Pourquoi ?** L'APK TWA est une coquille Android native ultra-légère (~2 Mo) qui affiche `https://aizeeeh.digital514.mg` en plein écran natif (sans barre d'adresse) grâce à une preuve cryptographique appelée **Digital Asset Links** (`/.well-known/assetlinks.json`).

### 🔄 Les seuls cas rares où il faut regénérer l'APK / AAB
Tu n'auras besoin de générer une nouvelle version sur Google Play Console que si tu changes :
1. **Le nom de l'application** sous l'icône sur l'écran d'accueil du téléphone (`Aizeeeh`).
2. **L'icône de lancement** native du téléphone.
3. **Le nom de domaine principal** (`aizeeeh.digital514.mg`).
4. **Les permissions système Android** (ex. notifications push natives FCM).

---

## 2. Ce qu'il faut absolument savoir avant de commencer sur Google Play Console

### A. APK vs AAB (les 2 fichiers générés)
Lorsque nous générons le package Android (via **PWABuilder**), tu obtiens un fichier `.zip` contenant **deux fichiers importants** :
1. **`Aizeeeh.apk` (Android Package)** :
   - Sert à **installer et tester immédiatement** l'application sur ton téléphone Android ou à la partager directement (WhatsApp, lien de téléchargement sur le site) sans attendre Google.
2. **`Aizeeeh.aab` (Android App Bundle)** :
   - C'est le format **obligatoire** demandé par **Google Play Console** pour publier sur le Google Play Store.

### B. Le fichier `assetlinks.json` (Indispensable pour masquer la barre d'adresse URL)
- Si tu installes un APK TWA sans configurer `https://aizeeeh.digital514.mg/.well-known/assetlinks.json`, Android affichera une barre d'adresse Chrome en haut de l'écran.
- Pour que l'application s'ouvre **100 % en plein écran natif**, le fichier `public/.well-known/assetlinks.json` sur Lovable doit contenir l'empreinte **SHA-256** de ta clé de signature Android :
  - L'empreinte SHA-256 de la clé générée par **PWABuilder** (pour que l'APK direct fonctionne en plein écran), **ET**
  - L'empreinte SHA-256 de **Google Play App Signing** (visible dans *Google Play Console > Configuration > Intégrité de l'application*, pour que la version Play Store fonctionne aussi en plein écran).

### C. La clé de signature (`signing.keystore` / `.jks`) — Règle d'or
- Lors de la génération sur PWABuilder, un fichier `signing.keystore` (et un fichier `signing-key-info.txt` contenant les mots de passe) est fourni dans le `.zip`.
- **Sauvegarde ce fichier précieusement** (sur Google Drive / Notion) : si un jour dans 1 an tu veux publier une mise à jour de l'icône sur Google Play, Google exigera que le fichier `.aab` soit signé avec **exactement la même clé**.

### D. Les prérequis administratifs de Google Play Console
1. **Frais d'inscription unique** : **25 $ USD** (paiement unique à vie par carte Visa/Mastercard internationale).
2. **Vérification d'identité** : Pièce d'identité officielle + justificatif d'adresse.
3. **Type de compte (Important depuis 2024–2026)** :
   - **Compte Personnel** : Google impose une étape de **Test Fermé obligatoire de 14 jours continus avec au moins 12 à 20 testeurs** ayant installé l'application avant de débloquer le bouton *Publier en Production*.
   - **Compte Organisation / Entreprise** (nécessite un numéro D-U-N-S gratuit) : **Pas de délai de 14 jours**, publication directe en production dès validation par Google (généralement 2 à 5 jours).
4. **Page "Politique de confidentialité" (`/confidentialite`) et "Suppression de compte"** :
   - Google Play exige une URL publique de Politique de confidentialité (`https://aizeeeh.digital514.mg/confidentialite`) et, puisque l'application permet de créer un compte (`/connexion`), une mention claire ou un bouton permettant de demander la suppression de son compte et de ses données.

---

## 3. Architecture Technique & Fichiers à préparer sur Lovable

| Fichier dans Lovable | Rôle pour l'APK & Google Play Store |
| :--- | :--- |
| `public/manifest.json` | Manifeste PWA enrichi (`id`, `orientation: "portrait"`, entrées séparées `purpose: "any"` et `purpose: "maskable"` pour un score 100% sur PWABuilder) |
| `public/sw.js` | Service Worker léger en mode *Network-First* (toujours charger la dernière version en ligne, avec fallback hors-ligne propre) |
| `public/.well-known/assetlinks.json` | Fichier Digital Asset Links associant `mg.digital514.aizeeeh` au domaine `aizeeeh.digital514.mg` |
| `src/pages/PrivacyPolicyPage.tsx` (`/confidentialite`) | Page officielle de Politique de Confidentialité & Suppression des données (exigée par Google Play Console) |

---

## 4. Plan d'action étape par étape

1. **Étape 1 (Sur Lovable — Maintenant)** :
   - Appliquer le prompt Lovable ci-dessous pour préparer :
     - `public/manifest.json` optimisé PWABuilder,
     - `public/sw.js` (Network-First pour garantir les mises à jour instantanées),
     - `public/.well-known/assetlinks.json`,
     - et la page `/confidentialite` (Politique de confidentialité + procédure de suppression de compte requise par Google Play).
2. **Étape 2 (Génération de l'APK & AAB sur PWABuilder.com)** :
   - Aller sur `https://www.pwabuilder.com`, entrer `https://aizeeeh.digital514.mg`.
   - Cliquer sur **Package for stores** → **Android** → configurer le Package ID `mg.digital514.aizeeeh` → **Download Package**.
3. **Étape 3 (Activation du plein écran sans barre d'adresse)** :
   - Copier le contenu du fichier `assetlinks.json` présent dans le `.zip` téléchargé et me le donner (ou le coller dans Lovable) pour activer le plein écran natif.
4. **Étape 4 (Test de l'APK & Publication Google Play Console)** :
   - Tester `Aizeeeh.apk` sur téléphone Android.
   - Importer `Aizeeeh.aab` dans Google Play Console avec la fiche Play Store et le lien `https://aizeeeh.digital514.mg/confidentialite`.
