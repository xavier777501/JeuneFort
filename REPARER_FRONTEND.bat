@echo off
echo ======================================
echo REPARATION FRONTEND - Installation SWC manquant
echo ======================================
echo.

cd /d C:\Projets\jeune-fort-agrobusiness\frontend

echo [1/3] Verification du paquet SWC...
if not exist "node_modules\@next\swc-win32-x64-msvc" (
    echo Le paquet SWC manque - installation en cours...
    echo.
    echo [2/3] Installation de @next/swc-win32-x64-msvc...
    echo Cela peut prendre 2-5 minutes selon votre connexion...
    npm install @next/swc-win32-x64-msvc@15.0.3
    if errorlevel 1 (
        echo.
        echo ERREUR: Echec de l'installation du paquet SWC
        echo Veuillez verifier votre connexion reseau
        pause
        exit /b 1
    )
) else (
    echo Le paquet SWC est present
)

echo.
echo [3/3] Verification complete de node_modules...
npm install
if errorlevel 1 (
    echo ERREUR: Echec de npm install
    pause
    exit /b 1
)

echo.
echo ======================================
echo SUCCES! Frontend repare
echo ======================================
echo.
echo Vous pouvez maintenant lancer:
echo   - start.bat (lance backend + frontend)
echo   - ou: cd frontend puis npm run dev
echo.
pause
