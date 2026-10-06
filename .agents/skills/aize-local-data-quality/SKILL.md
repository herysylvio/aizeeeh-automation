---
name: aize-local-data-quality
description: >-
  Contrôle la qualité des données locales AIZÉ : fiches, services, contacts,
  offres, événements et informations publiques. Utiliser ce skill lors de
  l'import, la saisie, la modification, l'audit ou la publication de données
  d'annuaire, de contacts d'urgence, d'offres ou d'événements locaux
  à Moramanga.
---

# AIZÉ Local Data Quality

## Objectif
Garantir que toute donnée locale publiée dans AIZÉ est complète, cohérente,
vérifiable et fiable. Aucune information inexacte ou non sourcée ne doit
atteindre les habitants de Moramanga.

---

## Pré-requis

Avant tout audit ou import de données, consulter :
- [Product Brief](../../../docs/01-product-brief.md)
- [Glossaire](../../../docs/05-glossary.md)
- [Rôles et permissions](../../../product/03-roles-permissions.md)
- Le schéma de base de données existant (si `database/data-model.md` existe)

---

## Classification des données par sensibilité

| Niveau | Type de donnée | Exigences |
|--------|---------------|-----------|
| **Critique** | Urgences (pompiers, police, hôpital, SAMU) | Source officielle obligatoire + validation humaine avant publication |
| **Sensible** | Médecins, pharmacies de garde, services administratifs | Source identifiée + `last_verified_at` < 3 mois |
| **Standard** | Commerces, prestataires, restaurants, hôtels | Vérification de base (nom, contact, adresse) |
| **Communautaire** | Événements, activités, annonces associatives | Soumission modérée, pas de vérification de source |
| **Promotionnelle** | Offres, promotions, mises en avant | Dates de validité obligatoires, modération avant publication |

---

## Validation par champ

### Champs obligatoires pour toute fiche

| Champ | Règle de validation | Exemple valide |
|-------|---------------------|----------------|
| `name` | Non vide, 2–120 caractères, pas de caractères spéciaux excessifs | "Pharmacie du Centre" |
| `category` | Doit correspondre à une catégorie existante dans le système | "pharmacie", "mécanicien", "restaurant" |
| `locality` | Quartier de Moramanga reconnu ou coordonnées GPS | "Tsarahonenana", "Centre-ville" |
| `contact_phone` | Format malgache valide (10 chiffres, préfixe 03x) | "034 12 345 67" |
| `verification_status` | Valeur parmi : `draft`, `pending`, `validated`, `rejected`, `suspended` | "pending" |

### Champs conditionnels

| Champ | Obligatoire si… | Règle |
|-------|-----------------|-------|
| `contact_whatsapp` | Le professionnel a WhatsApp | Format international (+261 xx xxx xx xx) |
| `opening_status` | La fiche est validée | Valeur parmi : `open`, `closed`, `unknown`, `opening_soon` |
| `opening_hours` | `opening_status` ≠ `unknown` | Format structuré (jours + plages horaires) |
| `source` | Données critiques ou sensibles | Texte identifiant la source ("Mairie de Moramanga", "Vérification terrain 2025-01") |
| `last_verified_at` | Données critiques ou sensibles | Date ISO, < 3 mois pour les données critiques |
| `offer_start_date` | C'est une offre | Date valide, ≥ aujourd'hui à la création |
| `offer_end_date` | C'est une offre | Date valide, > `offer_start_date` |
| `gps_lat` / `gps_lng` | Coordonnées fournies | Dans la zone Moramanga : lat ≈ -18.9, lng ≈ 48.2 (±0.15°) |

### Validation des numéros de téléphone

Règles spécifiques au contexte malgache :

| Vérification | Critère |
|--------------|---------|
| Format | 10 chiffres commençant par 03 (mobile) ou 02 (fixe) |
| Préfixes mobiles valides | 032, 033, 034, 038 |
| Suspicion | Numéro avec moins de 10 chiffres → signaler |
| Suspicion | Numéro commençant par 00 ou +33 → vérifier (erreur fréquente) |
| Doublon | Même numéro sur deux fiches différentes → vérifier |

---

## Détection des doublons

### Critères de détection

Un doublon potentiel est signalé lorsque **au moins 2 critères** correspondent :

| Critère | Méthode de comparaison |
|---------|----------------------|
| Nom | Similarité ≥ 80% (après normalisation : minuscules, sans accents, sans "le/la/les") |
| Téléphone | Correspondance exacte (après normalisation : retrait espaces, tirets, préfixe +261→03) |
| Adresse / quartier | Même quartier |
| Catégorie | Même catégorie |
| Coordonnées GPS | Distance < 50 mètres |

### Processus de traitement des doublons

1. Identifier les paires suspectes.
2. Comparer les sources et dates de vérification.
3. Conserver la fiche la plus complète et la plus récemment vérifiée.
4. Fusionner les informations complémentaires si applicable.
5. Archiver (ne pas supprimer) la fiche en doublon.
6. Documenter la décision de fusion.

---

## Données d'urgence et sensibles

### Règle absolue
> **Ne jamais publier** d'information d'urgence, médicale, administrative
> ou de sécurité sans source officielle identifiée ET validation humaine.

### Processus pour les données critiques

```
1. Identifier la source officielle (mairie, hôpital, commissariat, etc.).
2. Renseigner le champ `source` avec le nom de la source.
3. Renseigner `last_verified_at` avec la date de vérification.
4. Soumettre en statut `pending`.
5. Un modérateur ou administrateur valide manuellement.
6. La fiche passe en `validated` uniquement après validation humaine.
7. Programmer une re-vérification dans un délai maximum de 3 mois.
```

### Exemples de données critiques

| Type | Exemple | Source attendue |
|------|---------|-----------------|
| Urgences | Numéro pompiers, police, SAMU | Administration officielle |
| Pharmacie de garde | Planning hebdomadaire | Ordre des pharmaciens ou pharmacie |
| Services administratifs | Horaires mairie, état civil | Mairie de Moramanga |
| Santé | Horaires médecin, hôpital | Établissement concerné |

---

## Offres et événements

### Validation des offres

| Champ | Règle |
|-------|-------|
| `title` | Non vide, 5–100 caractères, décrit clairement l'offre |
| `offer_start_date` | Date valide, ≥ date du jour à la création |
| `offer_end_date` | Date valide, > `offer_start_date`, durée max recommandée : 90 jours |
| `price` | Si renseigné, nombre positif avec devise (Ar) |
| `conditions` | Texte clair, pas de conditions cachées ou ambiguës |
| `listing_id` | Rattachée à une fiche validée existante |

Signaler automatiquement :
- Offre sans date de fin → risque d'offre périmée affichée.
- Offre avec date de fin dépassée → à archiver.
- Offre avec prix à 0 Ar → vérifier si c'est intentionnel (gratuit) ou une erreur.

### Validation des événements

| Champ | Règle |
|-------|-------|
| `title` | Non vide, 5–150 caractères |
| `event_date` | Date valide, ≥ date du jour à la création |
| `event_end_date` | Si renseigné, ≥ `event_date` |
| `location` | Quartier ou adresse à Moramanga |
| `organizer` | Nom de l'organisateur identifié |

Signaler automatiquement :
- Événement sans date → ne pas publier.
- Événement passé encore affiché → archiver.

---

## Piste d'audit

Chaque modification de donnée locale doit enregistrer :

| Champ d'audit | Contenu |
|---------------|---------|
| `created_by` | ID de l'utilisateur qui a créé l'entrée |
| `created_at` | Horodatage de création |
| `updated_by` | ID du dernier utilisateur ayant modifié |
| `updated_at` | Horodatage de la dernière modification |
| `verified_by` | ID du modérateur ou admin ayant validé |
| `last_verified_at` | Horodatage de la dernière vérification |
| `verification_status` | Statut actuel : draft, pending, validated, rejected, suspended |
| `rejection_reason` | Motif si rejeté ou suspendu |

### Règles d'audit
- Ne jamais supprimer physiquement une fiche. Utiliser `status = 'archived'`.
- Conserver l'historique des changements de statut.
- Les modérateurs doivent renseigner un motif lors d'un rejet.

---

## Import de données en masse

Lors d'un import batch (CSV, JSON, API) :

### Avant l'import
- [ ] Vérifier le format et l'encodage du fichier (UTF-8 obligatoire).
- [ ] Mapper les colonnes source vers le schéma AIZÉ.
- [ ] Identifier les champs manquants ou incompatibles.
- [ ] Définir le `verification_status` par défaut (`pending` recommandé).

### Pendant l'import
- [ ] Valider chaque ligne selon les règles par champ ci-dessus.
- [ ] Signaler les lignes invalides sans bloquer l'import complet.
- [ ] Détecter les doublons par rapport aux données existantes.
- [ ] Normaliser les numéros de téléphone au format standard.
- [ ] Normaliser les noms de quartiers vers les valeurs de référence.

### Après l'import
- [ ] Produire un rapport : lignes importées / rejetées / doublons.
- [ ] Soumettre les fiches importées en modération (`status = 'pending'`).
- [ ] Vérifier un échantillon de 10% manuellement.

---

## Anti-patterns à éviter

| ❌ Erreur | ✅ Bonne pratique |
|-----------|-------------------|
| Publier une fiche sans numéro de téléphone vérifié | Exiger au minimum un moyen de contact validé |
| Copier des données Facebook/Google sans vérification | Vérifier chaque donnée et citer la source |
| Afficher "Ouvert" sans données d'horaires fiables | Afficher "Horaires non vérifiés" ou `opening_status = 'unknown'` |
| Publier un contact d'urgence trouvé en ligne | Vérifier auprès de la source officielle |
| Importer en masse avec `status = 'validated'` | Importer en `status = 'pending'` et modérer |
| Supprimer une fiche signalée comme incorrecte | Passer en `status = 'suspended'` + enquêter |
| Afficher une offre dont la date est dépassée | Archiver automatiquement les offres expirées |

---

## Rapport de qualité des données

À la fin de chaque audit, produire :

```
## Rapport de qualité — Données locales AIZÉ

### Périmètre audité
- Nombre de fiches : [N]
- Catégories : [liste]
- Date de l'audit : [date]

### Résultats

| Indicateur | Valeur |
|------------|--------|
| Fiches complètes (tous champs obligatoires) | X / N |
| Fiches avec contact vérifié | X / N |
| Fiches avec source identifiée (si sensible) | X / N |
| Doublons détectés | X |
| Offres expirées encore visibles | X |
| Données critiques sans validation humaine | X |

### Problèmes identifiés
1. [Description + priorité : critique / important / mineur]

### Actions recommandées
1. [Action + responsable + délai]

### Verdict
✅ Données prêtes / ⚠️ Corrections nécessaires / ❌ Publication bloquée
```

---

## Critères de validation du skill

Le skill est considéré comme terminé lorsque :
- [ ] Tous les champs obligatoires sont validés selon les règles.
- [ ] La classification de sensibilité est établie pour chaque donnée.
- [ ] Les numéros de téléphone sont vérifiés (format malgache).
- [ ] Les doublons potentiels sont identifiés et traités.
- [ ] Les données critiques ont une source et une date de vérification.
- [ ] Les offres et événements ont des dates valides.
- [ ] La piste d'audit est complète (created/updated/verified).
- [ ] Le rapport de qualité est produit avec un verdict.
