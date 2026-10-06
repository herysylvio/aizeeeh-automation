# Brief Opérationnel — Collecte des Données Réelles de Lancement (AIZÉ)

> **Objectif :** Réunir entre **50 et 100 fiches locales réelles et vérifiées** à Moramanga avant l'ouverture de la plateforme.
> Une application locale vide ne génère aucune confiance. Le premier habitant qui ouvre AIZÉ doit trouver immédiatement des informations justes et actionnables.

---

## 1. Répartition des quotas par catégorie (Cible : 70 à 80 fiches idéales)

Pour que la valeur soit immédiatement perceptible, nous ne collectons pas au hasard. Voici la cible prioritaire :

| Priorité | Catégorie | Cible min. | Détails à collecter en priorité |
| :--- | :--- | :--- | :--- |
| **P0 (Vital)** | **Urgences & Sécurité** | 4–6 contacts | Police, Gendarmerie, Urgences hôpital, Pompiers. Numéros testés obligatoirement. |
| **P0 (Vital)** | **Pharmacies** | Toutes (~4–6) | Nom exact, téléphone, quartier, repère visuel, système de garde. |
| **P1 (Quotidien)** | **Services Publics & Utilités** | 6–10 fiches | Mairie (état civil), JIRAMA (dépannage/agence), La Poste, Trésor, CSB II. |
| **P1 (Quotidien)** | **Santé (Hors pharmacies)** | 6–8 fiches | Cabinets médicaux, dispensaires, dentistes, laboratoires d'analyses. |
| **P1 (Quotidien)** | **Transports & Gares** | 8–12 fiches | Coopératives taxi-brousse (lignes Tana, Tamatave, Lac Alaotra), points Bajaj, transporteurs. |
| **P2 (Économie)** | **Mécaniciens & Garages** | 8–12 fiches | Garages moto/scooter (très demandés), garages auto, vulcanisateurs (pneus). |
| **P2 (Vie locale)** | **Restaurants, Snacks, Gargotes** | 12–15 fiches | Établissements connus, spécialités, quartier, numéro pour commander ou réserver. |
| **P2 (Tourisme/Passage)** | **Hôtels & Hébergements** | 6–10 fiches | Hôtels centre-ville et axes principaux, numéros de réservation, repères. |
| **P3 (Animation)** | **Événements à venir** | 3–5 événements | Événements réels prévus dans les 30 prochains jours (sport, église, foire, concert). |

---

## 2. Rôles et organisation de l'équipe

L'équipe compte **3 piliers actifs** et **1 contributrice à statut spécial (Volana)**.

```
                    ┌────────────────────────┐
                    │     SYLVIO (Lead)      │
                    │   Ops, Tech & Audit    │
                    └───────────┬────────────┘
                                │
        ┌───────────────────────┴───────────────────────┐
        ▼                                               ▼
┌────────────────────────┐                    ┌────────────────────────┐
│   DÉON (Terrain/Com)   │                    │  BIDY (Design/Visuel)  │
│ Relations, Commerçants │                    │ Photos fiches, Repères │
│   & Services Publics   │                    │  & Qualité d'affichage │
└────────────────────────┘                    └────────────────────────┘
        │
        └───────────────────────┬───────────────────────┘
                                ▼
                    ┌────────────────────────┐
                    │    VOLANA (Renfort)    │
                    │ Micro-collecte & Test  │
                    │ (Sans pression / Cool) │
                    └────────────────────────┘
```

### 👨‍💻 Sylvio — Porteur de projet, Ops & Technique
- **Responsabilité :** Gardien du standard de qualité, centralisation et intégration.
- **Tâches clés :**
  1. Mettre en place la feuille de collecte partagée (Google Sheets basé sur [`template-listings.csv`](file:///c:/Users/sylvi/DEV/AIZE/data/seed/template-listings.csv)).
  2. Prendre en charge les **contacts institutionnels & urgences** (ou en binôme avec Déon) : Mairie, Forces de l'ordre, JIRAMA.
  3. Vérifier systématiquement les numéros (faire sonner les numéros pour valider qu'ils répondent).
  4. Importer les données dans la base Supabase une fois validées.

### 🗣️ Déon — Community Leader & Animateur d'équipe
- **Responsabilité :** Ambassadeur de terrain, contact humain, collecte directe.
- **Tâches clés :**
  1. Aller à la rencontre des **coopératives de transport, mécaniciens/garages et restaurateurs**.
  2. Présenter AIZÉ en 30 secondes : *"Nous créons l'annuaire mobile gratuit pour que les habitants vous trouvent et vous appellent directement sur WhatsApp ou téléphone."*
  3. Récupérer les informations clés : Nom du responsable, numéro d'appel, numéro WhatsApp, repère physique ("près de tel endroit"), horaires approximatifs.
  4. Identifier 2 ou 3 événements locaux à venir dans la ville.

### 🎨 Bidy — Graphiste & Identité Visuelle
- **Responsabilité :** Valorisation visuelle et repérage de terrain.
- **Tâches clés :**
  1. Lors des tournées de collecte (ou en appui de Déon), prendre **1 à 2 photos nettes en format paysage/mobile** de la devanture ou de l'enseigne des commerces clés (restaurants réputés, hôtels, pharmacies, gares).
  2. Vérifier la lisibilité des noms d'enseignes et enseignes locales.
  3. Préparer les icônes visuelles et placeholders par défaut pour chaque catégorie (ex: badge par défaut pour mécanicien sans photo, etc.).
  4. Créer 3 visuels ou flyers simples pour expliquer AIZÉ aux commerçants visités.

---

## 3. Gestion du cas de Volana : Recommandation & Stratégie

### 💡 Analyse et avis stratégique
Il ne faut **ni** lui imposer une charge lourde qui risquerait de créer de la culpabilité ou des retards, **ni** la mettre totalement à l'écart brutalement (ce qui risquerait de la vexer si elle découvre le projet par des tiers à Moramanga).

**La meilleure décision : Le rôle d'"Ambassadrice de Quartier & Relectrice VIP"**
- Aucun livrable bloquant sur le chemin critique.
- Une micro-mission valorisante, réalisable en 30 minutes depuis son téléphone ou son trajet quotidien.
- Un accueil bienveillant : si elle le fait, c'est du bonus ; si elle ne le fait pas, le lancement d'AIZÉ n'est jamais retardé.

---

## 4. Micro-Brief à envoyer à Volana

*Texte prêt à être partagé à Volana (par WhatsApp ou de vive voix par Sylvio ou Déon) :*

---

> **Coucou Volana !** 👋
> 
> Avec Sylvio, Déon et Bidy, on travaille en ce moment sur une nouvelle initiative locale pour Moramanga qui s'appelle **AIZÉ** : une petite application mobile pour permettre à tout le monde de trouver facilement les pharmacies, numéros d'urgence, mécanos, gargotes et services de la ville en un clic.
> 
> On sait que tu es très occupée en ce moment par tes affaires perso, donc **zéro stress, on ne veut surtout pas te surcharger**. L'équipe gère tout le gros du travail !
> 
> Par contre, ton regard compte pour nous. On aimerait juste te proposer, si tu as 15 ou 20 minutes quand tu as un moment de libre :
> 1. **Ta mini-liste (5 à 10 adresses) :** Nous donner le contact de 5 à 10 bons plans ou prestataires fiables que toi et tes proches utilisez souvent à Moramanga (ton épicerie favorite, un bon réparateur moto, un médecin ou snack de confiance avec leur numéro).
> 2. **Ton œil critique :** Quand la version test de l'appli sera prête sur smartphone, te la faire tester en avant-première pour que tu nous dises ce que tu en penses et si c'est facile à utiliser.
> 
> Dis-nous si ça te va ! Aucune obligation de délai, c'est juste un plaisir de t'avoir dans l'aventure selon tes disponibilités. 😊

---

## 5. Fiche Méthode de Collecte Terrain (Règles d'or)

Pour chaque fiche collectée, respecter les 5 critères qualité :
1. **Un repère physique obligatoire :** À Moramanga, les numéros de rue n'ont pas de sens. Noter toujours un repère clair (*"face station Shell"*, *"à 50m du bazar après le pont"*).
2. **Le numéro de téléphone exact :** Vérifier que c'est un numéro qui fonctionne (Orange, Telma, Airtel). Préciser s'il a WhatsApp.
3. **Le statut de vérification initial :**
   - Si vérifié de visu ou par appel : `status = 'validated'`.
   - Si transmis par bouche-à-oreille sans preuve : `status = 'pending'`.
4. **Pas d'informations inventées :** Si les horaires précis ne sont pas connus, indiquer `opening_status = 'unknown'` plutôt que de deviner.
5. **Courtoisie locale :** Toujours demander poliment l'autorisation au commerçant d'apparaître gratuitement dans l'annuaire public d'AIZÉ.

---

## 6. Planning suggéré (Sprint de 7 jours)

- **Jour 1 :** Réunion rapide de lancement (Sylvio, Déon, Bidy) + partage du Google Sheet. Prise de contact douce avec Volana.
- **Jours 2 & 3 :** P0 Vital (Urgences, 100% des pharmacies, centres de santé) + Services communaux.
- **Jours 4 & 5 :** Transports (coopératives taxi-brousse), Garages / Mécaniciens clés de la ville.
- **Jours 6 :** Hôtels, restaurants emblématiques, snacks du centre-ville.
- **Jour 7 :** Nettoyage des données, vérification des doublons avec Sylvio, intégration dans `data/seed/`.
