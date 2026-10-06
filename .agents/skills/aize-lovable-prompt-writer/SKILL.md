---
name: aize-lovable-prompt-writer
description: >-
  Rédige des prompts Lovable précis et structurés pour AIZÉ.
  Utiliser ce skill lorsque l'utilisateur a besoin d'un prompt pour créer
  une page, un composant, un workflow, une connexion backend, une correction
  de bug ou une amélioration UI dans Lovable.
---

# AIZÉ Lovable Prompt Writer

## Objectif
Produire un prompt unique, ciblé et actionnable pour Lovable.
Un prompt = une tâche = un résultat vérifiable.

---

## Pré-requis

Avant de rédiger un prompt, consulter :
- [Project Knowledge Lovable](../../../LOVABLE/AIZÉ%20—%20Project%20Knowledge.md)
- [Rôles et permissions](../../../product/03-roles-permissions.md)
- [Glossaire](../../../docs/05-glossary.md)
- [Décisions d'architecture](../../../DECISIONS.md)

Si une spécification existe pour la fonctionnalité, la lire en priorité.

---

## Structure obligatoire du prompt

Chaque prompt généré doit contenir les sections suivantes,
dans cet ordre, séparées par des titres clairs :

```
### Contexte
[Écran, fonctionnalité ou composant concerné.
 Expliquer brièvement ce qui existe déjà si applicable.]

### Rôle utilisateur
[Visiteur / Habitant inscrit / Professionnel / Modérateur / Administrateur.
 Préciser si plusieurs rôles sont concernés et les différences de comportement.]

### Modification demandée
[Description exacte et délimitée de ce qui doit être créé ou modifié.
 Utiliser des verbes d'action : "Créer", "Ajouter", "Modifier", "Supprimer",
 "Connecter", "Afficher", "Masquer", "Corriger".]

### Comportement attendu
[Ce que l'utilisateur voit et peut faire après la modification.
 Décrire les interactions pas à pas si nécessaire.]

### Source de données
[Mock : données fictives réalistes intégrées en dur.
 Supabase : préciser la table, les colonnes utilisées et les filtres.
 Mixte : mock pour certaines données, Supabase pour d'autres.]

### Contraintes
- Mobile-first (min 360px).
- Français pour tous les textes affichés.
- [Contraintes spécifiques à la tâche : RLS, permissions, pas de suppression
  physique, ordre de tri, limite de résultats, etc.]

### États d'interface
- Loading : [décrire le skeleton ou spinner attendu]
- Empty : [message et action suggérée quand il n'y a pas de données]
- Error : [message d'erreur humain + bouton Réessayer]
- Success : [affichage normal des données]

### Responsive
[Décrire le comportement sur mobile (360px), tablette et desktop
 si le composant doit s'adapter. Sinon indiquer "Mobile uniquement".]

### Vérifications demandées
[Liste des tests que Lovable doit effectuer ou rapporter.
 Demander systématiquement la liste des fichiers modifiés.]
```

---

## Types de prompts

### Nouveau composant ou page
Inclure : maquette textuelle du layout, hiérarchie des éléments,
actions utilisateur (boutons, liens, formulaires), données affichées.

### Connexion backend (Supabase)
Inclure : nom de la table, colonnes lues/écrites, filtres,
politique RLS attendue, gestion d'erreur réseau.

### Correction de bug
Inclure : comportement actuel (ce qui se passe), comportement attendu
(ce qui devrait se passer), étapes pour reproduire, écran concerné.

### Amélioration UI
Inclure : élément ciblé, problème visuel ou UX actuel,
résultat visuel attendu, référence de style si applicable.

---

## Règles de rédaction

### Précision
- Utiliser des verbes d'action concrets, pas des adjectifs vagues.
- Nommer les composants, écrans et tables explicitement.
- Spécifier les dimensions, couleurs ou espacements quand ils comptent.
- Indiquer les textes exacts à afficher (labels, messages, placeholders).

### Périmètre
- Un prompt = une seule tâche cohérente.
- Ne pas combiner des tâches non liées (ex: "Ajouter la recherche ET corriger
  le footer ET changer la couleur du header").
- Ne pas modifier la navigation ou le schéma de base de données sauf si
  explicitement demandé dans la tâche.

### Données
- Si aucune donnée vérifiée n'existe, utiliser des données fictives
  réalistes et locales (plausibles pour Moramanga).
- Marquer clairement les données fictives avec un commentaire
  `// MOCK DATA — à remplacer par Supabase`.
- Ne jamais inventer de vrais noms d'entreprises, horaires officiels
  ou informations locales réelles.

### Traçabilité
- Demander à Lovable de lister les fichiers créés ou modifiés.
- Demander à Lovable de lister les tables ou colonnes touchées.
- Demander à Lovable de confirmer les cas testés.

---

## Anti-patterns à éviter

| ❌ Mauvais prompt | ✅ Bon prompt |
|-------------------|---------------|
| "Fais une belle page pharmacie" | "Crée la page PharmacyListPage affichant une liste de pharmacies avec nom, adresse, statut ouvert/fermé et boutons Appeler, WhatsApp, Itinéraire" |
| "Améliore tout le design" | "Augmenter le contraste du texte secondaire de #999 à #666 sur les cartes de fiches" |
| "Connecte tout à Supabase" | "Connecter PharmacyListPage à la table `listings` avec filtre `category = 'pharmacie'` et `status = 'validated'`" |
| "Gère les erreurs" | "Ajouter un état error sur PharmacyListPage : afficher 'Impossible de charger les pharmacies' avec un bouton 'Réessayer'" |
| "Fais la page et la base de données et le login" | Un prompt séparé pour chaque tâche |

---

## Exemple complet

```
### Contexte
Page de liste des pharmacies dans l'annuaire AIZÉ.
C'est une nouvelle page, rien n'existe encore.

### Rôle utilisateur
Visiteur (pas d'inscription requise).

### Modification demandée
Créer la page PharmacyListPage avec :
- Un champ de recherche par nom.
- Un filtre par quartier (liste déroulante).
- Une liste de cartes, chaque carte affichant :
  nom, adresse, quartier, statut ouvert/fermé,
  badge "Vérifié" si applicable.
- Boutons d'action sur chaque carte : Appeler, WhatsApp, Itinéraire.

### Comportement attendu
1. L'utilisateur arrive sur la page et voit la liste complète.
2. Il tape dans la recherche → la liste se filtre en temps réel.
3. Il sélectionne un quartier → seules les pharmacies de ce quartier apparaissent.
4. Il clique Appeler → ouverture de l'appli téléphone (lien tel:).
5. Il clique WhatsApp → ouverture WhatsApp (lien wa.me/).
6. Il clique Itinéraire → ouverture Google Maps (lien maps).

### Source de données
Mock — 6 pharmacies fictives avec données réalistes pour Moramanga.
// MOCK DATA — à remplacer par Supabase

### Contraintes
- Mobile-first (min 360px).
- Français pour tous les textes.
- Boutons d'action accessibles sans scroller la carte.
- Éléments tactiles minimum 44×44px.

### États d'interface
- Loading : 3 cartes skeleton avec animation pulse.
- Empty : "Aucune pharmacie trouvée" + suggestion "Essayez un autre quartier".
- Error : "Impossible de charger les pharmacies" + bouton "Réessayer".
- Success : Liste des cartes pharmacies.

### Responsive
Mobile uniquement pour cette étape.

### Vérifications demandées
- Affichage correct à 360px.
- Recherche filtre bien par nom.
- Filtre quartier fonctionne.
- Liens tel:, wa.me/ et maps ouvrent correctement.
- Les 4 états s'affichent selon les cas.
- Lister les fichiers créés.
```

---

## Critères de validation du skill

Le skill est considéré comme terminé lorsque :
- [ ] Le prompt contient toutes les sections obligatoires.
- [ ] La tâche est unique et délimitée (pas de tâches combinées).
- [ ] Le rôle utilisateur est identifié.
- [ ] Les 4 états d'interface sont spécifiés.
- [ ] La source de données est précisée (mock ou Supabase).
- [ ] Aucune instruction vague ou subjective ne reste dans le prompt.
- [ ] La traçabilité est demandée (fichiers modifiés, tests effectués).
