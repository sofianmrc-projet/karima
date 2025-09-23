# Script pour démarrer les serveurs sur Windows PowerShell

Write-Host "🚀 Démarrage des serveurs Karima..." -ForegroundColor Green

# Démarrer l'API en arrière-plan
Write-Host "📡 Démarrage de l'API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd api; dotnet run" -WindowStyle Minimized

# Attendre un peu que l'API démarre
Start-Sleep -Seconds 3

# Démarrer le frontend
Write-Host "🌐 Démarrage du frontend..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-Command", "cd web; npm run dev" -WindowStyle Minimized

Write-Host "✅ Serveurs démarrés !" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "📡 API: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🎛️ Admin: http://localhost:5173/account" -ForegroundColor Magenta

Write-Host "`nAppuyez sur une touche pour continuer..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
