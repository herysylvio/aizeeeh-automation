---
name: aize-product-planner
description: >-
  Transforme une idée ou demande produit en spécification réalisable pour AIZÉ.
  Utiliser ce skill lorsque l'utilisateur propose une nouvelle fonctionnalité,
  modifie le périmètre MVP, demande un élément de roadmap, ou a besoin d'une
  spécification structurée avant de prompter Lovable.
---

# AIZÉ Product Planner

## Objectif
Transformer une idée produit en une spécification claire, limitée et testable,
compatible avec le MVP AIZÉ et le workflow de développement Lovable.

---

## Processus

### 1 — Lecture du contexte
Avant toute rédaction, lire les documents suivants :
- [Product Brief](../../../docs/01-product-brief.md)
- [MVP Scope](../../../product/02-mvp-scope.md) (si existant)
- [Rôles et permissions](../../../product/03-roles-permissions.md)
- [Parcours utilisateurs](../../../product/04-user-journeys.md)
- [Glossaire](../../../docs/05-glossary.md)
- [Monétisation](../../../product/06-monetization.md)
- [Décisions d'architecture](../../../DECISIONS.md)
- [Backlog](../../../product/14-backlog.md) (si existant)

Si un fichier référencé n'existe pas encore, le signaler à l'utilisateur
et poursuivre avec les informations disponibles.

### 2 — Analyse de la demande
Répondre aux questions suivantes :
- **Problème utilisateur** : quel problème concret est résolu ?
- **Utilisateur cible** : visiteur, habitant, professionnel, modérateur ou admin ?
- **Résultat attendu** : que peut faire l'utilisateur après livraison ?
- **Valeur métier** : pourquoi cette fonctionnalité compte pour AIZÉ ?
- **Phase** : MVP, Phase 2 ou Phase 3 ?

### 3 — Cadrage fonctionnel
Identifier et documenter :
- Les rôles concernés et leurs permissions spécifiques.
- Les entités de données touchées (tables, colonnes, relations).
- Les écrans ou composants UI nécessaires.
- Les cas limites (données vides, erreurs, permissions insuffisantes).
- Les risques ou dépendances (autre fonctionnalité requise, décision en attente).

### 4 — Critères d'acceptation
Rédiger les critères au format Given / When / Then :

```
Given [contexte initial]
When [action de l'utilisateur]
Then [résultat observable attendu]
```

Inclure au minimum :
- Un critère pour le cas nominal (succès).
- Un critère pour le cas vide (aucune donnée).
- Un critère pour le cas d'erreur (réseau, permission).
- Un critère par rôle si les permissions diffèrent.

### 5 — Plan de build Lovable
Proposer un découpage en étapes progressives :

| Étape | Contenu                                    | Données       |
|-------|--------------------------------------------|---------------|
| 1     | UI statique avec données fictives          | Mock          |
| 2     | Connexion Supabase (lecture)               | Backend       |
| 3     | Actions (création, modification, suppression) | Backend    |
| 4     | Gestion des états (loading, empty, error)  | Backend       |
| 5     | Permissions et RLS                         | Backend       |
| 6     | Tests et vérifications mobiles             | Complet       |

### 6 — Prompt Lovable
Générer un prompt concis et actionnable pour la **première étape uniquement**.

Le prompt Lovable doit suivre cette structure :
```
Contexte : [description courte de la fonctionnalité]
Objectif : [ce que l'étape doit produire]
Composants : [liste des composants à créer]
Données : [mock / Supabase — préciser les tables si backend]
États : [loading, empty, error, success — si applicable à cette étape]
Contraintes : [mobile-first, français, accessibilité, etc.]
```

### 7 — Mise à jour du backlog
- Ne mettre à jour le backlog (`product/14-backlog.md`) qu'après
  approbation explicite de l'utilisateur.
- Ajouter l'item avec : titre, phase, priorité, statut, date.

---

## Contraintes absolues

- **Pas au MVP** : paiement intégré, messagerie interne, livraison, portefeuille.
- **Données locales** : ne jamais inventer d'entreprises, horaires ou informations
  officielles réelles. Utiliser des données fictives plausibles.
- **Contact** : privilégier appel téléphonique, WhatsApp et itinéraire
  avant tout mécanisme de chat interne.
- **Validation terrain** : indiquer explicitement lorsqu'une hypothèse
  nécessite une validation auprès des utilisateurs locaux de Moramanga.
- **Cohérence** : toute nouvelle fonctionnalité doit être compatible avec
  les rôles définis dans `product/03-roles-permissions.md`.

---

## Anti-patterns à éviter

- Proposer une fonctionnalité sans identifier le problème utilisateur.
- Ajouter une fonctionnalité hors MVP sans l'étiqueter Phase 2 ou 3.
- Écrire des critères d'acceptation vagues ("ça doit bien marcher").
- Générer un prompt Lovable qui couvre toutes les étapes d'un coup.
- Oublier les cas vides, erreurs ou permissions dans les critères.
- Supposer que l'utilisateur est connecté quand un visiteur suffit.

---

## Critères de validation du skill

Le skill est considéré comme terminé lorsque :
- [ ] Le problème utilisateur est clairement identifié.
- [ ] La phase (MVP / Phase 2 / Phase 3) est déterminée.
- [ ] Les rôles et permissions sont documentés.
- [ ] Au moins 3 critères d'acceptation Given/When/Then sont rédigés.
- [ ] Le plan de build Lovable est découpé en étapes progressives.
- [ ] Un prompt Lovable est prêt pour la première étape.
- [ ] L'utilisateur a validé avant toute modification du backlog.
