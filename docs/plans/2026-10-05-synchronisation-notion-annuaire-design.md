# Conception — Base de Données Notion & Synchronisation Bidirectionnelle Aizeeeh

**Date** : 2026-10-05  
**Projet** : Aizeeeh (Moramanga — DIGITAL 514)  
**Page Parente Notion (`AIZEEEH`)** : `3ea24d1b-f2a7-8045-98a4-e8415ff011ca`  
**ID Base Notion « 📊 Suivi des Quotas & Objectifs »** : `3f024d1b-f2a7-8166-a5ca-efabd8345671`  
**ID Base Notion « 🏛️ Annuaire des Établissements — Aizeeeh »** : `3f024d1b-f2a7-811c-b3d9-ea71f0df838f`

---

## 1. Synthèse de la migration Google Sheet → Notion
Les 4 feuilles du fichier Google Sheet initial ont été analysées, fusionnées et importées dans Notion avec **0 erreur** :
- **123 fiches** issues de la feuille *Registre de saisie* (toutes catégories).
- **76 fiches** issues de la feuille *Hôtellerie & Restauration* (dont **27 fiches fusionnées** qui ont enrichi les hôtels/restaurants du registre avec leurs tarifs, types de chambres, spécialités culinaires et équipements, et **51 établissements additionnels** sur Moramanga & Andasibe RN2).
- **Total dans Notion** : **174 établissements complets** répartis dans les 8 catégories officielles et les 35 sous-catégories d'Aizeeeh, accompagnés de la table **📊 Suivi des Quotas & Objectifs** (9 catégories).

---

## 2. Architecture de Synchronisation Bidirectionnelle (`Notion ↔ Supabase`)

### A. Sens 1 : Site Aizeeeh → Notion (Temps réel automatique)
1. **Ajout d'établissement via `/ajouter`** :
   - Dès l'enregistrement dans Supabase, une fonction serveur crée automatiquement la fiche dans la base Notion (`3f024d1b-f2a7-811c-b3d9-ea71f0df838f`) avec :
     - `Statut` = `"En attente"`
     - `Origine` = `"Ajouté via le site (/ajouter)"`
     - `Supabase ID` = `place.id`
   - La fiche reste en attente jusqu'à ce que l'équipe passe son `Statut` sur `"Publié"` dans Notion (ou la valide dans `/admin/moderation`).
2. **Modification par un Gérant vérifié (`/mon-etablissement`) ou un Admin (`/admin/contenus`)** :
   - Dès la sauvegarde sur le site, la ligne Notion correspondante (`notion_page_id` ou recherche par `Supabase ID` / `Nom de l'établissement`) est mise à jour automatiquement avec les nouveaux horaires, contacts, spécialités, sous-catégories et tarifs.

### B. Sens 2 : Notion → Site Aizeeeh (Synchronisation complète & Purge initiale)
- La page `/admin/import` devient **« Synchronisation Notion ↔ Aizeeeh »**.
- Permet de :
  1. **Purger les anciennes données Google Sheet** et charger proprement les **174 fiches enrichies** depuis Notion (`3f024d1b-f2a7-811c-b3d9-ea71f0df838f`).
  2. **Synchroniser à tout moment (et automatiquement)** toutes les créations, validations (`En attente` → `Publié`), badges `Vérifié par appel`, sous-catégories, descriptions, horaires et détails métiers modifiés par l'équipe dans Notion.
