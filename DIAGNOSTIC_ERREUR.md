# 🔍 Diagnostic de l'erreur "Erreur lors du chargement du contenu"

## 🚨 Problème identifié
L'erreur "Erreur lors du chargement du contenu" indique que le frontend ne peut pas récupérer les données depuis l'API.

## ✅ Solutions étape par étape

### 1. **Vérifier que l'API est démarrée**
```bash
cd api
dotnet run
```
**Résultat attendu :** Vous devriez voir :
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
```

### 2. **Vérifier que la base de données est à jour**
```bash
cd api
dotnet ef database update
```

### 3. **Tester l'API directement**
Ouvrez votre navigateur et allez sur :
- **Swagger :** http://localhost:5000/swagger
- **API Service Content :** http://localhost:5000/api/Public/service-content

### 4. **Vérifier que le frontend est démarré**
```bash
cd web
npm run dev
```
**Résultat attendu :** Vous devriez voir :
```
  VITE v5.0.0  ready in 500 ms
  ➜  Local:   http://localhost:5173/
```

### 5. **Tester le frontend**
Allez sur http://localhost:5173/services

## 🔧 Scripts de diagnostic

### Test de l'API
```powershell
powershell -ExecutionPolicy Bypass -File test-api.ps1
```

### Test du frontend
```powershell
powershell -ExecutionPolicy Bypass -File test-frontend.ps1
```

## 🐛 Erreurs courantes et solutions

### Erreur : "Failed to fetch"
- **Cause :** L'API n'est pas démarrée
- **Solution :** Démarrer l'API avec `cd api && dotnet run`

### Erreur : "404 Not Found"
- **Cause :** Mauvaise URL de l'endpoint
- **Solution :** Vérifier que l'URL est `/api/Public/service-content` (avec tiret)

### Erreur : "500 Internal Server Error"
- **Cause :** Problème de base de données
- **Solution :** Exécuter `dotnet ef database update`

### Erreur : "CORS"
- **Cause :** Problème de configuration CORS
- **Solution :** Vérifier que CORS est configuré pour `http://localhost:5173`

## 📋 Checklist de vérification

- [ ] API démarrée sur le port 5000
- [ ] Base de données à jour
- [ ] Frontend démarré sur le port 5173
- [ ] Endpoint `/api/Public/service-content` accessible
- [ ] CORS configuré correctement
- [ ] Proxy Vite configuré

## 🚀 Test final

1. Démarrer l'API : `cd api && dotnet run`
2. Démarrer le frontend : `cd web && npm run dev`
3. Aller sur http://localhost:5173/services
4. Vérifier que le contenu se charge sans erreur

Si le problème persiste, vérifiez les logs de la console du navigateur (F12) pour plus de détails.
