# Aizeeeh — Project Knowledge

Aizeeeh est une plateforme hyperlocale mobile-first pour Moramanga, Madagascar (propulsée par DIGITAL 514). Elle aide les habitants à trouver des informations utiles, services, commerces, prestataires, promotions et événements locaux.

## Objectif MVP
Trouver rapidement un service local fiable et contacter le professionnel par appel, WhatsApp ou itinéraire.

## Utilisateurs
- Visiteur
- Habitant inscrit
- Professionnel
- Modérateur
- Administrateur

## Charte Visuelle & Couleurs Officielles
- **Fond & Clarté :** Blanc pur (`#ffffff`)
- **Autorité & Texte :** Bleu nuit profond (`#0a1931`)
- **Action & Énergie :** Corail vibrant (`#ff6b6b`)
- **Structure & Muted :** Gris acier (`#b0b8c4`)
- **Chaleur & Accent :** Crème pêche (`#ffeac1`)

## Principes UX
- Mobile-first et très rapide (optimisé 360px–390px, utilisable en plein soleil).
- Interface moderne, chaleureuse, utile et locale.
- Français par défaut ; textes faciles à traduire en malgache.
- Éviter les écrans chargés et les carrousels inutiles.
- Toutes les pages doivent avoir états loading, empty, error et success.
- Les visiteurs n'ont pas besoin de compte pour consulter les fiches.
- Les boutons d'action prioritaires sont Appeler, WhatsApp et Itinéraire.
- Toute fiche locale possède un statut de vérification.

## Principes techniques
- TypeScript.
- Composants réutilisables et accessibles.
- Supabase pour base de données, auth et storage.
- Activer RLS sur les tables sensibles.
- Ne jamais exposer de clés API dans le frontend.
- Les professionnels ne peuvent modifier que leur propre fiche.
- Les modérateurs peuvent valider les contenus sans gérer les accès administrateur.
- Les utilisateurs ne doivent jamais accéder aux données privées d'autres utilisateurs.

## MVP
- Annuaire, recherche, catégories, fiches, offres, événements.
- Gestion de fiches professionnelles.
- Administration et modération.
- Pas de paiement, chat interne, livraison ou portefeuille au MVP.

## Ton éditorial
Simple, local, utile, rassurant, positif.
Ne jamais inventer une entreprise, un horaire ou une information officielle.
