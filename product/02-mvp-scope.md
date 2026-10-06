# AIZÉ — Périmètre MVP (Scope)

> Ce document définit strictement ce qui entre et n’entre pas dans le MVP d’AIZÉ.
> Son rôle premier est de protéger le budget, les crédits Lovable, les ressources de l'équipe et le temps de développement.

---

## 1. Principes directeurs du MVP

Pour Moramanga, le MVP doit être **ultra-pragmatique**, rapide, léger et utilisable dès le premier jour sur des connexions parfois limitées.
- **Zéro friction d'accès** : Les informations utiles doivent être trouvables immédiatement sans inscription obligatoire.
- **Pas de réinvention de la roue** : Tirer parti des habitudes locales existantes (Appels directs, WhatsApp, repères physiques).
- **Zéro fonctionnalité complexe prématurée** : Pas de paiement en ligne, pas de portefeuille, pas de livraison gérée en propre, pas de messagerie instantanée lourde.

---

## 2. Tableau de cadrage des fonctionnalités

| Fonctionnalité | Périmètre | Pourquoi | Responsable de la donnée | Condition de lancement |
| :--- | :--- | :--- | :--- | :--- |
| **Annuaire local** | **MVP (Oui)** | Cœur de l’utilité quotidienne. | Équipe AIZÉ / Pros | Requis dès J1 (base initiale de fiches vérifiées). |
| **Recherche par service / mot-clé** | **MVP (Oui)** | Action principale de l'utilisateur. | Système / Indexation | Requis dès J1. |
| **Catégories locales** | **MVP (Oui)** | Navigation intuitive et découverte rapide. | Équipe AIZÉ | Requis dès J1 (taxonomie locale simple). |
| **Fiches commerces & prestataires** | **MVP (Oui)** | Valeur centrale offerte aux professionnels. | Équipe AIZÉ / Pros | Requis dès J1. |
| **Boutons Appeler / WhatsApp** | **MVP (Oui)** | Mise en relation immédiate adaptée à Madagascar. | Professionnel | Requis dès J1 (liens directs `tel:` et `wa.me/`). |
| **Carte et localisation** | **MVP (Oui - Léger)** | Prise de décision rapide et repérage. | Équipe AIZÉ / Pros | Requis dès J1 (repères quartiers + lien Maps externe). |
| **Horaires & statut ouvert/fermé** | **MVP (Oui)** | Répond au besoin quotidien essentiel. | Professionnel / Équipe | Requis dès J1 (gestion statut par défaut si inconnu). |
| **Offres et promotions** | **MVP (Conditionnel)** | Premier levier de monétisation. | Professionnels validés | Dès que 50+ fiches actives sont en ligne. |
| **Événements locaux** | **MVP (Oui - Curaté)** | Suscite le retour régulier sur l'application. | Équipe AIZÉ (au départ) | Requis dès J1 avec une curation minimale. |
| **Signalement d'erreur** | **MVP (Oui)** | Maintien participatif de la qualité des données. | Tout utilisateur (visiteur/habitant) | Requis dès J1 (formulaire simple sans friction). |
| **Tableau de bord administrateur** | **MVP (Oui)** | Gestion du contenu, modération et validation. | Équipe AIZÉ | Requis dès J1 (indispensable pour valider les fiches). |
| **Compte professionnel** | **MVP (Oui)** | Gestion autonome des fiches et offres par les pros. | Professionnels | Requis dès J1 (processus simple d'onboarding). |
| **Compte habitant** | **Léger / Post-lancement** | Réduire la friction au maximum pour les visiteurs. | Habitant | Optionnel au départ (uniquement si favoris/soumissions). |
| **Avis publics** | **Version contrôlée** | Éviter les conflits et la diffamation locale. | Habitants / Modération | Modération a priori obligatoire avant affichage. |
| **Demande de service** | **Phase 2** | Forte utilité, mais nécessite du cadrage opérationnel. | Habitants / Pros | Après validation de la traction de l'annuaire. |
| **Réservation en ligne** | **Phase 2** | Nécessite un engagement fort des commerçants. | Professionnels | Après validation des usages réels. |
| **Paiement en ligne** | **Phase 3** | Complexité réglementaire, bancaire et conformité. | Prestataire tiers / Fintech | Après validation éprouvée du modèle économique. |
| **Livraison intégrée** | **Phase 3** | Nécessite une véritable logistique locale dédiée. | Partenaires logistiques | Hors périmètre logiciel pur au lancement. |
| **Chat interne intégré** | **Non au départ** | WhatsApp et appels suffisent largement et coûtent 0€. | Utilisateurs | Rejeté au MVP pour éviter dispersion et coûts. |
| **Portefeuille AIZÉ (Wallet)** | **Non** | Complexité technique, juridique et financière inutile. | Établissement financier | Rejeté formellement. |

---

## 3. Ce qui est formellement exclu du MVP

1. **Aucun système de paiement intégré** : Les transactions financières se règlent en direct entre le client et le prestataire (Mobile Money direct, espèces).
2. **Aucune messagerie instantanée interne** : Les boutons prioritaires restent **Appeler** et **WhatsApp**.
3. **Aucun système de livraison géré par la plateforme** : L'accord de livraison se fait en direct.
4. **Aucun mur social ou fil d'actualité non modéré** : Toute information publiée passe par les filtres de qualité et modération.

---

## 4. Jalons de livraison

- **Jalon 1 (MVP Fondations)** : Annuaire vérifié, recherche par catégorie/quartier, fiches détails avec contact direct (Appel/WhatsApp/Itinéraire), back-office admin/modération.
- **Jalon 2 (MVP Monétisation & Vie locale)** : Activation des offres sponsorisées (dès 50 fiches), agenda des événements vérifiés, signalements d'erreurs traités en continu.
- **Jalon 3 (Phase 2)** : Demandes de devis/services, réservation basique, comptes habitants avec historique et favoris enrichis.
- **Jalon 4 (Phase 3)** : Expérimentation paiement d'offres / commissions, partenariats logistiques locaux.
