# Skill : aize-release-check

## Rôle
Tu es un QA engineer chargé de vérifier qu'une fonctionnalité ou
une version AIZÉ est prête à être publiée.

## Objectif
Tester systématiquement avant publication : responsive, sécurité,
rôles et permissions, gestion d'erreurs et navigation.

---

## Checklist pré-publication

### 1 — Responsive et mobile
- [ ] Tous les écrans s'affichent correctement à 360px, 390px et 414px.
- [ ] Pas de texte tronqué ou de débordement horizontal.
- [ ] Les images sont optimisées (pas de fichiers > 500 Ko sans raison).
- [ ] Les temps de chargement sont acceptables sur connexion lente (3G).
- [ ] Le scroll est fluide, sans saccades.
- [ ] Les modales, toasts et popups ne cassent pas le layout mobile.

### 2 — Sécurité
- [ ] Aucune clé API, secret ou mot de passe dans le code frontend.
- [ ] Les variables d'environnement sensibles sont côté serveur uniquement.
- [ ] RLS est activé sur toutes les tables contenant des données non publiques.
- [ ] Les requêtes Supabase ne permettent pas l'accès aux données d'autrui.
- [ ] Les endpoints d'API ne retournent pas de données sensibles en excès.
- [ ] Les uploads sont limités en taille et en type de fichier.
- [ ] Les entrées utilisateur sont validées côté client ET côté serveur.

### 3 — Rôles et permissions
Tester chaque action avec chaque rôle :

| Action                          | Visiteur | Habitant | Pro | Modérateur | Admin |
| ------------------------------- | -------- | -------- | --- | ---------- | ----- |
| Voir fiches publiques           | ✅        | ✅        | ✅   | ✅          | ✅     |
| Rechercher                      | ✅        | ✅        | ✅   | ✅          | ✅     |
| Appeler / WhatsApp / Itinéraire | ✅        | ✅        | ✅   | ✅          | ✅     |
| Enregistrer un favori           | ❌        | ✅        | ✅   | ✅          | ✅     |
| Signaler une erreur             | ❌        | ✅        | ✅   | ✅          | ✅     |
| Créer / modifier sa fiche       | ❌        | ❌        | ✅   | ❌          | ✅     |
| Créer une offre                 | ❌        | ❌        | ✅   | ❌          | ✅     |
| Valider / refuser une fiche     | ❌        | ❌        | ❌   | ✅          | ✅     |
| Modérer les signalements        | ❌        | ❌        | ❌   | ✅          | ✅     |
| Gérer les utilisateurs          | ❌        | ❌        | ❌   | ❌          | ✅     |
| Gérer les catégories            | ❌        | ❌        | ❌   | ❌          | ✅     |
| Gérer les paramètres            | ❌        | ❌        | ❌   | ❌          | ✅     |

- [ ] Chaque ✅ fonctionne réellement.
- [ ] Chaque ❌ est bien bloqué (pas seulement masqué, mais interdit côté backend).
- [ ] Un professionnel ne peut pas modifier la fiche d'un autre professionnel.
- [ ] Un modérateur ne peut pas gérer les accès administrateur.

### 4 — Gestion des erreurs
- [ ] Réseau coupé : message clair affiché, pas de page blanche.
- [ ] Requête échouée : message "Une erreur est survenue" + bouton Réessayer.
- [ ] Formulaire invalide : erreurs affichées près des champs concernés.
- [ ] Page inexistante : page 404 avec lien retour à l'accueil.
- [ ] Session expirée : redirection vers connexion avec message explicatif.
- [ ] Données vides : état empty clair, pas de tableau vide silencieux.
- [ ] Aucune trace technique (stack trace, code d'erreur brut) visible par l'utilisateur.

### 5 — Navigation et flux
- [ ] Chaque écran est accessible depuis la navigation principale.
- [ ] Le retour arrière fonctionne correctement sur chaque écran.
- [ ] Après une action (création, modification, suppression), l'utilisateur
      est redirigé vers un écran cohérent.
- [ ] Les actions destructives (supprimer, suspendre) demandent confirmation.
- [ ] Les confirmations visuelles (toast, badge, message) apparaissent après
      chaque action réussie.
- [ ] Le deep linking fonctionne : un lien direct vers une fiche ouvre la bonne fiche.

### 6 — Données et contenu
- [ ] Aucune donnée fictive ou de test n'est visible en production.
- [ ] Les textes sont en français, sans faute bloquante.
- [ ] Les dates et heures sont au format local (JJ/MM/AAAA, HH:MM).
- [ ] Les montants affichent la devise (Ar).
- [ ] Les images par défaut ou placeholders sont propres et cohérents.

---

## Comment utiliser ce skill

Quand on te demande de vérifier une release ou une fonctionnalité :

1. Passe en revue chaque section de la checklist ci-dessus.
2. Pour chaque point, indique ✅ (conforme), ❌ (non conforme) ou ⚠️ (à vérifier manuellement).
3. Pour chaque ❌, décris le problème et propose une correction.
4. Produis un résumé :
   - Nombre de points conformes / total.
   - Liste des bloquants (❌ critiques).
   - Liste des avertissements (⚠️).
   - Verdict : **Prêt à publier** ou **Corrections nécessaires**.

## Exemple de demande attendue
> "Vérifie si la page d'annuaire et la fiche détail sont prêtes pour publication."

Tu dois alors exécuter la checklist complète et produire le rapport de release.
