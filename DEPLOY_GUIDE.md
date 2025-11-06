# 🚀 Guía de Deploy con GitHub Secrets

## 🎯 Solución: GitHub Secrets + GitHub Actions

**Deploy Keys NO son para esto.** Lo que necesitas son **GitHub Secrets**.

### ¿Qué son GitHub Secrets?

✅ Variables de entorno secretas
✅ Perfecto para API keys
✅ Se usan en GitHub Actions
✅ Nunca se exponen en el código

---

## 📝 Configuración en 3 Pasos

### Paso 1️⃣: Agregar el Secret

1. Ve a tu repo: **https://github.com/danidevdc/trasnporrLPcalc**
2. Click en **Settings** ⚙️
3. En el menú izquierdo: **Secrets and variables** → **Actions**
4. Click en **New repository secret** (botón verde)
5. Llena:
   - **Name**: `GOOGLE_MAPS_API_KEY` (exactamente así)
   - **Secret**: Tu API Key (ej: `AIzaSyDxxxxx...`)
6. Click **Add secret**

### Paso 2️⃣: Habilitar GitHub Actions para Pages

1. Mientras estás en **Settings**
2. Click en **Pages** (menú izquierdo)
3. En **Source**, selecciona: **GitHub Actions**
4. Click **Save**

### Paso 3️⃣: Push para Activar el Deploy

```bash
git push
```

¡Y ya! GitHub Actions:
- Toma tu Secret
- Crea config.js automáticamente
- Deploya a GitHub Pages
- Tu app funciona con la API Key

---

## 🔍 Verificar el Deploy

1. Ve a **Actions** (pestaña superior)
2. Verás "Deploy to GitHub Pages" ejecutándose
3. Espera 1-2 minutos
4. Ve a: **https://danidevdc.github.io/trasnporrLPcalc/**

---

## 📊 Comparación

### ❌ Deploy Keys (NO sirve para esto)
```
- Son claves SSH
- Para acceso git clone/pull
- NO almacenan variables
- NO sirven para API keys
```

### ✅ GitHub Secrets (LO QUE NECESITAS)
```
- Almacenan valores secretos
- Perfect para API keys
- Se inyectan en GitHub Actions
- Seguros y encriptados
```

---

## 🛠️ Cómo Funciona

```
1. Tu haces: git push
   ↓
2. GitHub Actions detecta el push
   ↓
3. Lee el Secret GOOGLE_MAPS_API_KEY
   ↓
4. Crea config.js con: 
   const CONFIG = { 
     GOOGLE_MAPS_API_KEY: 'tu-key-aqui' 
   };
   ↓
5. Deploya todo a GitHub Pages
   ↓
6. ✅ App funcionando con API Key
```

---

## 🐛 Problemas Comunes

### "Secret not found"
**Solución:** Verifica que el Secret se llame exactamente `GOOGLE_MAPS_API_KEY`

### "Workflow failed"
**Solución:** Ve a Actions y revisa los logs para ver el error específico

### "Map not loading"
**Solución:** Verifica que la API Key en el Secret sea correcta

---

## 🔒 Seguridad

✅ API Key nunca en el código
✅ Solo visible para ti en Settings
✅ GitHub Actions la censura en logs
✅ Puedes cambiarla cuando quieras

---

## 📸 Resumen Visual

```
GitHub Repo Settings
└── Secrets and variables
    └── Actions
        └── New repository secret
            ├── Name: GOOGLE_MAPS_API_KEY
            └── Secret: AIzaSyDxxxxx...
                         ↓
                    GitHub Actions
                         ↓
                   GitHub Pages
                         ↓
                  Tu app funcionando!
```

