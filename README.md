# 🚗 Calculadora de Costo de Transporte - Suzuki Bolivia

Una aplicación web responsive para calcular el costo de viajes en vehículos Suzuki en Bolivia, integrando Google Maps y datos actualizados de consumo de combustible.

## 📋 Características

- ✅ **13 Modelos Suzuki** disponibles de IMCRUZ Bolivia
- ✅ **Integración con Google Maps** para planificación de rutas
- ✅ **🚦 Tráfico en tiempo real** - Calcula rutas considerando el tráfico actual
- ✅ **⛰️ Análisis de Pendientes** - Ajusta consumo según elevación de La Paz
- ✅ **Múltiples opciones de ruta** con comparación de costos
- ✅ **Precios actualizados** de gasolina en Bolivia (2025)
- ✅ **Diseño 100% responsive** (móvil, tablet, desktop)
- ✅ **Modo fallback manual** si Google Maps no está disponible
- ✅ **Cálculos precisos** basados en consumo real
- ✅ **Despliegue gratuito** con GitHub Pages

## 🚀 Cómo Usar

### 1. Configurar Google Maps API (Opcional pero recomendado)

Para usar el mapa interactivo:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita las siguientes APIs:
   - Maps JavaScript API
   - Directions API
   - Places API
   - Elevation API (para análisis de pendientes)
4. Crea una API Key
5. En `index.html`, reemplaza `TU_API_KEY_AQUI` con tu API Key:
   ```html
   <script async defer
       src="https://maps.googleapis.com/maps/api/js?key=TU_VERDADERA_API_KEY&libraries=places&callback=initMap">
   </script>
   ```

**Nota:** La app funciona sin API Key usando entrada manual de distancia.

### 2. Abrir la Aplicación

Simplemente abre `index.html` en tu navegador web. No requiere servidor.

### 3. Usar la Calculadora

1. **Selecciona tu vehículo Suzuki** del menú desplegable
2. **Elige el tipo de gasolina** (o ingresa precio personalizado)
3. **Define tu ruta:**
   - Ingresa punto de partida (ej: "Plaza Murillo, La Paz" o "Santa Cruz, Bolivia")
   - Ingresa punto de destino (ej: "Zona Sur, La Paz" o "Cochabamba, Bolivia")
   - ✅ **Activa "Considerar tráfico en tiempo real"** para rutas urbanas en La Paz y otras ciudades
4. **Haz clic en "Calcular Ruta y Costo"**
5. **Revisa los resultados** con múltiples opciones de ruta ordenadas por costo

### 4. 🚦 Tráfico en Tiempo Real

La app incluye soporte para **tráfico en tiempo real** usando Google Maps:

- **Activar:** Marca el checkbox "🚦 Considerar tráfico en tiempo real"
- **Funciona en:** La Paz, Santa Cruz, Cochabamba y otras ciudades con datos de tráfico
- **Beneficios:**
  - Duración estimada más precisa según condiciones actuales
  - Rutas alternativas para evitar congestión
  - Visualización de tráfico en el mapa (verde/amarillo/rojo)
- **Ideal para:** Rutas urbanas, hora pico, planificación de viajes en la ciudad

### 5. ⛰️ Análisis de Pendientes y Elevación

**¡NUEVA CARACTERÍSTICA!** La app ahora considera las **pendientes de La Paz** para calcular el consumo real:

#### ¿Por qué es importante?

La Paz es una ciudad muy montañosa con grandes diferencias de elevación:
- **Centro (Plaza Murillo):** ~3,640 m
- **Zona Sur (Calacoto):** ~3,200 m
- **El Alto:** ~4,100 m
- **Diferencias:** Hasta 400-900 metros en rutas urbanas

Las subidas y bajadas **afectan significativamente** el consumo de combustible.

#### ¿Cómo funciona?

La app usa **Google Elevation API** para:

1. **Obtener el perfil de elevación** de toda la ruta
2. **Calcular subidas y bajadas** totales en metros
3. **Ajustar el consumo** automáticamente:
   - **Subidas pronunciadas:** +30% a +50% más consumo
   - **Bajadas:** -10% a -15% menos consumo (limitado por uso de frenos)
4. **Mostrar análisis detallado** en los resultados

#### Información que muestra:

📊 **Panel de análisis de pendientes:**
- Elevación inicial y final
- Cambio neto de elevación
- Total de subidas (↗️ metros)
- Total de bajadas (↘️ metros)
- Porcentaje de impacto en consumo
- Consumo base vs. consumo ajustado

#### Ejemplo Real:

**Ruta: Plaza Murillo → Zona Sur (La Paz)**
```
📍 Distancia: 8.5 km
⛰️ Análisis de Pendientes:
- Elevación inicial: 3,640 m
- Elevación final: 3,200 m
- Cambio neto: -440 m (bajada)
- Subidas totales: 150 m
- Bajadas totales: 590 m
- Impacto: 8% menos consumo

💡 Consumo base: 18.0 km/l → Ajustado: 19.4 km/l
💰 Ahorro: ~Bs 0.35 en esta ruta
```

**Ruta: Zona Sur → El Alto**
```
📍 Distancia: 15.2 km
⛰️ Análisis de Pendientes:
- Elevación inicial: 3,200 m
- Elevación final: 4,100 m
- Cambio neto: +900 m (subida)
- Subidas totales: 950 m
- Bajadas totales: 50 m
- Impacto: 35% más consumo

💡 Consumo base: 18.0 km/l → Ajustado: 11.7 km/l
💰 Costo adicional: ~Bs 3.50 por las pendientes
```

#### Beneficios:

✅ **Precisión Real:** Costos más cercanos a la realidad de La Paz
✅ **Mejor Planificación:** Sabes cuánto gastarás realmente
✅ **Comparación Justa:** Compara rutas considerando pendientes
✅ **Badge Visual:** Identifica rutas con subidas ⛰️ o bajadas ⤵️
✅ **Educativo:** Entiende cómo las pendientes afectan tu vehículo

#### Configuración:

La funcionalidad de elevación se activa **automáticamente** cuando:
- Google Maps API está configurado
- La ruta tiene datos de elevación disponibles
- No requiere configuración adicional

### 6. 🌐 Desplegar con GitHub Pages (GRATIS)

Puedes publicar tu calculadora en internet gratuitamente:

1. **Ve a tu repositorio en GitHub:**
   ```
   Settings > Pages > Source: main branch > Save
   ```

2. **Tu sitio estará disponible en:**
   ```
   https://danidevdc.github.io/trasnporrLPcalc/
   ```

3. **Guía completa:** Ver archivo [DEPLOY.md](DEPLOY.md) para instrucciones detalladas

**Tiempo de despliegue:** 1-2 minutos ⚡

## 📊 Modelos Disponibles

### Vehículos Compactos
- **Suzuki Alto 800** - 22 km/l promedio
- **Suzuki Alto 1.0 DualJet** - 23 km/l promedio
- **Suzuki Swift 1.2L** - 18 km/l promedio
- **Suzuki Swift Híbrido** - 22.5 km/l promedio
- **Suzuki Swift Boosterjet 1.0L Turbo** - 19.5 km/l promedio
- **Suzuki Baleno 1.5L** - 17 km/l promedio

### SUVs y Crossovers
- **Suzuki Vitara 1.6 VVT** - 17.5 km/l promedio
- **Suzuki Vitara Híbrido** - 18.9 km/l promedio
- **Suzuki Grand Vitara Híbrido** - 21 km/l promedio
- **Suzuki Fronx Híbrido** - 21 km/l promedio
- **Suzuki SX4** - 15.5 km/l promedio

### MPVs
- **Suzuki Ertiga** - 16 km/l promedio
- **Suzuki XL7** - 15.5 km/l promedio

## ⛽ Precios de Gasolina (2025)

- **Gasolina Especial:** Bs 3.74/litro
- **Super Etanol 92:** Bs 4.50/litro
- **Gasolina Premium+:** Bs 5.96/litro (predeterminado)
- **Ultra Premium 100:** Bs 6.82/litro
- **Precio Personalizado:** Configurable

## 🎨 Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles** (< 480px)
- 📱 **Tablets** (480px - 768px)
- 💻 **Desktop** (> 768px)
- 🖨️ **Impresión** (estilos optimizados)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Diseño responsive con Flexbox y Grid
- **JavaScript ES6+** - Lógica de aplicación
- **Google Maps API** - Integración de mapas y rutas
- **Font: Inter** - Tipografía moderna de Google Fonts

## 📁 Estructura de Archivos

```
trasnporrLPcalc/
│
├── index.html          # Página principal
├── styles.css          # Estilos responsive
├── app.js             # Lógica principal de la app
├── car-data.js        # Datos de vehículos Suzuki
└── README.md          # Este archivo
```

## 🔧 Funcionalidades Técnicas

### Cálculo de Costos

```javascript
Costo Total = (Distancia en km / Consumo en km/l) × Precio por litro
```

La app calcula automáticamente:
- Litros necesarios para el viaje
- Costo total en Bolivianos
- Comparación entre diferentes rutas
- Consumo en ciudad, carretera y mixto

### Manejo de Errores

- ✅ Validación de selección de vehículo
- ✅ Validación de puntos de ruta
- ✅ Fallback a entrada manual sin Google Maps
- ✅ Manejo de errores de API

## 📱 Características Responsive

### Móviles
- Navegación vertical optimizada
- Botones de tamaño táctil
- Mapa adaptado (300px altura)
- Fuentes escaladas

### Tablets
- Layout de 2 columnas cuando es apropiado
- Mapa de 350px altura
- Mejor uso del espacio horizontal

### Desktop
- Vista completa con mapa grande (450px)
- Múltiples columnas en resultados
- Hover effects mejorados

## 🌐 Compatibilidad de Navegadores

- ✅ Chrome/Edge (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Opera (últimas 2 versiones)

## 📝 Notas Importantes

1. **Consumo real puede variar** según:
   - Estilo de conducción
   - Condiciones del camino
   - Carga del vehículo
   - Condiciones climáticas
   - Mantenimiento del vehículo

2. **Precios de combustible** están actualizados a enero 2025 pero pueden cambiar trimestralmente

3. **Datos de vehículos** basados en especificaciones oficiales de Suzuki Bolivia

## 🔄 Actualizaciones Futuras

- [ ] Guardar cálculos anteriores (LocalStorage)
- [ ] Exportar resultados a PDF
- [ ] Comparar múltiples vehículos
- [ ] Modo oscuro
- [ ] Soporte para múltiples paradas
- [ ] Estimación de tiempo de viaje sin Maps API
- [ ] Calculadora de ahorro entre modelos

## 📞 Soporte

Para más información sobre vehículos Suzuki:
- **IMCRUZ:** [https://www.imcruz.com](https://www.imcruz.com)
- **Suzuki Bolivia:** [https://www.suzuki.com.bo](https://www.suzuki.com.bo)

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso personal y educativo.

---

**Desarrollado para facilitar la planificación de viajes con vehículos Suzuki en Bolivia** 🇧🇴
