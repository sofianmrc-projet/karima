# Script pour redémarrer l'API Karima
Write-Host "🔄 Redémarrage de l'API Karima..." -ForegroundColor Green

# Arrêter les processus .NET existants
Write-Host "`n1. Arrêt des processus .NET..." -ForegroundColor Yellow
$dotnetProcesses = Get-Process -Name "dotnet" -ErrorAction SilentlyContinue
if ($dotnetProcesses) {
    $dotnetProcesses | ForEach-Object {
        Write-Host "Arrêt du processus PID: $($_.Id)" -ForegroundColor Cyan
        Stop-Process -Id $_.Id -Force -ErrorAction SilentlyContinue
    }
} else {
    Write-Host "Aucun processus .NET trouvé" -ForegroundColor Cyan
}

# Attendre un peu
Start-Sleep -Seconds 2

# Redémarrer l'API
Write-Host "`n2. Redémarrage de l'API..." -ForegroundColor Yellow
Set-Location "api"
Write-Host "Démarrage de l'API sur le port 5000..." -ForegroundColor Cyan
Start-Process -FilePath "dotnet" -ArgumentList "run" -WindowStyle Normal

# Attendre un peu pour que l'API démarre
Start-Sleep -Seconds 3

# Tester l'API
Write-Host "`n3. Test de l'API..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/Public/service-content" -Method GET
    Write-Host "✅ API redémarrée avec succès !" -ForegroundColor Green
    Write-Host "Contenu reçu: $($response.Count) éléments" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Erreur lors du test de l'API: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n✅ Redémarrage terminé !" -ForegroundColor Green
Write-Host "L'API devrait maintenant être accessible sur http://localhost:5000" -ForegroundColor Cyan
