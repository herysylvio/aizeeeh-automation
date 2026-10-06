# Dossier Seed Data — AIZÉ (Moramanga)

Ce dossier contient les fichiers de données initiales nécessaires pour amorcer l'application lors de son déploiement initial.

## Fichiers disponibles :
- [`reference-taxonomy.md`](file:///c:/Users/sylvi/DEV/AIZE/data/seed/reference-taxonomy.md) : Référentiel normalisé des quartiers et des catégories/sous-catégories.
- [`template-listings.csv`](file:///c:/Users/sylvi/DEV/AIZE/data/seed/template-listings.csv) : Fichier modèle CSV pour la collecte des fiches réelles (compatible Google Sheets / Excel).
- [Brief opérationnel de collecte](../../docs/07-data-collection-brief.md) : Plan d'action détaillé pour l'équipe (Sylvio, Déon, Bidy, Volana).

## Format attendu pour les fiches finales :
Les fiches validées seront stockées dans ce dossier sous format JSON/CSV prêt pour l'injection Supabase :
- `seed-listings.json` (fiches validées)
- `seed-categories.json` (arborescence des catégories)
- `seed-localities.json` (quartiers de Moramanga)
