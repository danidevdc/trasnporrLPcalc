# 🔒 Configuración Segura de API Keys

## ⚠️ IMPORTANTE: No Commitear API Keys

Este proyecto usa Google Maps API, que requiere una API Key. **NUNCA** commitees tu API Key directamente en el código.

## 📝 Configuración Paso a Paso

### 1. Crear tu archivo de configuración

```bash
# Copia el archivo de ejemplo
cp config.example.js config.js
```

### 2. Obtener Google Maps API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un proyecto nuevo o selecciona uno existente
3. Habilita las siguientes APIs:
   - **Maps JavaScript API**
   - **Directions API**
   - **Geocoding API**
   - **Places API**
4. Ve a **Credentials** → **Create Credentials** → **API Key**
5. **¡IMPORTANTE!** Agrega restricciones:
   - **Application restrictions**: HTTP referrers
   - **Website restrictions**: Agrega tu dominio (ej: `*.github.io/*` para GitHub Pages)
6. **¡MUY IMPORTANTE!** Configura facturación:
   - Ve a **Billing** en Google Cloud Console
   - Agrega una tarjeta de crédito
   - Google te da **$200 USD gratis al mes**

### 3. Configurar la API Key

Abre `config.js` y reemplaza `YOUR_API_KEY_HERE` con tu API Key real:

```javascript
const CONFIG = {
    GOOGLE_MAPS_API_KEY: 'AIzaSy...'  // Tu API Key aquí
};
```

### 4. Verificar que funciona

1. Abre `index.html` en tu navegador
2. Deberías ver el mapa cargando
3. Si ves un error, verifica la consola del navegador

## 🚫 Qué NO hacer

❌ **NO** commitees `config.js` a Git
❌ **NO** compartas tu API Key públicamente
❌ **NO** incluyas la API Key en capturas de pantalla
❌ **NO** la pongas en issues o pull requests públicos

## ✅ Qué SÍ hacer

✅ **SÍ** usa `config.js` (está en .gitignore)
✅ **SÍ** configura restricciones de dominio en Google Cloud
✅ **SÍ** revisa el uso mensual en Google Cloud Console
✅ **SÍ** regenera la API Key si la expones accidentalmente

## 🔄 Si expusiste tu API Key

Si accidentalmente commiteaste tu API Key:

1. **Inmediatamente** ve a Google Cloud Console
2. **Credentials** → Encuentra tu API Key → **Delete**
3. Crea una **nueva** API Key
4. Actualiza `config.js` con la nueva key
5. **Limpia el historial de Git** (opcional pero recomendado):

```bash
# Opción 1: Eliminar archivo del historio (avanzado)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config.js" \
  --prune-empty --tag-name-filter cat -- --all

# Opción 2: Más simple - forzar push después de eliminar
git rm --cached config.js
git commit -m "Remove API key from repository"
git push --force
```

## 📚 Recursos Adicionales

- [Google Maps Platform Security Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Google Cloud API Keys Best Practices](https://cloud.google.com/docs/authentication/api-keys)

## 💡 Para GitHub Pages

Si usas GitHub Pages, recuerda:

1. La API Key será visible en el código del navegador (es inevitable para apps frontend)
2. Por eso es **CRÍTICO** configurar restricciones de dominio
3. Limita la API Key solo a tu dominio de GitHub Pages
4. Monitorea el uso mensual en Google Cloud Console

## ❓ Preguntas Frecuentes

**P: ¿Por qué necesito una tarjeta para algo gratis?**
R: Google requiere facturación activa para evitar abuso, pero te da $200 gratis/mes. No te cobrará nada si no excedes ese límite.

**P: ¿Qué pasa si alguien ve mi API Key en el navegador?**
R: Por eso configuramos restricciones de dominio. Solo tu dominio podrá usar la key.

**P: ¿Cuánto cuesta normalmente?**
R: Para uso personal típico, casi nunca excedes los $200 gratis. Solo apps con mucho tráfico pagan.
