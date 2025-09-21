# Script de diagnostic pour l'API Karima
Write-Host "🔍 Diagnostic de l'API Karima..." -ForegroundColor Green

# Vérifier si l'API répond
Write-Host "`n1. Test de l'API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/Public/service-content" -Method GET
    Write-Host "✅ API accessible sur le port 5000" -ForegroundColor Green
    Write-Host "Contenu reçu: $($response.Count) éléments" -ForegroundColor Cyan
} catch {
    Write-Host "❌ API non accessible sur le port 5000" -ForegroundColor Red
    Write-Host "Erreur: $($_.Exception.Message)" -ForegroundColor Red
}

# Vérifier si l'API répond sur le port 5001 (HTTPS)
Write-Host "`n2. Test de l'API HTTPS..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "https://localhost:5001/api/Public/service-content" -Method GET -SkipCertificateCheck
    Write-Host "✅ API accessible sur le port 5001 (HTTPS)" -ForegroundColor Green
} catch {
    Write-Host "❌ API non accessible sur le port 5001" -ForegroundColor Red
}

# Vérifier les processus .NET
Write-Host "`n3. Processus .NET en cours..." -ForegroundColor Yellow
$dotnetProcesses = Get-Process -Name "dotnet" -ErrorAction SilentlyContinue
if ($dotnetProcesses) {
    Write-Host "✅ Processus .NET trouvés:" -ForegroundColor Green
    $dotnetProcesses | ForEach-Object { Write-Host "  - PID: $($_.Id), Nom: $($_.ProcessName)" -ForegroundColor Cyan }
} else {
    Write-Host "❌ Aucun processus .NET trouvé" -ForegroundColor Red
}

# Vérifier les ports utilisés
Write-Host "`n4. Ports utilisés..." -ForegroundColor Yellow
$ports = @(5000, 5001, 5173)
foreach ($port in $ports) {
    $connection = Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue
    if ($connection) {
        Write-Host "✅ Port $port utilisé par PID $($connection.OwningProcess)" -ForegroundColor Green
    } else {
        Write-Host "❌ Port $port libre" -ForegroundColor Red
    }
}

# Instructions de démarrage
Write-Host "`n5. Instructions de démarrage..." -ForegroundColor Yellow
Write-Host "Pour démarrer l'API:" -ForegroundColor Cyan
Write-Host "  cd api" -ForegroundColor White
Write-Host "  dotnet run" -ForegroundColor White
Write-Host "`nPour démarrer le frontend:" -ForegroundColor Cyan
Write-Host "  cd web" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White

Write-Host "`n✅ Diagnostic terminé!" -ForegroundColor Green
