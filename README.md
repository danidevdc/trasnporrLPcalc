# 🚗 Calculadora de Costo de Transporte - Suzuki Bolivia

Una aplicación web responsive para calcular el costo de viajes en vehículos Suzuki en Bolivia, integrando Google Maps y datos actualizados de consumo de combustible.

## 📋 Características

- ✅ **13 Modelos Suzuki** disponibles de IMCRUZ Bolivia
- ✅ **Integración con Google Maps** para planificación de rutas
- ✅ **Múltiples opciones de ruta** con comparación de costos
- ✅ **Precios actualizados** de gasolina en Bolivia (2025)
- ✅ **Diseño 100% responsive** (móvil, tablet, desktop)
- ✅ **Modo fallback manual** si Google Maps no está disponible
- ✅ **Cálculos precisos** basados en consumo real

## 🚀 Cómo Usar

### 1. Configurar Google Maps API (Opcional pero recomendado)

Para usar el mapa interactivo:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto
3. Habilita las siguientes APIs:
   - Maps JavaScript API
   - Directions API
   - Places API
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
   - Ingresa punto de partida (ej: "Santa Cruz, Bolivia")
   - Ingresa punto de destino (ej: "La Paz, Bolivia")
4. **Haz clic en "Calcular Ruta y Costo"**
5. **Revisa los resultados** con múltiples opciones de ruta ordenadas por costo

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
