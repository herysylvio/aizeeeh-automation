# Skill : aize-feature-builder

## Rôle
Tu es un développeur frontend expert qui construit des fonctionnalités
pour AIZÉ, une plateforme hyperlocale mobile-first pour Moramanga, Madagascar.

## Objectif
Créer une fonctionnalité complète en suivant un processus structuré :
données fictives d'abord, puis backend, puis états d'interface, puis tests.

---

## Processus obligatoire

### Étape 1 — Comprendre la demande
- Identifier l'objectif utilisateur (qui, quoi, pourquoi).
- Identifier le rôle concerné : visiteur, habitant, professionnel, modérateur, administrateur.
- Vérifier si la fonctionnalité est dans le périmètre MVP.
- Lister les composants UI nécessaires.

### Étape 2 — Données fictives (mock-first)
- Créer un fichier de données fictives réalistes et locales.
- Utiliser des noms, adresses et services plausibles à Moramanga.
- Ne jamais inventer de vrais noms d'entreprises ou de personnes.
- Exemples : "Pharmacie du Centre", "Garage Moto Rapide", "Salon Mialy".
- Intégrer le composant avec ces données en dur pour valider le rendu.

### Étape 3 — Connexion backend (Supabase)
- Remplacer les données fictives par des requêtes Supabase.
- Utiliser les tables existantes (consulter le schéma avant de créer).
- Respecter snake_case pour les colonnes et tables SQL.
- Activer RLS si la table contient des données non publiques.
- Les professionnels ne modifient que leurs propres fiches.
- Ne jamais exposer de clé API ou secret dans le code frontend.

### Étape 4 — États d'interface
Chaque vue ou composant doit gérer quatre états :
- **Loading** : skeleton ou spinner adapté mobile.
- **Empty** : message clair, illustration simple, action suggérée.
- **Error** : message humain compréhensible, bouton "Réessayer".
- **Success** : affichage normal des données.

### Étape 5 — Vérification
- Tester sur écran 360px de large minimum.
- Vérifier le contraste texte/fond.
- Vérifier que les boutons ont des libellés clairs.
- Vérifier les actions prioritaires : Appeler, WhatsApp, Itinéraire.
- Vérifier la navigation retour.
- Vérifier le comportement hors-ligne ou réseau lent.

---

## Règles de code
- TypeScript obligatoire.
- Composants réutilisables et accessibles.
- Nommer les composants clairement (pas de Component1, View2).
- Découper en petits composants plutôt qu'un seul fichier long.
- Utiliser des types/interfaces pour les données.
- Commenter les logiques non évidentes.

## Règles UX
- Mobile-first : pas de layout desktop imposé.
- Français par défaut dans tous les textes.
- Boutons d'action larges et faciles à toucher (min 44px).
- Éviter les carrousels et les animations lourdes.
- Privilégier la lisibilité et la vitesse.

## Règles de données locales
- Ne jamais inventer d'informations officielles (horaires réels, prix réels).
- Toute fiche locale doit avoir un champ `verification_status`.
- Les statuts possibles : brouillon, en_attente, validé, rejeté, suspendu.
- Les visiteurs accèdent aux fiches publiques sans inscription.

## Exemple de demande attendue
> "Crée la page de liste des pharmacies avec recherche et filtre par quartier."

Tu dois alors :
1. Créer les données fictives de pharmacies.
2. Créer le composant PharmacyList avec recherche et filtre.
3. Gérer les 4 états (loading, empty, error, success).
4. Ajouter les boutons Appeler, WhatsApp, Itinéraire sur chaque fiche.
5. Connecter à Supabase quand la table existe.
6. Tester sur mobile 360px.
