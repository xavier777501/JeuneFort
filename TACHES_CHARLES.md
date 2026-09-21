# 📋 Tâches Frontend — Charles

**De :** Xavier (backend) — **Pour :** Charles (frontend)
**Date :** 21/09/2026 — le backend est prêt, à toi de brancher l'UI.

> Le frontend affiche encore des **données mockées** (`lib/mock-data.ts`).
> L'API réelle est en ligne et testée (19 tests verts). Ton travail : remplacer les mocks par des appels API.
> **Ne touche pas au backend** — si un endpoint manque ou bug, signale-le moi.

---

## 0. Base

- **API :** `http://localhost:8000` — **Swagger :** `http://localhost:8000/docs` (référence exacte des contrats)
- Crée `frontend/.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENV=development
```
- Backend à lancer : `cd backend` puis `venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000` (MySQL WAMP doit tourner)

---

## 1. Client API partagé (à faire EN PREMIER)

Crée `frontend/lib/api.ts` :
- `fetch` vers `${NEXT_PUBLIC_API_URL}/api/v1/...`, JSON partout
- Token JWT : stocké en `localStorage` (`jf_token`), envoyé en `Authorization: Bearer ...`
- Helpers : `api.get(path)`, `api.post(path, body)`, avec et sans token

## 2. Catalogue : remplacer les mocks (priorité haute)

| Page actuelle | Action |
|---|---|
| `/produits` | `GET /api/v1/products?category=&q=&status=&min_price=&max_price=&featured=&page=&size=` → réponse `{total, page, size, items}` ; garde tes filtres UI, ils correspondent aux query params |
| `/produits/[id]` | `GET /api/v1/products/{slug}` (slug **ou** id accepté) → `{name, price, unit, status, stock_quantity, images[], short_description, full_description, specifications[], rating, category_slug, category_name}` ; `status` = `EN_STOCK \| SUR_COMMANDE \| INDISPONIBLE` (mêmes valeurs que tes types) |
| accueil (vedettes) | même endpoint avec `featured=true` |
| catégories | `GET /api/v1/categories` → `{id, name, slug, description, image_url, product_count}` ; slugs = `poussins, intrants-sante, equipements, animaux-reformes, oeufs, provende` (identiques à tes mocks) |
| `/services` | `GET /api/v1/services` et `GET /api/v1/services/{slug}` |

⚠️ Les **22 produits + 4 services en BDD sont les mêmes que tes mocks** (mêmes noms, prix, slugs) → le remplacement est direct. Garde `mock-data.ts` en fallback si l'API ne répond pas.

## 3. Compte + auth (priorité haute)

- Inscription : `POST /api/v1/auth/register` `{nom, telephone, email?, password, adresse?, ville?}` → `201` + `{access_token, user}` → stocke le token
- Connexion : `POST /api/v1/auth/login` `{identifiant, password}` (`identifiant` = téléphone **ou** email)
- Page `/compte` : `GET /api/v1/auth/me` (Bearer) + `PATCH /api/v1/auth/me` pour modif profil
- Erreurs : `409` téléphone/email pris, `401` mauvais identifiants → affiche les messages

## 4. Panier + tunnel de commande (priorité haute)

1. **Panier** : crée un `CartContext` (produit + quantité), persisté en `localStorage` → rend `/panier` réel (quantités modifiables, sous-total recalculé, quantité ≤ stock)
2. **Zones** : `GET /api/v1/delivery-zones` → affiche les choix (Porto-Novo 1000 FCFA, Cotonou 1500, Retrait 0) + calcule le total côté client
3. **Commander** : `POST /api/v1/orders` (SANS compte = invité OK) :
```json
{
  "items": [{"slug": "oeufs-table-frais-plateau-30", "quantity": 5}],
  "guest_name": "...", "guest_phone": "0198... (requis si invité)",
  "delivery_mode": "domicile | retrait",
  "zone_id": 1, "delivery_address": "... (requis si domicile)"
}
```
→ `201` + `{reference: "JFA-2026-XXXXXX", subtotal, delivery_fee, total, status}` → page confirmation avec la référence
4. Erreurs à gérer : `422` stock insuffisant / adresse manquante / téléphone invité manquant → messages clairs

## 5. Suivi + historique (priorité moyenne)

- Suivi public : `GET /api/v1/orders/{reference}` → timeline du statut (`en_attente_paiement → payée → en_preparation → expédiée/prete → livrée/récupérée`)
- Espace client : `GET /api/v1/orders/me` (Bearer) → historique

## 6. Contact + devis (priorité moyenne)

- `/contact` : branche le formulaire sur `POST /api/v1/contact` `{nom, telephone, email?, sujet?, message}` → remplace le succès factice actuel par la vraie réponse `201`
- Devis par service : `POST /api/v1/devis` + `"service_slug": "<slug>"` (ex : `gestion-complete-fermes`)

## 7. Admin (après le reste)

- Connexion : `POST /api/v1/admin/login` (compte test : `0190000001 / admin123`)
- Pages à brancher : `GET /api/v1/admin/orders?status=&q=` + `PATCH /api/v1/admin/orders/{id}/status`, `GET /api/v1/admin/requests`, CRUD `POST/PATCH/DELETE /api/v1/admin/products`, `PATCH .../stock`, `POST/PATCH /api/v1/admin/categories|services`

---

## ⛔ Ne fais PAS encore

- **UI paiement** (boutons MTN/Moov/CB) : j'intègre Kkiapay côté backend d'abord, je te donnerai le contrat ensuite
- **Upload d'images admin** : en attendant, colle des URLs dans le champ `images[]`

## ✅ Définition de done par tâche

- [ ] Données réelles affichées (plus de mocks sur la page)
- [ ] États chargement / erreur / vide gérés
- [ ] Testé contre l'API locale (pas seulement les mocks)
- [ ] Commit + push sur ta branche

**Question / blocage ?** Ouvre une issue ou message-moi avec : page concernée + endpoint + code d'erreur + capture Swagger.
