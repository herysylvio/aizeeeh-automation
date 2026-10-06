---
name: aize-supabase-security-review
description: >-
  Audite la sécurité Supabase pour AIZÉ : tables, RLS, storage, auth et fonctions.
  Utiliser ce skill lorsque l'on crée ou modifie des tables, buckets de storage,
  politiques RLS, rôles, fonctions serveur, règles d'accès, ou toute action
  touchant aux données utilisateur, à la modération ou à l'administration.
---

# AIZÉ Supabase Security Review

## Objectif
Vérifier systématiquement que toute modification de schéma, de politique d'accès
ou de configuration Supabase respecte les principes de sécurité AIZÉ avant
déploiement.

---

## Pré-requis

Avant tout audit, consulter :
- [AGENTS.md — Principes techniques](../../../AGENTS.md)
- [Rôles et permissions](../../../product/03-roles-permissions.md)
- [Décisions d'architecture](../../../DECISIONS.md)
- Le schéma de base de données existant (si `database/data-model.md` existe)

---

## Processus d'audit

### 1 — Inventaire des ressources touchées

Lister explicitement :
- [ ] Tables créées ou modifiées.
- [ ] Colonnes ajoutées, modifiées ou supprimées.
- [ ] Buckets de storage créés ou modifiés.
- [ ] Fonctions SQL ou Edge Functions créées ou modifiées.
- [ ] Politiques RLS créées, modifiées ou supprimées.
- [ ] Triggers ou webhooks ajoutés.

### 2 — Classification des données

Pour chaque table ou bucket, déterminer la classification :

| Classification | Définition | Exemples AIZÉ |
|---------------|------------|----------------|
| **Publique** | Accessible à tous, y compris visiteurs non connectés | Fiches validées, catégories, quartiers, événements publics |
| **Partagée** | Accessible aux utilisateurs connectés | Favoris (les siens), signalements (les siens) |
| **Privée propriétaire** | Accessible uniquement au propriétaire | Profil pro, brouillons de fiches, offres en attente |
| **Modération** | Accessible aux modérateurs et admins | Signalements à traiter, fiches en attente de validation |
| **Admin uniquement** | Accessible uniquement aux administrateurs | Utilisateurs, paramètres, abonnements, statistiques globales |

### 3 — Vérification RLS

#### Règle absolue
RLS **doit être activé** sur toute table contenant des données non entièrement
publiques. Ne jamais désactiver RLS pour "faire fonctionner" une requête.

#### Vérification par opération
Pour chaque table avec RLS, vérifier les 4 opérations séparément :

| Opération | Question de vérification |
|-----------|--------------------------|
| **SELECT** | Qui peut lire ces données ? Un visiteur voit-il des données privées ? |
| **INSERT** | Qui peut créer ? L'utilisateur peut-il insérer pour un autre utilisateur ? |
| **UPDATE** | Qui peut modifier ? Un professionnel peut-il modifier la fiche d'un autre ? |
| **DELETE** | Qui peut supprimer ? Préférer un soft-delete (`status = 'archived'`) ? |

#### Patterns RLS courants pour AIZÉ

**Fiche publique en lecture, propriétaire en écriture :**
```sql
-- SELECT : tout le monde voit les fiches validées
CREATE POLICY "Fiches publiques visibles"
  ON listings FOR SELECT
  USING (status = 'validated');

-- UPDATE : seul le propriétaire peut modifier
CREATE POLICY "Propriétaire modifie sa fiche"
  ON listings FOR UPDATE
  USING (auth.uid() = owner_id);

-- INSERT : seul un utilisateur connecté crée une fiche pour lui-même
CREATE POLICY "Création fiche propre"
  ON listings FOR INSERT
  WITH CHECK (auth.uid() = owner_id);
```

**Modérateur — accès lecture élargi :**
```sql
-- SELECT : modérateur voit les fiches en attente
CREATE POLICY "Modérateur voit fiches en attente"
  ON listings FOR SELECT
  USING (
    status = 'validated'
    OR (status = 'pending' AND auth.jwt() ->> 'role' IN ('moderator', 'admin'))
  );
```

**Données privées propriétaire uniquement :**
```sql
-- Favoris : chaque utilisateur voit et gère ses favoris
CREATE POLICY "Favoris propres"
  ON favorites FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
```

### 4 — Vérification par rôle

Tester mentalement chaque action pour chaque rôle :

| Ressource / Action | Visiteur | Habitant | Pro | Modérateur | Admin |
|--------------------|----------|----------|-----|------------|-------|
| Lire fiches validées | ✅ | ✅ | ✅ | ✅ | ✅ |
| Lire fiches en attente | ❌ | ❌ | Ses propres | ✅ | ✅ |
| Créer une fiche | ❌ | ❌ | ✅ (pour soi) | ❌ | ✅ |
| Modifier une fiche | ❌ | ❌ | Ses propres | ❌ | ✅ |
| Valider une fiche | ❌ | ❌ | ❌ | ✅ | ✅ |
| Lire les signalements | ❌ | Ses propres | ❌ | ✅ | ✅ |
| Créer un signalement | ❌ | ✅ | ✅ | ✅ | ✅ |
| Gérer les utilisateurs | ❌ | ❌ | ❌ | ❌ | ✅ |
| Accéder aux statistiques | ❌ | ❌ | Ses propres | ❌ | ✅ |

Pour chaque ❌, vérifier que la politique RLS bloque effectivement l'accès
(pas seulement masqué côté UI).

### 5 — Sécurité du storage

- [ ] Les buckets contenant des images privées (pièces d'identité, documents)
      sont en accès privé.
- [ ] Les buckets d'images publiques (photos de fiches) autorisent le SELECT
      public mais limitent INSERT au propriétaire.
- [ ] Les uploads sont limités en taille (max recommandé : 5 Mo par fichier).
- [ ] Les types de fichiers sont restreints (images : jpg, png, webp uniquement).
- [ ] Les noms de fichiers sont assainis (pas de caractères spéciaux ou chemins).

### 6 — Secrets et variables d'environnement

- [ ] La clé `anon` est utilisée côté client (lecture publique uniquement).
- [ ] La clé `service_role` n'est **jamais** dans le code frontend.
- [ ] Les variables d'environnement sensibles sont uniquement dans les
      Edge Functions ou le serveur.
- [ ] Les secrets ne sont pas commités dans le dépôt Git (vérifier `.gitignore`).
- [ ] Aucune clé API tierce (analytics, mail, SMS) n'est exposée côté client.

### 7 — Scénarios de test deux utilisateurs

Pour chaque modification, définir au minimum ces scénarios :

**Scénario A — Isolation des données :**
```
Given Utilisateur A est un professionnel connecté
  And Utilisateur B est un autre professionnel connecté
When Utilisateur A tente de modifier la fiche de Utilisateur B
Then La requête est rejetée par RLS
  And Utilisateur A ne voit que ses propres fiches en édition
```

**Scénario B — Escalade de privilèges :**
```
Given Utilisateur C est un habitant inscrit
When Utilisateur C tente d'accéder à l'endpoint de modération
Then La requête retourne une erreur 403
  And Aucune donnée de modération n'est exposée
```

**Scénario C — Visiteur non connecté :**
```
Given Un visiteur non connecté
When Il accède à la liste des fiches
Then Il voit uniquement les fiches avec status = 'validated'
  And Il ne voit pas les coordonnées privées des propriétaires
  And Il ne peut pas créer, modifier ou supprimer de contenu
```

### 8 — Sécurité des migrations

Avant toute modification de schéma :

- [ ] Identifier les données existantes impactées.
- [ ] Préférer une migration additive (ajout de colonne, nouvelle table)
      plutôt que destructive (suppression de colonne, changement de type).
- [ ] Documenter les étapes de rollback en cas d'échec.
- [ ] Ne jamais lancer une migration destructive sans validation explicite
      de l'utilisateur.
- [ ] Tester la migration sur un environnement de staging si possible.

**Template de rollback :**
```
Migration : [description]
Rollback :
1. [Étape 1 pour revenir à l'état précédent]
2. [Étape 2]
Données perdues en cas de rollback : [aucune / décrire]
```

---

## Interdictions absolues

| ❌ Interdit | Raison |
|-------------|--------|
| Désactiver RLS pour "résoudre" un problème d'accès | Expose toutes les données. Corriger la policy à la place. |
| Accès public en écriture sans restriction | Spam, injection, abus. Toujours exiger `auth.uid()`. |
| Clé `service_role` dans le code client | Donne un accès total à la base de données. |
| Supprimer une colonne ou table sans rollback documenté | Perte de données irréversible. |
| RLS basé uniquement sur le frontend (masquer un bouton) | Le frontend est contournable. La sécurité est côté serveur. |
| Politique `USING (true)` sur INSERT/UPDATE/DELETE | Équivaut à pas de RLS. Toujours filtrer par rôle ou `auth.uid()`. |

---

## Rapport d'audit

À la fin de chaque revue, produire un rapport structuré :

```
## Rapport de sécurité Supabase

### Ressources auditées
- Tables : [liste]
- Storage : [liste]
- Fonctions : [liste]

### Classification des données
[Tableau classification par table]

### RLS
- [x] Activé sur toutes les tables non publiques
- [ ] Policies SELECT vérifiées
- [ ] Policies INSERT vérifiées
- [ ] Policies UPDATE vérifiées
- [ ] Policies DELETE vérifiées

### Secrets
- [x] Aucun secret exposé côté client

### Tests deux utilisateurs
- [x] Isolation vérifiée
- [x] Escalade de privilèges bloquée
- [x] Accès visiteur limité

### Migrations
- [x] Migration additive
- [x] Rollback documenté

### Verdict
✅ Prêt pour déploiement / ❌ Corrections nécessaires

### Corrections requises (si applicable)
1. [Correction avec priorité]
```

---

## Critères de validation du skill

Le skill est considéré comme terminé lorsque :
- [ ] Toutes les ressources touchées sont inventoriées.
- [ ] La classification des données est établie pour chaque table.
- [ ] RLS est vérifié pour les 4 opérations sur chaque table non publique.
- [ ] La matrice rôle × action est validée.
- [ ] Les secrets sont vérifiés (aucun en client).
- [ ] Au moins 2 scénarios de test deux utilisateurs sont définis.
- [ ] Les étapes de rollback sont documentées pour toute migration.
- [ ] Le rapport d'audit est produit avec un verdict.
