@echo off
echo ======================================
echo Installation npm via MIROIR alternatif
echo Utilisation du miroir npmmirror (Chine, rapide)
echo ======================================
echo.

cd /d C:\Projets\jeune-fort-agrobusiness\frontend

echo Configuration du miroir...
npm config set registry https://registry.npmmirror.com
echo OK
echo.

echo Lancement de npm install...
npm install
set INSTALL_RESULT=%errorlevel%

echo.
echo Restauration du registre npm officiel...
npm config set registry https://registry.npmjs.org
echo.

if %INSTALL_RESULT% neq 0 (
    echo ERREUR lors de npm install
    pause
    exit /b 1
)

echo ======================================
echo SUCCES! Dependencies installees
echo ======================================
pause
