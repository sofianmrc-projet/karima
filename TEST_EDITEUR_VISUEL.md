# 🧪 Test de l'Éditeur Visuel - Karima

## ✅ Vérifications à faire

### **1. Démarrer les services**
```bash
# Terminal 1 - API
cd api
dotnet run

# Terminal 2 - Frontend  
cd web
npm run dev
```

### **2. Se connecter en admin**
- URL : http://localhost:5173/account
- Email : `admin@karima.com`
- Mot de passe : `admin123`

### **3. Vérifier l'affichage du contenu existant**

#### **✅ Ce qui doit s'afficher :**
- **Textes existants** : Le contenu actuel des services
- **Textes vides** : `[Nom de l'élément - Cliquez pour modifier]` en italique
- **Images existantes** : Aperçu de l'image avec "Image actuelle"
- **Images vides** : `📷 Aucune image sélectionnée`

#### **❌ Si ça ne fonctionne pas :**
- Vérifier que l'API est démarrée
- Ouvrir la console (F12) pour voir les erreurs
- Vérifier l'URL de l'API dans les logs

### **4. Tester la modification de texte**

#### **Étape 1 : Modifier un titre**
1. Aller dans **"⚙️ Services - Section Hero"**
2. Trouver **"Titre principal"**
3. Cliquer sur **"✏️ Modifier"**
4. Changer le texte : `"Nos Services Personnalisés"`
5. Cliquer sur **"Sauvegarder"**
6. **Vérifier** : Message "✅ Modification sauvegardée avec succès !"

#### **Étape 2 : Vérifier la sauvegarde**
1. **Fermer** la modal d'édition
2. **Voir** le nouveau texte affiché
3. **Rafraîchir** la page (F5)
4. **Vérifier** que le texte est toujours là

### **5. Tester la modification d'image**

#### **Étape 1 : Sélectionner une image**
1. Aller dans **"🏠 Accueil - Section Hero"**
2. Trouver **"Image de fond"**
3. Cliquer sur **"✏️ Modifier"**
4. Cliquer sur **"Sélectionner une image"**
5. **Choisir** une image depuis la liste
6. **Voir** l'image s'afficher

#### **Étape 2 : Sauvegarder l'image**
1. Cliquer sur **"Sauvegarder"**
2. **Vérifier** : Message de succès
3. **Fermer** la modal
4. **Voir** l'image affichée dans la section

### **6. Vérifier la persistance**

#### **Test de persistance :**
1. **Modifier** plusieurs éléments
2. **Sauvegarder** chaque modification
3. **Rafraîchir** la page (F5)
4. **Vérifier** que toutes les modifications sont conservées

## 🐛 Problèmes courants et solutions

### **Problème : "Le contenu existant ne s'affiche pas"**
**Cause :** API non démarrée ou erreur de connexion
**Solution :**
```bash
cd api
dotnet run
# Vérifier que l'API répond sur http://localhost:5000
```

### **Problème : "La sauvegarde ne fonctionne pas"**
**Cause :** Erreur API ou problème de connexion
**Solution :**
1. Vérifier que l'API est démarrée
2. Ouvrir la console (F12) pour voir les erreurs
3. Vérifier l'URL de l'API

### **Problème : "Je ne vois pas mes images"**
**Cause :** Aucune image uploadée
**Solution :**
1. D'abord uploader des images via l'ancien système
2. Puis utiliser l'éditeur visuel

### **Problème : "Les modifications ne se sauvegardent pas"**
**Cause :** Problème de base de données
**Solution :**
```bash
cd api
dotnet ef database update
```

## 📊 Checklist de test

### **Affichage du contenu :**
- [ ] Les textes existants s'affichent
- [ ] Les textes vides montrent le placeholder
- [ ] Les images existantes s'affichent
- [ ] Les images vides montrent le message

### **Modification de texte :**
- [ ] La modal d'édition s'ouvre
- [ ] Le texte existant est pré-rempli
- [ ] La modification se sauvegarde
- [ ] Le message de succès apparaît
- [ ] Le nouveau texte s'affiche

### **Modification d'image :**
- [ ] Le sélecteur d'images s'ouvre
- [ ] Les images de la médiathèque s'affichent
- [ ] La sélection d'image fonctionne
- [ ] L'image s'affiche après sélection
- [ ] La sauvegarde fonctionne

### **Persistance :**
- [ ] Les modifications persistent après rafraîchissement
- [ ] Les modifications sont visibles sur le site public
- [ ] Aucune perte de données

## 🎯 Résultat attendu

Après ces tests, vous devriez avoir :
- **Un éditeur visuel** entièrement fonctionnel
- **Un affichage** du contenu existant
- **Une sauvegarde** qui fonctionne
- **Une persistance** des modifications
- **Une interface** intuitive et claire

**Si tous les tests passent, l'éditeur visuel est prêt à l'utilisation !** 🎉
