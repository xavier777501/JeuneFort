# Jeune Fort Agrobusiness — Plateforme e-commerce

**Élevage • Équipements • Accompagnement technique**

Plateforme e-commerce complète (catalogue, commande et paiement en ligne) pour **Jeune Fort Agrobusiness**, entreprise béninoise spécialisée dans l'élevage et l'accompagnement de projets agricoles.

> Ce projet est basé sur le **Cahier des Charges v1.0 (Août 2026, Bénin)**.

---

## Table des matières

1. [Présentation](#présentation)
2. [Périmètre fonctionnel](#périmètre-fonctionnel)
3. [Architecture technique](#architecture-technique)
4. [Structure du projet](#structure-du-projet)
5. [Modèle de données](#modèle-de-données)
6. [Démarrage rapide](#démarrage-rapide)
7. [Passerelle de paiement](#passerelle-de-paiement)
8. [Livraison et retrait](#livraison-et-retrait)
9. [Exigences non fonctionnelles](#exigences-non-fonctionnelles)
10. [Déploiement](#déploiement)
11. [Planning](#planning)

---

## Présentation

Jeune Fort Agrobusiness intervient sur trois grands pôles d'activité :

- **Conseil et accompagnement technique** de projets agricoles ;
- **Fabrication et vente d'équipements d'élevage** ;
- **Vente de produits vivants et alimentaires** issus de l'élevage.

Le site vise à offrir une vitrine numérique professionnelle permettant de présenter le catalogue, de passer commande et de payer en ligne (mobile money / carte bancaire).

**Cibles** : éleveurs particuliers et professionnels, restaurateurs, revendeurs, consommateurs finaux, porteurs de projets agricoles.

---

## Périmètre fonctionnel

### Services (sans prix fixe — renvoi vers demande de devis)

- Rédaction de projet et de plan d'affaires personnalisé ;
- Installation, suivi et accompagnement technique des fermes d'élevage ;
- Installation et test des équipements d'élevage ;
- Gestion complète des fermes d'élevage.

### Catégories de produits

| Catégorie | Détail |
|---|---|
| Poussins | Poussins d'un jour ; poussins d'un mois chauffés et vaccinés (pondeuse, coquelet, goliathaux, pintadeaux, cailleteaux) |
| Intrants santé | Probiotiques et médicaments naturels à base de plantes médicinales |
| Équipements d'élevage | Couveuses automatiques, poussinières, cages en batterie, cages d'engraissement (poulet, lapin, caille) |
| Animaux réformés | Poulet, caille, pintade, lapin — vivants ou abattus |
| Produits alimentaires | Œufs de table, œufs de caille frais |
| Provende | Démarrage, croissance, pré-ponte, ponte, finition |

### Front-office (visiteur)

- Page d'accueil présentant l'entreprise et ses trois pôles d'activité ;
- Page « Nos services » avec demande de devis ;
- Page « Nos produits » : catalogue filtrable par catégorie et disponibilité ;
- Fiche produit détaillée (photos, description, prix, disponibilité, ajout au panier) ;
- Panier d'achat (ajout, modification de quantité, suppression) ;
- Création de compte client (inscription / connexion) + espace personnel ;
- Commande en mode invité (sans création de compte) ;
- Tunnel de commande : récapitulatif, mode de réception, informations de livraison ;
- Paiement en ligne sécurisé : MTN Money, Moov Money, carte bancaire ;
- Confirmation de commande par email et/ou SMS ;
- Suivi de commande (en attente, payée, en préparation, expédiée, livrée) ;
- Pages « À propos », « Contact » (formulaire, WhatsApp, localisation) ;
- Site responsive, optimisé mobile.

### Back-office (administration)

- Authentification sécurisée (email / mot de passe) ;
- CRUD produits et photos, gestion des catégories ;
- Gestion des stocks et statut de disponibilité (en stock, sur commande, vendu) ;
- Gestion des commandes (consultation, changement de statut, historique client) ;
- Suivi des paiements (statut, référence, rapprochement commande) ;
- Gestion des zones et frais de livraison ;
- Consultation des demandes de contact ;
- Gestion du contenu des services ;
- Tableau de bord (commandes du jour, chiffre d'affaires, produits les plus vendus).

---

## Architecture technique

Architecture **découplée** : frontend et backend séparés, communiquant via une **API REST**.

| Composant | Technologie | Rôle |
|---|---|---|
| Frontend | **Next.js** (React + TypeScript + Tailwind CSS) | Interface utilisateur, catalogue, panier, tunnel de commande |
| Backend / API | **Python — FastAPI** | Logique métier, routes API, validation, Swagger |
| Base de données | **MySQL** | Produits, catégories, services, commandes, paiements, contacts |
| ORM | **SQLAlchemy** | Liaison backend ↔ MySQL |
| Authentification | **JWT** | Comptes clients et espace admin |
| Paiement | **Kkiapay** | MTN Money, Moov Money, cartes (Visa/Mastercard) |
| Images | **Cloudinary / S3** | Hébergement des photos produits hors serveur applicatif |
| Notifications | **SMTP + SMS + WhatsApp Business** | Confirmations de commande, demandes de contact |

---

## Structure du projet

```
jeune-fort-agrobusiness/
├── README.md
├── .gitignore
├── backend/                        # API FastAPI
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── .env.example
│   ├── app/
│   │   ├── main.py                 # Point d'entrée de l'API
│   │   ├── core/                   # Configuration & sécurité (config, JWT, hachage)
│   │   ├── api/
│   │   │   ├── dependencies.py     # Dépendances FastAPI (DB, auth)
│   │   │   └── routes/             # Routes : auth, categories, produits,
│   │   │                           #   services, commandes, paiements,
│   │   │                           #   demandes_contact, admin
│   │   ├── models/                 # Modèles SQLAlchemy (tables MySQL)
│   │   ├── schemas/                # Schémas Pydantic (validation)
│   │   ├── crud/                   # Accès aux données
│   │   └── db/                     # Session, Base, initialisation BDD
│   └── tests/                      # Tests (pytest)
└── frontend/                       # Next.js (React + TS + Tailwind)
    ├── package.json
    ├── next.config.ts
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── .env.example
    ├── app/
    │   ├── layout.tsx / page.tsx / globals.css
    │   ├── (front-office)/         # Pages publiques
    │   │   ├── produits/ /produits/[id]
    │   │   ├── services/  panier/  commande/
    │   │   ├── contact/   a-propos/  compte/  commandes/[id]
    │   └── admin/                  # Back-office
    │       ├── tableau-de-bord/  produits/  categories/
    │       ├── commandes/  paiements/  services/  demandes/  livraison/
    ├── components/
    │   ├── layout/                 # Header, Footer, Navigation
    │   ├── ui/                     # Composants réutilisables (boutons, cartes…)
    │   └── catalogue/              # Liste produits, fiche produit, panier
    ├── lib/                        # Client API, utilitaires
    ├── types/                      # Types TypeScript
    └── public/                     # Assets statiques
```

---

## Modèle de données

Tables principales (selon le cahier des charges) :

| Table | Champs principaux |
|---|---|
| `categories` | id, nom |
| `produits` | id, categorie_id, nom, description, prix, stock, disponibilite, date_ajout |
| `produit_images` | id, produit_id, url_image |
| `services` | id, nom, description |
| `clients` | id, nom, telephone, email, mot_de_passe (haché, nullable si invité), adresse |
| `commandes` | id, client_id (nullable si invité), date, statut, mode_reception, zone_livraison, frais_livraison, montant_total |
| `commande_lignes` | id, commande_id, produit_id, quantite, prix_unitaire |
| `paiements` | id, commande_id, montant, methode (mobile_money/carte), statut, reference_transaction, date |
| `demandes_contact` | id, nom_client, telephone, message, produit_id, service_id, date |
| `admin_users` | id, email, mot_de_passe (haché), role |

---

## Démarrage rapide

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate            # Windows
pip install -r requirements.txt
copy .env.example .env           # puis renseigner les variables
uvicorn app.main:app --reload --port 8000
```

Documentation API (Swagger) : <http://localhost:8000/docs>

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Site accessible sur <http://localhost:3000>.

---

## Passerelle de paiement

**Kkiapay** est retenu (source béninoise, app mobile de suivi, PCI DSS, MTN Money / Moov Money / cartes Visa & Mastercard, frais compétitifs).

- Mode sandbox disponible via `KKIAPAY_SANDBOX=true`.
- Le choix final de l'agrégateur pourra être confirmé selon les conditions commerciales en vigueur (alternatives : Fedapay, CinetPay).

---

## Livraison et retrait

- **Livraison à domicile** : frais calculés automatiquement selon la zone géographique (zones paramétrables depuis l'admin) ;
- **Retrait sur place** : sans frais, au point de vente / ferme de l'entreprise.

Statuts de commande : en attente de paiement → payée → en préparation → expédiée / prête pour retrait → livrée / récupérée.

---

## Exigences non fonctionnelles

- **Performance** : chargement < 3 s en connexion mobile standard ;
- **Sécurité** : mots de passe hachés, JWT, injections SQL évitées via l'ORM, paiements via passerelle PCI DSS ;
- **Compatibilité** : navigateurs récents (Chrome, Firefox, Safari, Edge) + mobile/tablette ;
- **SEO** : HTML sémantique + balisage SEO local ;
- **Maintenabilité** : code structuré, versionné (Git), documenté ;
- **Évolutivité** : architecture permettant l'ajout de fonctionnalités (fidélité, multi-entrepôts…).

---

## Déploiement

| Élément | Solution envisagée |
|---|---|
| Backend API | Railway, Render ou VPS (Hostinger/OVH) avec Docker |
| Frontend | Vercel ou Netlify |
| Base de données MySQL | Hébergeur managé ou instance MySQL sur VPS |
| Nom de domaine | Extension `.com` et/ou `.bj` |

---

## Planning

| Phase | Durée estimée |
|---|---|
| 1. Cadrage (maquettes/wireframes) | 1 semaine |
| 2. Conception BDD & API | 2 semaines |
| 3. Développement frontend | 2 semaines |
| 4. Intégration paiement (Kkiapay) | 1 semaine |
| 5. Espace administrateur | 1 semaine |
| 6. Tests et recette | 2 semaines |
| 7. Déploiement | 2 jours |

---

## Livrables attendus

- Wireframes validés avant développement ;
- Code source frontend (Next.js / TypeScript / Tailwind) — panier et tunnel de commande inclus ;
- Code source backend FastAPI + documentation API (Swagger) ;
- Base de données MySQL structurée et initialisée ;
- Intégration fonctionnelle Kkiapay ;
- Espace d'administration fonctionnel et sécurisé ;
- Site déployé en ligne (domaine + hébergement) ;
- Guide d'utilisation de l'admin + documentation technique.