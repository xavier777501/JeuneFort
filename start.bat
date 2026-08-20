@echo off
REM ============================================
REM Jeune Fort Agrobusiness - Lancement du projet
REM Backend FastAPI + Frontend Next.js
REM ============================================
setlocal
REM Chemin reel: convertit la jonction C:\Projets vers E:\Dev uniquement si elle existe
set REALDIR=%~dp0
set CONVERTED=%REALDIR:C:\Projets=E:\Dev%
if exist "%CONVERTED%" set REALDIR=%CONVERTED%
cd /d "%REALDIR%"

REM ---------- 1. Configuration ----------
set BACKEND_DIR=backend
set FRONTEND_DIR=frontend
set BACKEND_PORT=8000
set FRONTEND_PORT=3000
set PYTHON_CMD=py -3.12

echo.
echo ============================================
echo   JEUNE FORT AGROBUSINESS - DEMARRAGE
echo ============================================
echo.

REM ---------- 2. Verification Backend ----------
echo [1/4] Verification du backend...
if not exist "%BACKEND_DIR%\venv\Scripts\python.exe" (
    echo ERREUR: Environnement virtuel Python non trouve
    echo Veuillez d'abord executer TEST_BACKEND.bat
    pause
    exit /b 1
)

if not exist "%BACKEND_DIR%\.env" (
    echo ERREUR: Fichier .env manquant dans le backend
    echo Veuillez copier .env.example vers .env
    pause
    exit /b 1
)

echo Backend OK
echo.

REM ---------- 3. Verification Frontend ----------
echo [2/4] Verification du frontend...
if not exist "%FRONTEND_DIR%\node_modules" (
    echo ERREUR: node_modules manquant dans le frontend
    echo Veuillez d'abord executer:
    echo   - INSTALL_AVEC_JONCTION.bat
    echo   - ou INSTALL_SANS_JONCTION.bat
    pause
    exit /b 1
)

REM Verification du paquet SWC critique
if not exist "%FRONTEND_DIR%\node_modules\@next\swc-win32-x64-msvc" (
    echo ATTENTION: Paquet Next.js SWC manquant
    echo Le frontend ne pourra pas demarrer sans ce paquet
    echo.
    echo Voulez-vous l'installer maintenant? (O/N)
    set /p INSTALL_SWC=
    if /i "%INSTALL_SWC%"=="O" (
        echo Installation en cours...
        cd "%FRONTEND_DIR%"
        call npm install @next/swc-win32-x64-msvc
        if errorlevel 1 (
            echo ERREUR: Installation SWC echouee
            cd ..
            pause
            exit /b 1
        )
        cd ..
        echo SWC installe avec succes
    ) else (
        echo Lancement annule
        echo Executez REPARER_FRONTEND.bat pour installer le paquet manquant
        pause
        exit /b 1
    )
)

echo Frontend OK
echo.

REM ---------- 4. Lancement ----------
echo [3/4] Preparation du lancement...
echo.
echo Backend  : http://localhost:%BACKEND_PORT%
echo           Documentation: http://localhost:%BACKEND_PORT%/docs
echo.
echo Frontend : http://localhost:%FRONTEND_PORT%
echo.
echo [4/4] Demarrage des serveurs...
echo Deux fenetres vont s'ouvrir (Backend et Frontend)
echo Pour arreter : fermez les fenetres ou appuyez sur CTRL+C
echo.
pause

REM Lancement Backend
start "Jeune Fort - Backend API" cmd /k "cd /d %REALDIR%%BACKEND_DIR% && venv\Scripts\python.exe -m uvicorn app.main:app --reload --host 0.0.0.0 --port %BACKEND_PORT%"

REM Attendre 3 secondes avant de lancer le frontend
timeout /t 3 /nobreak >nul

REM Lancement Frontend
start "Jeune Fort - Frontend Web" cmd /k "cd /d %REALDIR%%FRONTEND_DIR% && echo Frontend demarre sur http://localhost:%FRONTEND_PORT% && echo. && npm run dev"

echo.
echo ============================================
echo SERVEURS LANCES
echo ============================================
echo.
echo Les deux fenetres sont maintenant ouvertes.
echo Attendez quelques secondes que les serveurs demarrent.
echo.
echo Puis ouvrez votre navigateur:
echo   http://localhost:3000  (Frontend)
echo   http://localhost:8000  (Backend API)
echo.

endlocal
