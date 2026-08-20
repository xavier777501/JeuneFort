# 🌾 Jeune Fort Agrobusiness

**Plateforme e-commerce pour la vente de produits agricoles et services agricoles**

---

## 📊 État du projet

| Composant | Status | Notes |
|-----------|--------|-------|
| **Backend (FastAPI)** | ✅ **Opérationnel** | Serveur lance, endpoints de base fonctionnels |
| **Frontend (Next.js)** | ⚠️ **Bloqué** | `npm install` échoue à cause de la connexion réseau |
| **Base de données** | ❌ **Non configurée** | MySQL à installer et configurer |

---

## 🚀 Scripts disponibles

### 🔍 Diagnostic

| Script | Description | Utilisation |
|--------|-------------|-------------|
| `DIAGNOSE_RESEAU.bat` | Teste la connexion réseau et les téléchargements npm | Double-clic ou `.\DIAGNOSE_RESEAU.bat` |

### 🖥️ Backend (FastAPI)

| Script | Description | Utilisation |
|--------|-------------|-------------|
| `LANCER_BACKEND.bat` | Lance le serveur FastAPI rapidement | Double-clic ou `.\LANCER_BACKEND.bat` |
| `TEST_BACKEND.bat` | Test complet : venv + dépendances + serveur | Double-clic ou `.\TEST_BACKEND.bat` |

### 🌐 Frontend (Next.js)

| Script | Description | Utilisation |
|--------|-------------|-------------|
| `INSTALL_AVEC_JONCTION.bat` | Installe npm avec node_modules sur C: (rapide) | Double-clic ou `.\INSTALL_AVEC_JONCTION.bat` |
| `INSTALL_SANS_JONCTION.bat` | Installe npm directement sur la clé USB (lent) | Double-clic ou `.\INSTALL_SANS_JONCTION.bat` |
| `INSTALL_AVEC_MIROIR.bat` | Installe npm via un miroir alternatif | Double-clic ou `.\INSTALL_AVEC_MIROIR.bat` |

---

## 📁 Structure du projet

```
jeune-fort-agrobusiness/
├── backend/               # API FastAPI (Python 3.12)
│   ├── app/
│   │   ├── api/          # Routes API
│   │   ├── core/         # Configuration
│   │   ├── crud/         # Opérations base de données
│   │   ├── db/           # Configuration database
│   │   ├── models/       # Modèles SQLAlchemy
│   │   ├── schemas/      # Schémas Pydantic
│   │   └── main.py       # Point d'entrée FastAPI
│   ├── venv/             # Environnement virtuel Python
│   ├── .env              # Variables d'environnement
│   └── requirements.txt  # Dépendances Python
│
├── frontend/             # Application Next.js 15 (React 19)
│   ├── app/             # Pages Next.js App Router
│   │   ├── (front-office)/  # Pages publiques
│   │   └── admin/           # Espace administration
│   ├── components/      # Composants React
│   ├── lib/            # Utilitaires
│   ├── types/          # Types TypeScript
│   └── package.json    # Dépendances npm
│
└── docs/               # Documentation
    └── user-stories.md # User stories du projet
```

---

## 🛠️ Installation

### ✅ Backend (Prêt à l'emploi)

Le backend est **déjà configuré et fonctionnel** :

```cmd
LANCER_BACKEND.bat
```

Accessible sur :
- **API :** http://localhost:8000
- **Documentation :** http://localhost:8000/docs

👉 Voir `RAPPORT_BACKEND.md` pour plus de détails.

---

### ⚠️ Frontend (Nécessite réseau stable)

**IMPORTANT :** Avant d'installer le frontend, **vérifier la connexion réseau** :

#### Étape 1 : Diagnostic réseau

```cmd
DIAGNOSE_RESEAU.bat
```

**Ce qui doit réussir :**
- ✅ Latence < 200 ms
- ✅ 0% perte de paquets
- ✅ Téléchargement petit fichier OK
- ✅ Téléchargement gros fichier OK

**Si les tests échouent :**
1. Redémarrer votre box/routeur
2. Se connecter en Ethernet
3. Passer en Wi-Fi 5 GHz
4. Attendre un moment (réseau saturé)

#### Étape 2 : Installation

Une fois le réseau stable, choisir une méthode :

**Option A : Installation rapide (recommandée)**
```cmd
INSTALL_AVEC_JONCTION.bat
```
→ node_modules sur C: (disque rapide)

**Option B : Installation compatible (plus lente)**
```cmd
INSTALL_SANS_JONCTION.bat
```
→ node_modules sur la clé USB

**Option C : Via miroir alternatif**
```cmd
INSTALL_AVEC_MIROIR.bat
```
→ Si npmjs.org reste lent

#### Étape 3 : Lancement

```cmd
cd frontend
npm run dev
```

Accessible sur : http://localhost:3000

👉 Voir `README_INSTALLATION.md` pour plus de détails.

---

## 🐛 Problèmes connus

### ❌ Frontend : `npm install` échoue

**Symptômes :**
```
ERR_SSL_CIPHER_OPERATION_FAILED
Invalid response body while trying to fetch...
```

**Cause :** Connexion réseau instable (690 ms latence, 25% perte paquets)

**Solution :**
1. Lancer `DIAGNOSE_RESEAU.bat`
2. Améliorer la connexion (redémarrer box, Ethernet, 5 GHz)
3. Réessayer l'installation

👉 Voir `README_INSTALLATION.md` pour le guide complet.

---

### ⚠️ Base de données non configurée

**Symptôme :** Le backend démarre mais les endpoints qui utilisent la DB échouent.

**À faire :**
1. Installer MySQL Server
2. Créer la base de données `jeune_fort_agrobusiness`
3. Mettre à jour `DATABASE_URL` dans `backend/.env`
4. Créer les migrations avec Alembic

---

## 🔧 Configuration

### Backend (.env)

Fichier : `backend/.env`

```env
APP_NAME=Jeune Fort Agrobusiness API
APP_ENV=development
DEBUG=true
API_PORT=8000

DATABASE_URL=mysql+pymysql://user:password@localhost:3306/jeune_fort_agrobusiness
SECRET_KEY=dev-secret-key-DO-NOT-USE-IN-PRODUCTION-123456789

CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

⚠️ **Changer `SECRET_KEY` en production !**

### Frontend (.env)

Fichier : `frontend/.env.local` (à créer)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_ENV=development
```

---

## 📚 Documentation

| Fichier | Description |
|---------|-------------|
| `README.md` | Ce fichier - Vue d'ensemble du projet |
| `README_INSTALLATION.md` | Guide d'installation détaillé du frontend |
| `RAPPORT_BACKEND.md` | Rapport technique du backend |
| `docs/user-stories.md` | User stories et fonctionnalités |

---

## 🛑 Contexte technique

### Configuration système actuelle

- **OS :** Windows 10 (10.0.22000)
- **Stockage projet :** Clé USB (E:) → jonction → `C:\Projets`
- **Stockage node_modules :** `C:\DevFast\node_modules-jeune-fort` (optionnel)
- **Python :** 3.12.0
- **Node.js :** 22.15.0
- **npm :** 11.10.0

### Pourquoi cette configuration ?

Le projet est sur **clé USB** pour la portabilité, mais :
- La clé USB est **lente** pour l'écriture
- `node_modules` contient 100k+ petits fichiers
- Solution : jonction de `node_modules` vers le disque C: rapide

---

## 📞 Support

En cas de blocage, fournir :
1. Sortie de `DIAGNOSE_RESEAU.bat`
2. Logs npm : `%LOCALAPPDATA%\Temp\npm-cache\_logs\`
3. Logs backend : affichés dans le terminal
4. Quel script a été utilisé

---

## 🎯 Prochaines étapes recommandées

### Court terme (1-2 jours)
1. ✅ ~~Backend opérationnel~~
2. ⚠️ **Stabiliser la connexion réseau** (PRIORITÉ)
3. 🔄 Installer le frontend (`npm install`)
4. 🔄 Configurer MySQL

### Moyen terme (1 semaine)
5. Créer les modèles de base de données
6. Créer les routes API CRUD
7. Implémenter l'authentification JWT
8. Connecter frontend ↔ backend

### Long terme
9. Intégration Kkiapay (paiement)
10. Upload d'images (Cloudinary)
11. Système de notifications (email)
12. Tests et déploiement

---

## 📄 Licence

*(À définir)*

---

**Dernière mise à jour :** 20/08/2026
