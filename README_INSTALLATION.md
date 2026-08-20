# Guide d'installation - Jeune Fort Agrobusiness

## Problème actuel identifié

**Connexion réseau instable** : 691 ms latence moyenne, 25% perte de paquets
→ Cause des échecs `npm install` avec erreurs SSL cipher operation failed

---

## ÉTAPE 1 : Vérifier le réseau (OBLIGATOIRE)

### Lancer le diagnostic :
```cmd
DIAGNOSE_RESEAU.bat
```

**Ce script teste :**
- ✅ Latence vers npmjs.org (doit être < 200 ms)
- ✅ Perte de paquets (doit être 0%)
- ✅ Téléchargement petit fichier (24 Ko)
- ✅ Téléchargement gros fichier (9 Mo)

### Si les tests échouent :

1. **Redémarrer votre box/routeur** (débrancher 30 sec)
2. **Se rapprocher du routeur** ou passer en **Ethernet** si possible
3. **Passer en Wi-Fi 5 GHz** au lieu de 2.4 GHz (plus rapide, moins d'interférences)
4. **Vérifier votre forfait** : peut-être bridé/saturé ?
5. **Tester à un autre moment** : peut-être saturation réseau local

### Une fois le réseau OK, passer à l'étape 2

---

## ÉTAPE 2 : Choisir la méthode d'installation

### 🚀 **Méthode A : Avec jonction (RAPIDE, recommandée)**

`node_modules` sera sur `C:\DevFast` (disque rapide) mais le projet reste sur la clé.

```cmd
INSTALL_AVEC_JONCTION.bat
```

**Avantages :**
- ✅ Installation rapide (disque C: rapide)
- ✅ Compilation/build rapides
- ✅ Projet reste sur la clé USB portable

**Inconvénient :**
- ⚠️ npm peut parfois refuser les jonctions (rare)

---

### 🐢 **Méthode B : Sans jonction (LENT mais sûr)**

`node_modules` sera directement sur la clé USB avec le projet.

```cmd
INSTALL_SANS_JONCTION.bat
```

**Avantages :**
- ✅ 100% compatible
- ✅ Tout reste portable sur la clé

**Inconvénient :**
- ⚠️ Installation très lente (20-60 min)
- ⚠️ Build/compilation lents

---

### 🌐 **Méthode C : Avec miroir alternatif**

Utilise un miroir npm plus proche/rapide (npmmirror).

```cmd
INSTALL_AVEC_MIROIR.bat
```

**À tester si :**
- Le réseau est OK mais npmjs.org reste lent
- Vous êtes loin géographiquement des serveurs npm

---

## ÉTAPE 3 : Vérification après installation

### Frontend (Next.js)

```cmd
cd C:\Projets\jeune-fort-agrobusiness\frontend
npm run dev
```

Doit ouvrir http://localhost:3000

### Backend (FastAPI)

```cmd
cd C:\Projets\jeune-fort-agrobusiness\backend
py -3.12 -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Doit ouvrir http://localhost:8000

---

## Problèmes connus et solutions

### Erreur : "EPERM: operation not permitted, rmdir"

**Cause :** Antivirus/Windows Defender scanne `node_modules` pendant la suppression.

**Solution :**
1. Exclure temporairement les dossiers de l'analyse en temps réel :
   - `C:\DevFast\node_modules-jeune-fort`
   - `C:\Projets\jeune-fort-agrobusiness\frontend\node_modules`
2. Relancer l'installation

### Erreur : "ERR_SSL_CIPHER_OPERATION_FAILED"

**Cause :** Connexion réseau coupe pendant le téléchargement.

**Solution :**
1. Vérifier le réseau avec `DIAGNOSE_RESEAU.bat`
2. Améliorer la connexion (voir étape 1)
3. Réessayer quand le réseau est stable

### npm refuse la jonction "Removing non-directory node_modules"

**Cause :** npm détecte une jonction existante et la refuse.

**Solution :**
1. Supprimer manuellement la jonction :
   ```cmd
   fsutil reparsepoint delete frontend\node_modules
   rmdir frontend\node_modules
   ```
2. Utiliser la **Méthode B** (sans jonction) à la place

---

## Configuration actuelle

- **Projet :** `C:\Projets` → jonction → `E:\Dev` (clé USB NTFS 29 Go)
- **Cache npm :** `C:\Users\GENESYS\AppData\Local\Temp\npm-cache` (nettoyé automatiquement)
- **node_modules cible :** `C:\DevFast\node_modules-jeune-fort` (si méthode A)
- **Node.js :** v22.15.0
- **npm :** v11.10.0
- **Python :** 3.12

---

## Contact support

En cas de blocage, fournir :
1. Sortie de `DIAGNOSE_RESEAU.bat`
2. Logs npm : `%LOCALAPPDATA%\Temp\npm-cache\_logs\`
3. Méthode d'installation utilisée
