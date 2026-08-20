@echo off
echo ======================================
echo TEST CONNEXION RESEAU - npm install
echo ======================================
echo.

echo [1/5] Ping vers npmjs.org...
ping -n 4 registry.npmjs.org
echo.

echo [2/5] Ping vers Google DNS...
ping -n 4 8.8.8.8
echo.

echo [3/5] Test telechargement petit fichier...
powershell -Command "Invoke-WebRequest -Uri 'https://registry.npmjs.org/react/-/react-19.0.0.tgz' -OutFile '%TEMP%\test-react.tgz' -UseBasicParsing; if ($?) { Write-Host 'OK - Fichier telecharge' -ForegroundColor Green } else { Write-Host 'ECHEC' -ForegroundColor Red }"
echo.

echo [4/5] Test telechargement gros fichier...
powershell -Command "Invoke-WebRequest -Uri 'https://registry.npmjs.org/typescript/-/typescript-5.9.3.tgz' -OutFile '%TEMP%\test-typescript.tgz' -UseBasicParsing; if ($?) { Write-Host 'OK - Fichier telecharge' -ForegroundColor Green } else { Write-Host 'ECHEC' -ForegroundColor Red }"
echo.

echo [5/5] Verification des fichiers telecharges...
dir %TEMP%\test-*.tgz
echo.

echo ======================================
echo Si tous les tests passent, vous pouvez lancer npm install
echo Sinon, redemarrez votre box/routeur et testez en Ethernet si possible
echo ======================================
pause
