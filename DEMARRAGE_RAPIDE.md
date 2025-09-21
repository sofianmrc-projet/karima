# 🚀 Démarrage Rapide - Karima

## ⚡ Démarrage en 2 étapes

### **1. Démarrer l'API (Terminal 1)**
```bash
cd api
dotnet run
```
**Résultat attendu :**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
      Now listening on: https://localhost:5001
```

### **2. Démarrer le Frontend (Terminal 2)**
```bash
cd web
npm run dev
```
**Résultat attendu :**
```
  VITE v5.0.0  ready in 500 ms
  ➜  Local:   http://localhost:5173/
```

## 🔍 Vérification rapide

### **Tester l'API :**
Ouvrir dans le navigateur : http://localhost:5000/api/Public/service-content

**Résultat attendu :** JSON avec le contenu des services

### **Tester le Frontend :**
Ouvrir dans le navigateur : http://localhost:5173

**Résultat attendu :** Site web Karima

### **Tester l'Admin :**
Ouvrir dans le navigateur : http://localhost:5173/account

**Identifiants :**
- Email : `admin@karima.com`
- Mot de passe : `admin123`

## 🐛 Problèmes courants

### **Erreur : "API non accessible"**
**Solution :**
1. Vérifier que l'API est démarrée
2. Vérifier le port 5000
3. Redémarrer l'API

### **Erreur : "Port déjà utilisé"**
**Solution :**
```bash
# Tuer les processus sur les ports
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F
```

### **Erreur : "Base de données"**
**Solution :**
```bash
cd api
dotnet ef database update
```

## 📋 Checklist de démarrage

- [ ] API démarrée sur le port 5000
- [ ] Frontend démarré sur le port 5173
- [ ] Base de données à jour
- [ ] API accessible via http://localhost:5000
- [ ] Site accessible via http://localhost:5173
- [ ] Admin accessible via http://localhost:5173/account

## 🎯 Test rapide de l'éditeur

1. **Aller** sur http://localhost:5173/account
2. **Se connecter** avec `admin@karima.com` / `admin123`
3. **Modifier** un texte dans l'éditeur visuel
4. **Sauvegarder** et voir le message de succès
5. **Vérifier** que la modification persiste

## ✅ Tout fonctionne !

Si vous voyez :
- ✅ L'API répond sur le port 5000
- ✅ Le site s'affiche sur le port 5173
- ✅ L'admin se connecte
- ✅ L'éditeur visuel sauvegarde

**Alors tout est prêt !** 🎉
