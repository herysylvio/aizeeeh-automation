# Instructions pour les agents — AIZÉ

## Contexte
AIZÉ est une plateforme hyperlocale destinée à Moramanga, Madagascar.
Elle doit fonctionner d’abord sur mobile, avec une connexion parfois limitée.

## Principes produit
- Priorité à l’utilité quotidienne.
- Interface simple, rapide et inclusive.
- Français par défaut ; architecture compatible malgache.
- Ne jamais inventer des informations locales.
- Toute donnée locale doit avoir un statut de vérification.
- Ne jamais afficher une information urgente non vérifiée.
- Favoriser appel, WhatsApp et itinéraire avant chat interne.
- Les données essentielles doivent être accessibles sans inscription.

## Principes techniques
- Utiliser TypeScript.
- Utiliser des composants réutilisables.
- Éviter la duplication.
- Utiliser snake_case pour les tables et colonnes SQL.
- Préférer des migrations non destructives.
- Ne jamais exposer de secret dans le code.
- Ne jamais désactiver ou contourner RLS.
- Toute table contenant des données non entièrement publiques doit avoir RLS.
- Vérifier les permissions de chaque rôle avant toute modification de schéma.

## Principes UX
- Mobile-first.
- Performance prioritaire.
- Prévoir états : chargement, vide, erreur, succès.
- Prévoir écran petit format et réseau lent.
- Toute action critique doit être confirmée visuellement.
- Les formulaires doivent indiquer clairement les champs requis.
- Accessibilité : contraste, libellés, focus clavier, messages d’erreur utiles.

## Mode de travail
1. Lire les documents concernés avant toute action.
2. Proposer un plan lorsque la tâche touche plusieurs fichiers ou le schéma.
3. Réaliser une modification limitée et vérifiable.
4. Expliquer les fichiers modifiés.
5. Donner les tests à effectuer.
6. Mettre à jour CHANGELOG.md après une fonctionnalité validée.
7. Ne pas lancer une migration destructive sans validation explicite.
