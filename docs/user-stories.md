# Jeune Fort Agrobusiness — User Stories & Répartition du travail

**Projet** : Plateforme e-commerce (catalogue, commande, paiement en ligne)
**Base** : Cahier des charges v1.0 — Août 2026
**Stack** : Backend FastAPI (MySQL/SQLAlchemy/JWT/Kkiapay) · Frontend Next.js (React/TS/Tailwind)

**Équipe (2 développeurs)**
- **Xavier** — **Backend / API** (expert backend) : tout le socle FastAPI, BDD, auth, routes API, paiements, notifications, upload images + toute la partie back-office (admin)
- **Charles** — **Frontend / Intégration** : toute l'interface utilisateur Next.js, front-office (client) ET espace d'administration (qui consomme les API de Xavier)

> Xavier livre les API + la BDD ; Charles construit toutes les pages Next.js et les branche sur les endpoints de Xavier. Travail en parallèle : Charles pourra démarrer sur l'UI avec des données mockées tant que les API ne sont pas prêtes.

---

## Format d'une user story

```
US-XX — En tant que <rôle>, je veux <besoin>, afin de <objectif>.
Critère(s) d'acceptation : <comportement attendu / définition de done>
```

**Définition of Done (DoD) commune**
- Xavier (backend) : route API + validation Pydantic + tests ; Swagger à jour ; migrations BDD.
- Charles (frontend) : page/route Next.js + composants Tailwind responsive ; intégration API réelle.
- Code versionné (Git), documenté, sans secret.

---

# ÉPIC 1 — Catalogue produits (visiteur) — *Charles (UI) / Xavier (API)*

- **US-01** En tant que **visiteur**, je veux consulter la page d'accueil présentant l'entreprise et ses 3 pôles d'activité, afin de comprendre l'offre.
  - *Critères* : hero + catégories + valeurs + CTA vers produits/services.
- **US-02** En tant que **visiteur**, je veux voir le catalogue des produits filtrable par catégorie, afin de trouver rapidement un produit.
  - *Critères* : filtres catégorie (Poussins, Intrants santé, Équipements, Animaux réformés, Œufs, Provende), filtres prix et disponibilité, pagination.
- **US-03** En tant que **visiteur**, je veux consulter une fiche produit détaillée (photos, description, prix, stock, disponibilité), afin de décider d'acheter.
  - *Critères* : galerie photos, prix, sélecteur de quantité, statut (en stock/sur commande/vendu), bouton ajout au panier.
- **US-04** En tant que **visiteur**, je veux rechercher un produit par nom, afin de le trouver rapidement.
- **US-05** En tant que **visiteur**, je veux voir la disponibilité du produit en temps réel, afin de ne pas commander un article indisponible.

# ÉPIC 2 — Services & demande de devis — *Charles (UI) / Xavier (API)*

- **US-06** En tant que **visiteur**, je veux consulter la page « Nos services » (4 services sans prix), afin de découvrir l'offre d'accompagnement.
- **US-07** En tant que **visiteur**, je veux soumettre une demande de devis depuis chaque service, afin d'être recontacté.
- **US-08** En tant qu'**admin**, je veux créer/modifier/supprimer les services affichés, afin de mettre à jour le contenu sans code.
  - *Critères* : l'ajout d'un service le fait apparaître sur le site public.

# ÉPIC 3 — Panier — *Charles (UI) / Xavier (API)*

- **US-09** En tant que **client**, je veux ajouter un produit au panier, afin de préparer ma commande.
  - *Critères* : ajout avec quantité ; panier conservé après reconnexion et fonctionnel en mode invité.
- **US-10** En tant que **client**, je veux modifier les quantités du panier, afin d'ajuster ma commande.
- **US-11** En tant que **client**, je veux supprimer un article du panier, afin de corriger ma commande.
- **US-12** En tant que **client**, je veux voir le récapitulatif du panier (sous-total, frais, total), afin de valider avant de payer.
  - *Critères* : recalcul automatique ; quantité limitée au stock.

# ÉPIC 4 — Compte client & authentification — *Xavier (API JWT) / Charles (UI)*

- **US-13** En tant que **visiteur**, je veux créer un compte (nom, téléphone, email, mot de passe), afin d'accéder à un espace personnel.
  - *Critères* : mot de passe haché ; validation email/téléphone ; email optionnel.
- **US-14** En tant que **client**, je veux me connecter avec JWT, afin d'accéder à mon espace.
  - *Critères* : session sécurisée, déconnexion possible.
- **US-15** En tant que **client**, je veux commander **en mode invité**, afin d'acheter sans créer de compte.
  - *Critères* : tunnel complet sans authentification, à partir du téléphone.
- **US-16** En tant que **client**, je veux gérer mon profil (adresse, infos), afin de faciliter mes achats futurs.

# ÉPIC 5 — Commande & tunnel d'achat — *Xavier (API) / Charles (UI)*

- **US-17** En tant que **client**, je veux passer par un tunnel de commande (récap → adresse → livraison → paiement → confirmation), afin de finaliser mon achat.
  - *Critères* : étapes ordonnées, navigation possible.
- **US-18** En tant que **client**, je veux choisir entre livraison à domicile et retrait sur place, afin de choisir mon mode de réception.
- **US-19** En tant que **client**, je veux renseigner mes infos de livraison (zone, adresse), afin que la commande soit livrée correctement.
- **US-20** En tant que **client**, je veux voir les frais de livraison calculés selon ma zone, afin de connaître le coût total.
- **US-21** En tant que **client**, je veux recevoir une confirmation de commande par email et/ou SMS après paiement, afin de garder une trace.

# ÉPIC 6 — Paiement en ligne (Kkiapay) — *Xavier (intégration serveur) / Charles (UI)*

- **US-22** En tant que **client**, je veux payer via MTN Money, afin de régler ma commande.
  - *Critères* : intégration Kkiapay côté serveur ; statut de transaction enregistré.
- **US-23** En tant que **client**, je veux payer via Moov Money, afin de régler ma commande.
- **US-24** En tant que **client**, je veux payer par carte bancaire (Visa/Mastercard), afin de régler ma commande.
  - *Critères* : passerelle PCI DSS ; mode sandbox en développement.
- **US-25** En tant que **client**, je veux être notifié si le paiement échoue, afin de pouvoir réessayer.
- **US-26** En tant qu'**admin**, je veux voir le statut des paiements (statut, référence transaction, rapprochement commande), afin de rapprocher les encaissements.

# ÉPIC 7 — Suivi de commande — *Xavier (API + notifications) / Charles (UI)*

- **US-27** En tant que **client**, je veux suivre ma commande via son statut, afin de savoir où elle en est.
  - *Critères* : en attente de paiement → payée → en préparation → expédiée/prête pour retrait → livrée/récupérée.
- **US-28** En tant que **client**, je veux voir l'historique de mes commandes dans mon espace, afin de retrouver mes achats.

# ÉPIC 8 — Contact & À propos — *Charles (UI) / Xavier (API)*

- **US-29** En tant que **visiteur**, je veux envoyer une demande de contact via un formulaire, afin d'être recontacté.
  - *Critères* : nom, téléphone, message (+ produit/service optionnel) ; notification à l'admin.
- **US-30** En tant que **visiteur**, je veux contacter l'entreprise via WhatsApp (lien direct) et voir la localisation, afin d'échanger en direct.
- **US-31** En tant que **visiteur**, je veux consulter la page « À propos », afin de connaître la crédibilité de l'entreprise.

---

# ÉPIC 9 — Socle technique & auth admin / tableau de bord — *Xavier (backend + admin API) / Charles (UI admin)*

- **US-S1** : Modéliser la BDD MySQL (10 tables selon cahier des charges) via SQLAlchemy. *(Xavier)*
- **US-S2** : Configurer FastAPI, CORS, Swagger, variables d'environnement, Docker. *(Xavier)*
- **US-32** En tant qu'**admin**, je veux me connecter avec email/mot de passe sécurisé (JWT), afin d'accéder au back-office.
  - *Critères* : accès réservé au rôle admin ; sessions protégées.
- **US-33** En tant qu'**admin**, je veux consulter un tableau de bord synthétique (commandes du jour, CA, produits les plus vendus), afin de piloter l'activité.
  - *Critères* : KPIs (ventes FCFA, commandes, clients, produits).

# ÉPIC 10 — Admin : gestion du catalogue — *Xavier (API) / Charles (UI admin)*

- **US-34** En tant qu'**admin**, je veux ajouter un produit avec photos, afin de l'exposer au catalogue.
  - *Critères* : nom, catégorie, description, prix, stock, disponibilité ; upload d'images (Cloudinary/S3).
- **US-35** En tant qu'**admin**, je veux modifier un produit, afin de mettre à jour prix/stock/infos.
- **US-36** En tant qu'**admin**, je veux supprimer/désactiver un produit, afin de retirer une offre.
- **US-37** En tant qu'**admin**, je veux gérer les catégories (création, renommage, suppression), afin de structurer le catalogue.
- **US-38** En tant qu'**admin**, je veux mettre à jour le stock et le statut de disponibilité (en stock, sur commande, vendu), afin de refléter la réalité.

# ÉPIC 11 — Admin : commandes & paiements — *Xavier (API) / Charles (UI admin)*

- **US-39** En tant qu'**admin**, je veux consulter la liste des commandes, afin de les traiter.
  - *Critères* : filtres par statut, recherche par client, historique par client.
- **US-40** En tant qu'**admin**, je veux changer le statut d'une commande, afin de suivre le processus (préparation, expédition, livraison).
  - *Critères* : le changement est visible côté client.
- **US-41** En tant qu'**admin**, je veux consulter le détail d'une commande (articles, adresse, paiement), afin de la traiter correctement.

# ÉPIC 12 — Admin : livraison & demandes — *Xavier (API) / Charles (UI admin)*

- **US-42** En tant qu'**admin**, je veux gérer les zones de livraison et leurs frais, afin de calculer automatiquement les frais clients.
- **US-43** En tant qu'**admin**, je veux consulter les demandes de contact reçues, afin d'y répondre.

# ÉPIC 13 — Transverse (non fonctionnel) — *Xavier & Charles*

- **US-44** En tant qu'**utilisateur**, je veux un site responsive mobile, afin de commander depuis un smartphone.
- **US-45** En tant qu'**utilisateur**, je veux des pages qui chargent en < 3 s en connexion mobile, afin d'avoir une bonne expérience.
- **US-46** En tant qu'**admin**, je veux une documentation API (Swagger) et un code versionné (Git), afin de maintenir le projet.
- **US-47** En tant qu'**admin**, je veux un guide d'utilisation du back-office, afin de former l'entreprise.

---

## Récapitulatif de la répartition

| Développeur | Rôle | Couverture |
|---|---|---|
| **Xavier** | **Backend / API + admin** (expert backend) | Toute l'API FastAPI : BDD, auth (client + admin), catalogue, services, panier, commandes, paiements Kkiapay, livraison/zones, demandes contact, notifications email/SMS, upload images, tableau de bord |
| **Charles** | **Frontend / intégration** | Toute l'UI Next.js : front-office (accueil, catalogue, fiche produit, panier, tunnel commande, paiement UI, suivi, compte, contact, à propos, services) + espace admin (tableau de bord, produits, catégories, commandes, paiements, livraison, demandes, services) |

## Points d'intégration (contrats d'API à figer ensemble)

1. **API catalogue** (US-S2) : Xavier expose `/produits`, `/categories`, `/produits/{id}` → Charles consomme.
2. **Auth JWT** (épique 4) : Xavier livre `/auth/register`, `/auth/login` (client) et `/admin/login` → Charles branche l'UI.
3. **Panier / commandes** (épiques 3 & 5) : contrat d'API (créer commande, calcul frais livraison par zone) à valider avant développement.
4. **Paiement** (épique 6) : Xavier intègre Kkiapay côté serveur (sandbox) et expose `/paiements`, webhook → Charles connecte l'UI de paiement.
5. **Suivi de commande** (épique 7) : Xavier renvoie les statuts via `/commandes/{id}/statut` ; les notifications email/SMS sont déclenchées côté serveur (Xavier), l'affichage client est fait par Charles.