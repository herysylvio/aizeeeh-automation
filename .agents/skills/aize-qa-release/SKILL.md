---
name: aize-qa-release
description: >-
  Vérifie la qualité avant publication d'une version AIZÉ.
  Utiliser ce skill avant tout déploiement, après une modification de rôles,
  de base de données, d'authentification, de fiches publiques, de recherche,
  de navigation ou de sécurité.
---

# AIZÉ QA Release

## Objectif
Vérifier systématiquement qu'une version AIZÉ est prête pour publication.
Aucune version ne doit être déployée si un problème critique est détecté.

---

## Pré-requis

Avant tout cycle QA, consulter :
- [Rôles et permissions](../../../product/03-roles-permissions.md)
- [Parcours utilisateurs](../../../product/04-user-journeys.md)
- [Glossaire](../../../docs/05-glossary.md)
- [Décisions d'architecture](../../../DECISIONS.md)
- [CHANGELOG](../../../CHANGELOG.md)

Si des skills complémentaires existent, les déclencher en amont :
- `aize-supabase-security-review` pour tout changement de schéma ou RLS.
- `aize-local-data-quality` pour tout changement de données publiques.
- `aize-ui-quality` (Lovable) pour la qualité visuelle.

---

## Classification des anomalies

| Sévérité | Définition | Impact sur publication |
|----------|-----------|----------------------|
| **🔴 Bloquant** | Perte de données, faille de sécurité, accès non autorisé, parcours principal cassé | **Publication interdite** |
| **🟠 Critique** | Fonctionnalité importante cassée, erreur d'affichage majeure, permission incorrecte | **Publication interdite** |
| **🟡 Majeur** | Bug visible mais contournable, état d'interface manquant, problème d'accessibilité | Publication possible avec correctif planifié sous 48h |
| **🟢 Mineur** | Cosmétique, libellé, espacement, amélioration souhaitée | Publication possible, correctif au prochain sprint |

---

## Tests obligatoires

### 1 — Parcours utilisateur principal (mobile)

Tester le parcours critique sur viewport 360×640px :

```
Scénario : Trouver et contacter un service local
Given  Un visiteur ouvre AIZÉ sur mobile
When   Il arrive sur la page d'accueil
Then   Les catégories principales sont visibles sans scroller excessivement

When   Il sélectionne la catégorie "Pharmacies"
Then   La liste des pharmacies validées s'affiche

When   Il ouvre une fiche
Then   Le nom, l'adresse, le statut et les boutons d'action sont visibles

When   Il clique "Appeler"
Then   L'application téléphone s'ouvre avec le bon numéro

When   Il clique "WhatsApp"
Then   WhatsApp s'ouvre avec le bon numéro

When   Il clique "Itinéraire"
Then   L'application de cartographie s'ouvre avec la bonne adresse
```

Résultat : ✅ Conforme / ❌ Non conforme (préciser l'étape en échec)

### 2 — Liens, boutons, formulaires et navigation

| Test | Vérification | Résultat |
|------|-------------|----------|
| Liens internes | Tous les liens mènent à une page existante (pas de 404) | |
| Liens externes | Les liens tel:, wa.me/ et maps ouvrent la bonne application | |
| Boutons | Chaque bouton a une action ou est désactivé avec raison visible | |
| Formulaires — soumission | Les formulaires se soumettent correctement avec données valides | |
| Formulaires — validation | Les erreurs s'affichent près des champs concernés | |
| Formulaires — champs requis | Les champs obligatoires sont marqués et bloquent si vides | |
| Navigation retour | Le bouton retour fonctionne sur chaque écran | |
| Navigation principale | Le menu/barre de nav est accessible depuis chaque page | |
| Page 404 | Une URL inexistante affiche une page 404 avec lien retour | |
| Deep link | Un lien direct vers une fiche ouvre la bonne fiche | |

### 3 — États d'interface

Pour chaque page et composant principal, vérifier :

| Page / Composant | Loading | Empty | Error | Success |
|-----------------|---------|-------|-------|---------|
| Accueil | | | | |
| Liste annuaire | | | | |
| Fiche détail | | | | |
| Recherche | | | | |
| Offres | | | | |
| Événements | | | | |
| Profil pro | | | | |
| Admin — liste fiches | | | | |
| Modération | | | | |

Marquer chaque cellule : ✅ (géré), ❌ (manquant), ⚠️ (partiel)

### 4 — Recherche

| Scénario de recherche | Requête | Résultat attendu | Résultat |
|----------------------|---------|-------------------|----------|
| Recherche valide | "pharmacie" | Fiches de pharmacies affichées | |
| Recherche avec casse | "PHARMACIE" | Même résultat que "pharmacie" | |
| Recherche avec faute | "farmacie" | Résultats pertinents ou message "Aucun résultat" propre | |
| Recherche sans résultat | "xyznotexist" | État empty avec message clair et suggestion | |
| Filtre par catégorie | Catégorie "Restaurant" | Seuls les restaurants s'affichent | |
| Filtre par quartier | Quartier "Centre-ville" | Seules les fiches du quartier s'affichent | |
| Recherche vide | "" (champ vide) | Affichage par défaut ou toutes les fiches | |
| Caractères spéciaux | "<script>alert(1)</script>" | Pas d'exécution, résultat vide propre | |

### 5 — Permissions par rôle

Tester chaque action avec un compte de chaque rôle :

| Action | Visiteur | Habitant | Pro | Modérateur | Admin |
|--------|----------|----------|-----|------------|-------|
| Voir fiches validées | ✅ | ✅ | ✅ | ✅ | ✅ |
| Rechercher | ✅ | ✅ | ✅ | ✅ | ✅ |
| Appeler / WhatsApp / Itinéraire | ✅ | ✅ | ✅ | ✅ | ✅ |
| Voir fiches en attente | ❌ | ❌ | Siennes | ✅ | ✅ |
| Enregistrer un favori | ❌ | ✅ | ✅ | ✅ | ✅ |
| Signaler une erreur | ❌ | ✅ | ✅ | ✅ | ✅ |
| Créer / modifier sa fiche | ❌ | ❌ | ✅ | ❌ | ✅ |
| Créer une offre | ❌ | ❌ | ✅ | ❌ | ✅ |
| Valider / refuser une fiche | ❌ | ❌ | ❌ | ✅ | ✅ |
| Modérer les signalements | ❌ | ❌ | ❌ | ✅ | ✅ |
| Gérer utilisateurs | ❌ | ❌ | ❌ | ❌ | ✅ |
| Gérer catégories | ❌ | ❌ | ❌ | ❌ | ✅ |
| Gérer paramètres | ❌ | ❌ | ❌ | ❌ | ✅ |

Pour chaque ❌ : vérifier que l'accès est bloqué **côté backend (RLS)**,
pas uniquement masqué côté UI.

### 6 — Isolation des données (test deux comptes)

```
Scénario A : Isolation des fiches professionnelles
Given  Pro A est connecté et a une fiche "Garage Moto A"
  And  Pro B est connecté et a une fiche "Salon Beauté B"
When   Pro A accède à la page de gestion de ses fiches
Then   Il voit uniquement "Garage Moto A"
  And  Il ne voit pas "Salon Beauté B"
When   Pro A tente de modifier la fiche de Pro B via URL directe
Then   La requête est rejetée (erreur 403 ou résultat vide)
```

```
Scénario B : Isolation des favoris
Given  Habitant X a ajouté "Pharmacie du Centre" en favori
  And  Habitant Y n'a aucun favori
When   Habitant Y accède à sa page de favoris
Then   La page est vide (pas les favoris de Habitant X)
```

```
Scénario C : Isolation des signalements
Given  Habitant X a signalé une erreur sur une fiche
When   Habitant Y accède à ses signalements
Then   Il ne voit pas le signalement de Habitant X
```

### 7 — Sécurité et RLS

- [ ] RLS activé sur toutes les tables non entièrement publiques.
- [ ] Aucune clé API ou secret dans le code source frontend.
- [ ] Variables `service_role` uniquement côté serveur.
- [ ] Les entrées utilisateur sont validées (pas d'injection SQL/XSS).
- [ ] Les uploads sont limités en taille et type de fichier.
- [ ] Les endpoints ne retournent pas de données en excès.

Si une modification de schéma a eu lieu depuis la dernière release,
exécuter le skill `aize-supabase-security-review` en complément.

### 8 — Accessibilité

| Test | Vérification | Résultat |
|------|-------------|----------|
| Contraste | Ratio texte/fond ≥ 4.5:1 sur les éléments principaux | |
| Labels | Tous les champs de formulaire ont un label visible | |
| Alt text | Toutes les images ont un attribut alt pertinent | |
| Focus clavier | Navigation possible sans souris (Tab, Entrée, Échap) | |
| Focus visible | L'élément actif est visuellement identifiable | |
| Ordre de focus | L'ordre suit la logique de lecture (haut→bas, gauche→droite) | |
| Touch targets | Éléments tactiles ≥ 44×44px | |
| Zoom | La page reste utilisable à 200% de zoom | |
| Messages d'erreur | Associés au champ et lisibles par un lecteur d'écran | |

### 9 — Partage social et SEO

| Élément | Vérification | Résultat |
|---------|-------------|----------|
| `og:title` | Titre descriptif présent sur les pages principales | |
| `og:description` | Description courte et pertinente | |
| `og:image` | Image de partage définie (min 1200×630px) | |
| `<title>` | Titre de page unique par écran | |
| `meta description` | Description meta unique par page principale | |
| Partage WhatsApp | Le lien partagé affiche un aperçu propre | |
| Partage Facebook | Le lien partagé affiche un aperçu propre | |

### 10 — Versioning et traçabilité

- [ ] Un commit Git identifiable existe pour cette version.
- [ ] Le CHANGELOG.md est mis à jour avec les changements de cette release.
- [ ] Le numéro de version ou tag est défini (si applicable).
- [ ] Les migrations de base de données sont commitées et documentées.
- [ ] Un point de rollback est identifié (commit, snapshot ou backup).

---

## Décision Go / No-Go

### Publication autorisée ✅
- Aucun bloquant 🔴 ni critique 🟠.
- Tous les parcours principaux fonctionnent.
- Les permissions sont correctes pour tous les rôles.
- L'isolation des données est vérifiée.
- Pas de secret exposé.

### Publication interdite ❌
Si **au moins un** de ces problèmes est détecté :
- Faille de sécurité ou accès non autorisé.
- Perte ou corruption de données possible.
- Parcours principal cassé (recherche, consultation fiche, contact).
- Données privées exposées à d'autres utilisateurs.
- Secret ou clé API dans le code client.
- RLS désactivé ou contourné sur une table sensible.

### Publication conditionnelle ⚠️
- Des anomalies majeures 🟡 existent mais sont contournables.
- Un correctif est planifié sous 48h.
- Les anomalies sont documentées dans les "Problèmes connus".

---

## Rapport de release

```
## Rapport QA — AIZÉ [version / date]

### Résumé

| Catégorie | Passé | Échoué | Non testé |
|-----------|-------|--------|-----------|
| Parcours principal | | | |
| Liens et navigation | | | |
| États d'interface | | | |
| Recherche | | | |
| Permissions | | | |
| Isolation données | | | |
| Sécurité / RLS | | | |
| Accessibilité | | | |
| Partage social | | | |
| Versioning | | | |
| **Total** | | | |

### Anomalies détectées

| # | Sévérité | Description | Écran | Statut |
|---|----------|-------------|-------|--------|
| 1 | 🔴/🟠/🟡/🟢 | [description] | [page] | Ouvert / Corrigé |

### Problèmes connus (non bloquants)
- [Liste des anomalies acceptées avec justification]

### Point de rollback
- Commit : [hash]
- Snapshot BDD : [référence]
- Procédure : [étapes de rollback]

### Verdict
✅ **Prêt pour publication**
⚠️ **Publication conditionnelle** — correctifs planifiés sous 48h
❌ **Publication bloquée** — [nombre] anomalies critiques à corriger

### Testé par
- [Nom / rôle] — [date]
```

---

## Critères de validation du skill

Le skill est considéré comme terminé lorsque :
- [ ] Les 10 catégories de tests sont parcourues.
- [ ] Chaque test a un résultat (✅, ❌, ⚠️ ou "Non testé" justifié).
- [ ] Les anomalies sont classées par sévérité.
- [ ] Les scénarios deux comptes sont exécutés.
- [ ] La décision Go/No-Go est formulée avec justification.
- [ ] Le rapport de release est produit.
- [ ] Le point de rollback est identifié.
