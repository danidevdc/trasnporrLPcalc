# 🗺️ Guía de Configuración - Google Maps API

Esta guía te ayudará a obtener y configurar tu API Key de Google Maps para el Route Calculator.

## 📋 Requisitos

- Una cuenta de Gmail
- Tarjeta de crédito/débito (requerida, pero el uso básico es GRATIS)

---

## 🚀 Paso 1: Crear Proyecto en Google Cloud

1. Ve a: **https://console.cloud.google.com/**
2. Inicia sesión con tu Gmail
3. Click en **"Seleccionar proyecto"** → **"Nuevo proyecto"**
4. Nombre del proyecto: `Route Calculator Bolivia`
5. Click en **"Crear"**

---

## 🔌 Paso 2: Habilitar las APIs

Ve a: **"APIs y servicios" > "Biblioteca"**

Habilita estas 4 APIs (busca cada una y haz click en "Habilitar"):

### APIs Requeridas:

1. ✅ **Maps JavaScript API** - Para mostrar el mapa
2. ✅ **Directions API** - Para calcular rutas
3. ✅ **Elevation API** - Para análisis de pendientes (La Paz)
4. ✅ **Places API** - Para autocompletar direcciones (opcional)

---

## 🔑 Paso 3: Crear tu API Key

1. Ve a: **"APIs y servicios" > "Credenciales"**
2. Click en **"+ CREAR CREDENCIALES"**
3. Selecciona **"Clave de API"**
4. **¡COPIA tu API Key!** (ejemplo: `AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)

---

## 🔒 Paso 4: Configurar Restricciones (IMPORTANTE)

### Para Desarrollo Local:

1. Click en editar tu API Key
2. **Restricciones de la clave:** Selecciona "Ninguna" (temporal)
3. **Restricciones de API:** Selecciona "Restringir clave"
   - Marca: Maps JavaScript API
   - Marca: Directions API
   - Marca: Elevation API
   - Marca: Places API
4. Click en **"Guardar"**

### Para Producción (GitHub Pages):

1. **Restricciones de la clave:** Selecciona "Referentes HTTP"
2. Agrega estos referentes:
   ```
   http://localhost:*
   http://127.0.0.1:*
   https://tuusuario.github.io/*
   ```
3. **Restricciones de API:** (igual que arriba)
4. Click en **"Guardar"**

---

## 💳 Paso 5: Configurar Facturación

⚠️ **IMPORTANTE:** Es obligatorio, pero el uso básico es GRATIS

### Límites Gratuitos:
- **$200 USD gratis cada mes**
- Equivalente a ~28,000 cargas de mapa
- Para uso personal: prácticamente siempre gratis

### Cómo configurar:
1. Ve a **"Facturación"** en el menú
2. Click en **"Vincular cuenta de facturación"**
3. Click en **"Crear cuenta de facturación"**
4. Ingresa datos de tu tarjeta
5. Acepta términos y guarda

### Protección contra cargos:
1. Ve a **"Cuotas"**
2. Configura límites diarios para cada API
3. Activa alertas de uso
4. Opcional: Configura presupuesto máximo de $0

---

## ⚙️ Paso 6: Configurar en tu Código

### Opción A: Editar index.html directamente

Abre `index.html` y busca la línea 145:

**ANTES:**
```html
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=TU_API_KEY_AQUI&libraries=places&callback=initMap">
</script>
```

**DESPUÉS (reemplaza con tu API Key):**
```html
<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDe4RtY6HnMlP9WxYz1234567890abcde&libraries=places&callback=initMap">
</script>
```

### Opción B: Usar Variable de Entorno (más seguro)

Si usas un servidor, puedes crear un archivo `.env`:
```
GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

---

## ✅ Paso 7: Verificar que Funciona

1. Guarda el archivo `index.html`
2. Abre en tu navegador
3. Presiona **F12** para abrir la consola
4. Busca el mensaje: "Google Maps initialized successfully"
5. El mapa debería cargar correctamente

---

## 🐛 Solución de Problemas

### Error: "RefererNotAllowedMapError"
**Causa:** El dominio no está autorizado
**Solución:** Agrega `http://localhost:*` a restricciones de referentes

### Error: "ApiNotActivatedMapError"
**Causa:** Las APIs no están habilitadas
**Solución:** Ve al Paso 2 y habilita todas las APIs

### Error: "InvalidKeyMapError"
**Causa:** API Key incorrecta
**Solución:** Verifica que copiaste bien la clave

### Error: "RequestDeniedMapError"
**Causa:** Restricciones muy estrictas
**Solución:** Temporalmente usa "Ninguna" restricción para probar

### El mapa no se muestra
1. Abre la consola del navegador (F12)
2. Mira si hay errores en rojo
3. Verifica que la API Key esté bien pegada
4. Asegúrate de haber habilitado las 4 APIs

---

## 💰 Información de Costos

### Precios (después de los $200 gratis):

| API | Precio por 1,000 llamadas |
|-----|---------------------------|
| Maps JavaScript API | $7.00 |
| Directions API | $5.00 |
| Elevation API | $5.00 |
| Places API | $17.00 |

### Tu uso estimado mensual:
- **Uso personal:** $0 (dentro de los $200 gratis)
- **50 usuarios/día:** ~$5-10/mes (gratis con crédito)
- **500 usuarios/día:** ~$50-100/mes

### Cómo evitar cargos:
1. Configura **alertas** cuando llegues a $100
2. Configura **cuota máxima** en cada API
3. Habilita **caché** de resultados
4. Revisa el panel de uso mensualmente

---

## 🔐 Mejores Prácticas de Seguridad

✅ **SÍ hacer:**
- Configurar restricciones de dominio
- Limitar las APIs habilitadas
- Configurar alertas de uso
- Revisar logs regularmente
- Rotar la API Key cada 6 meses

❌ **NO hacer:**
- Compartir tu API Key públicamente
- Subirla a GitHub (usa .gitignore)
- Dejarla sin restricciones
- Ignorar alertas de uso anormal
- Usar la misma key para múltiples proyectos

---

## 📊 Monitorear el Uso

### Panel de Google Cloud:

1. Ve a **"APIs y servicios" > "Panel"**
2. Verás gráficas de uso de cada API
3. Revisa el **"Uso actual"** vs **"Cuota"**

### Configurar Alertas:

1. Ve a **"Facturación" > "Presupuestos y alertas"**
2. Click en **"Crear presupuesto"**
3. Configura alerta a $50, $100, $150
4. Recibirás email cuando llegues a esos límites

---

## 📞 Soporte

- **Documentación oficial:** https://developers.google.com/maps/documentation
- **Consola de Google Cloud:** https://console.cloud.google.com/
- **Precios:** https://cloud.google.com/maps-platform/pricing
- **Estado del servicio:** https://status.cloud.google.com/

---

## ✨ Resumen Rápido

1. ✅ Crear proyecto en Google Cloud
2. ✅ Habilitar 4 APIs (Maps, Directions, Elevation, Places)
3. ✅ Crear API Key
4. ✅ Configurar restricciones
5. ✅ Vincular tarjeta (uso básico gratis: $200/mes)
6. ✅ Pegar API Key en `index.html` línea 145
7. ✅ Probar en el navegador

**¡Listo! Tu calculadora ahora tiene mapas interactivos.** 🗺️✨
