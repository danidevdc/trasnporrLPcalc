# 🚀 Guía de Despliegue con GitHub Pages

Esta guía te ayudará a desplegar tu Calculadora de Transporte Suzuki en GitHub Pages de forma gratuita.

## 📋 Requisitos Previos

- Una cuenta de GitHub
- El repositorio ya está creado (trasnporrLPcalc)
- Los archivos del proyecto están en el repositorio

## 🌐 Paso 1: Configurar GitHub Pages

### Opción A: Desde la Interfaz Web de GitHub

1. **Ve a tu repositorio en GitHub:**
   ```
   https://github.com/danidevdc/trasnporrLPcalc
   ```

2. **Accede a Settings (Configuración):**
   - Haz clic en la pestaña "Settings" en la parte superior del repositorio

3. **Encuentra la sección "Pages":**
   - En el menú lateral izquierdo, busca y haz clic en "Pages"

4. **Configura la fuente:**
   - En "Source" (Fuente), selecciona la rama que quieres usar (por ejemplo, `main` o `claude/responsive-maps-calculator-...`)
   - Deja la carpeta en `/ (root)` ya que tus archivos están en la raíz
   - Haz clic en "Save" (Guardar)

5. **Espera el despliegue:**
   - GitHub Pages tardará 1-2 minutos en construir tu sitio
   - Verás un mensaje: "Your site is ready to be published at..."

6. **Accede a tu sitio:**
   ```
   https://danidevdc.github.io/trasnporrLPcalc/
   ```

### Opción B: Usando GitHub CLI (gh)

Si tienes GitHub CLI instalado:

```bash
# Habilitar GitHub Pages
gh repo deploy

# O configurar manualmente
gh api repos/danidevdc/trasnporrLPcalc/pages \
  --method POST \
  -f source[branch]=main \
  -f source[path]=/
```

## 🔑 Paso 2: Configurar Google Maps API

Para que el mapa funcione en tu sitio desplegado:

1. **Obtén una API Key de Google Maps:**
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto nuevo
   - Habilita las siguientes APIs:
     - Maps JavaScript API
     - Directions API
     - Places API (opcional pero recomendado)

2. **Configura restricciones de la API Key:**
   - En Google Cloud Console, ve a "Credentials"
   - Edita tu API Key
   - En "Application restrictions", selecciona "HTTP referrers"
   - Agrega estos referrers:
     ```
     https://danidevdc.github.io/trasnporrLPcalc/*
     http://localhost:*
     ```

3. **Actualiza index.html:**
   - Edita el archivo `index.html` en GitHub (o localmente)
   - Busca la línea ~132:
     ```html
     <script async defer
         src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&libraries=places&callback=initMap">
     </script>
     ```
   - Reemplaza `TU_API_KEY_AQUI` con tu verdadera API Key
   - Commit y push los cambios

4. **Espera a que se actualice:**
   - GitHub Pages se actualizará automáticamente en 1-2 minutos

## ✅ Paso 3: Verificar el Despliegue

1. **Visita tu sitio:**
   ```
   https://danidevdc.github.io/trasnporrLPcalc/
   ```

2. **Verifica que funcione:**
   - ✅ La página se carga correctamente
   - ✅ Puedes seleccionar un vehículo Suzuki
   - ✅ El mapa se muestra (si configuraste la API Key)
   - ✅ Puedes calcular rutas
   - ✅ La opción de tráfico funciona

## 🔄 Actualizar tu Sitio

Cada vez que hagas cambios y los subas a GitHub:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
```

GitHub Pages se actualizará automáticamente en 1-2 minutos.

## 🎨 Personalizar el Dominio (Opcional)

Si tienes un dominio propio:

1. **Agrega un archivo CNAME:**
   ```bash
   echo "tudominio.com" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configura tu DNS:**
   - En tu proveedor de DNS, agrega estos registros:
   ```
   CNAME www danidevdc.github.io.
   A @ 185.199.108.153
   A @ 185.199.109.153
   A @ 185.199.110.153
   A @ 185.199.111.153
   ```

3. **En GitHub Settings > Pages:**
   - Ingresa tu dominio personalizado
   - Habilita "Enforce HTTPS"

## 🐛 Solución de Problemas

### El sitio no se actualiza
- Espera 2-5 minutos
- Limpia la caché del navegador (Ctrl+F5)
- Verifica que los cambios estén en la rama correcta

### El mapa no se muestra
- Verifica que la API Key esté correctamente configurada
- Revisa la consola del navegador (F12) para ver errores
- Asegúrate de que las APIs estén habilitadas en Google Cloud

### Error 404
- Verifica que los archivos estén en la raíz del repositorio
- Asegúrate de que el archivo se llame `index.html` (minúsculas)

## 📊 Monitorear el Tráfico

Puedes ver las estadísticas de tu sitio en:
- GitHub Insights > Traffic
- Google Analytics (si lo configuras)

## 💰 Costos

- **GitHub Pages:** GRATIS (para repositorios públicos)
- **Google Maps API:**
  - $200 USD de crédito mensual gratuito
  - ~28,000 cargas de mapa gratis al mes
  - Configura límites de uso para evitar cargos

## 🔒 Seguridad

- ⚠️ **NO** subas tu API Key al repositorio público
- Usa restricciones de dominio en Google Cloud Console
- Configura límites de cuota para tu API Key

## 📝 Resumen de URLs

- **Repositorio:** https://github.com/danidevdc/trasnporrLPcalc
- **Sitio Web:** https://danidevdc.github.io/trasnporrLPcalc/
- **Google Cloud:** https://console.cloud.google.com/

---

¡Tu calculadora estará disponible públicamente en minutos! 🎉
