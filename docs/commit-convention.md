# Convention de commits — AIZÉ

## Format
```
<type>(<scope>): <description courte>
```

## Types autorisés

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `docs` | Documentation uniquement |
| `chore` | Maintenance, dépendances, config |
| `refactor` | Refactorisation sans changement de comportement |
| `style` | Mise en forme, espacement, virgules |
| `test` | Ajout ou correction de tests |
| `perf` | Amélioration de performance |
| `ci` | Configuration CI/CD |

## Scopes courants

| Scope | Périmètre |
|-------|-----------|
| `directory` | Annuaire, fiches, catégories |
| `search` | Recherche et filtres |
| `auth` | Authentification, rôles |
| `offers` | Offres et promotions |
| `events` | Événements |
| `admin` | Administration |
| `moderation` | Modération, signalements |
| `profile` | Profil professionnel |
| `product` | Documentation produit |
| `deps` | Dépendances |
| `db` | Schéma, migrations, RLS |
| `ui` | Interface, composants |

## Exemples

```
feat(directory): add open now filter
fix(search): handle empty query state
docs(product): define MVP scope
chore(deps): update dependencies
```

## Règles
- Description en anglais, minuscule, sans point final.
- Un commit = un changement logique.
- Ne pas mélanger feat et fix dans le même commit.
