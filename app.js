/**
 * Transport Cost Calculator - Main Application
 * For Suzuki vehicles in Bolivia
 */

// Global variables
let map;
let directionsService;
let directionsRenderer;
let elevationService;
let selectedCar = null;
let currentFuelPrice = 5.96; // Default: Premium+

// Map interaction variables
let startMarker = null;
let endMarker = null;
let startLocation = null;
let endLocation = null;
let pickingMode = null; // 'start' or 'end'

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize all app components
 */
function initializeApp() {
    populateCarModels();
    setupEventListeners();
    updateFuelPriceDisplay();
}

/**
 * Populate car model dropdown with Suzuki vehicles
 */
function populateCarModels() {
    const carModelSelect = document.getElementById('carModel');

    // Clear existing options except the first one
    carModelSelect.innerHTML = '<option value="">-- Selecciona un modelo --</option>';

    // Add car models
    suzukiCars.forEach(car => {
        const option = document.createElement('option');
        option.value = car.id;
        option.textContent = `${car.name} (${car.engineSize})`;
        carModelSelect.appendChild(option);
    });
}

/**
 * Setup event listeners for user interactions
 */
function setupEventListeners() {
    // Car model selection
    document.getElementById('carModel').addEventListener('change', handleCarSelection);

    // Fuel type selection
    document.getElementById('fuelType').addEventListener('change', handleFuelTypeChange);

    // Custom price input
    document.getElementById('customPrice').addEventListener('input', handleCustomPriceChange);

    // Calculate route button
    document.getElementById('calculateRoute').addEventListener('click', handleCalculateRoute);

    // Enter key on route inputs
    document.getElementById('startPoint').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleCalculateRoute();
    });
    document.getElementById('endPoint').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') handleCalculateRoute();
    });
}

/**
 * Handle car model selection
 */
function handleCarSelection(e) {
    const carId = e.target.value;
    const carDetails = document.getElementById('carDetails');

    if (!carId) {
        carDetails.classList.add('hidden');
        selectedCar = null;
        return;
    }

    selectedCar = suzukiCars.find(car => car.id === carId);

    if (selectedCar) {
        // Update car details display
        document.getElementById('consumption').textContent =
            `${selectedCar.consumption.combined} km/litro (promedio)`;
        document.getElementById('engineType').textContent = selectedCar.engineType;

        carDetails.classList.remove('hidden');
    }
}

/**
 * Handle fuel type change
 */
function handleFuelTypeChange(e) {
    const value = e.target.value;
    const customPriceGroup = document.getElementById('customPriceGroup');

    if (value === 'custom') {
        customPriceGroup.classList.remove('hidden');
        const customPrice = document.getElementById('customPrice').value;
        currentFuelPrice = customPrice ? parseFloat(customPrice) : 5.96;
    } else {
        customPriceGroup.classList.add('hidden');
        currentFuelPrice = parseFloat(value);
    }

    updateFuelPriceDisplay();
}

/**
 * Handle custom price input change
 */
function handleCustomPriceChange(e) {
    const value = parseFloat(e.target.value);
    if (value && value > 0) {
        currentFuelPrice = value;
        updateFuelPriceDisplay();
    }
}

/**
 * Update fuel price display
 */
function updateFuelPriceDisplay() {
    document.getElementById('currentFuelPrice').textContent = `Bs ${currentFuelPrice.toFixed(2)}`;
}

/**
 * Handle calculate route button click
 */
function handleCalculateRoute() {
    // Validation
    if (!selectedCar) {
        alert('Por favor selecciona un modelo de vehículo primero.');
        return;
    }

    if (!startLocation || !endLocation) {
        alert('Por favor selecciona el punto de partida y destino usando los botones 📍 o 🗺️.');
        return;
    }

    // Check if Google Maps is loaded
    if (typeof google === 'undefined' || !directionsService) {
        // Fallback: Manual distance input
        showManualDistanceInput();
        return;
    }

    // Calculate route with Google Maps using the selected locations
    calculateRouteWithMaps(startLocation, endLocation);
}

/**
 * Show manual distance input dialog (fallback when Maps API not available)
 */
function showManualDistanceInput() {
    const distance = prompt(
        'Google Maps API no está configurado.\n\n' +
        'Por favor ingresa la distancia en kilómetros manualmente:'
    );

    if (distance && !isNaN(distance) && parseFloat(distance) > 0) {
        const distanceKm = parseFloat(distance);
        const startPoint = document.getElementById('startPoint').value;
        const endPoint = document.getElementById('endPoint').value;

        // Create manual route result
        displayManualRouteResult(distanceKm, startPoint, endPoint);
    }
}

/**
 * Display manual route calculation result
 */
function displayManualRouteResult(distance, start, end) {
    const results = [];

    // Calculate for city, highway, and combined consumption
    const consumptionTypes = [
        { type: 'city', label: 'Ciudad', consumption: selectedCar.consumption.city },
        { type: 'highway', label: 'Carretera', consumption: selectedCar.consumption.highway },
        { type: 'combined', label: 'Mixto', consumption: selectedCar.consumption.combined }
    ];

    consumptionTypes.forEach(({ type, label, consumption }) => {
        const calculation = calculateFuelCost(distance, consumption, currentFuelPrice);
        results.push({
            name: `Ruta ${label}`,
            distance: distance,
            duration: 'N/A',
            consumption: consumption,
            litersNeeded: calculation.litersNeeded,
            cost: calculation.totalCost,
            route: `${start} → ${end}`
        });
    });

    displayResults(results);
}

/**
 * Calculate route using Google Maps API
 */
function calculateRouteWithMaps(startLoc, endLoc) {
    if (!directionsService) {
        showManualDistanceInput();
        return;
    }

    // Check if traffic should be considered
    const considerTraffic = document.getElementById('considerTraffic').checked;

    // Convert location objects to LatLng if needed
    const origin = new google.maps.LatLng(startLoc.lat, startLoc.lng);
    const destination = new google.maps.LatLng(endLoc.lat, endLoc.lng);

    const request = {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        region: 'BO' // Bolivia
    };

    // Add traffic model if enabled
    if (considerTraffic) {
        request.drivingOptions = {
            departureTime: new Date(), // Current time for real-time traffic
            trafficModel: 'bestguess' // 'bestguess', 'pessimistic', or 'optimistic'
        };
    }

    directionsService.route(request, function(result, status) {
        if (status === 'OK') {
            processRouteResults(result, considerTraffic);
            directionsRenderer.setDirections(result);
        } else {
            alert('No se pudo calcular la ruta: ' + status + '\n\nPor favor verifica los puntos ingresados.');
        }
    });
}

/**
 * Process Google Maps route results
 */
async function processRouteResults(result, considerTraffic) {
    const routes = result.routes;
    const results = [];

    // Process each route (with elevation data)
    for (let index = 0; index < routes.length; index++) {
        const route = routes[index];
        const leg = route.legs[0];
        const distanceKm = leg.distance.value / 1000; // Convert meters to km

        // Get duration (with or without traffic)
        let duration = leg.duration.text;
        let durationInTraffic = null;

        if (considerTraffic && leg.duration_in_traffic) {
            durationInTraffic = leg.duration_in_traffic.text;
            duration = durationInTraffic;
        }

        // Get elevation data for this route
        let elevationData = null;
        if (elevationService) {
            try {
                elevationData = await getRouteElevation(route.overview_path);
            } catch (error) {
                console.warn('Could not get elevation data:', error);
            }
        }

        // Calculate adjusted consumption based on elevation
        let baseConsumption = selectedCar.consumption.combined;
        let adjustedConsumption = baseConsumption;
        let elevationFactor = 1.0;

        if (elevationData) {
            elevationFactor = calculateElevationFactor(elevationData, distanceKm);
            adjustedConsumption = baseConsumption / elevationFactor;
        }

        const calculation = calculateFuelCost(distanceKm, adjustedConsumption, currentFuelPrice);

        results.push({
            name: routes.length > 1 ? `Ruta ${index + 1}` : 'Ruta Principal',
            distance: distanceKm,
            duration: duration,
            durationInTraffic: durationInTraffic,
            hasTrafficData: considerTraffic,
            consumption: adjustedConsumption,
            baseConsumption: baseConsumption,
            litersNeeded: calculation.litersNeeded,
            cost: calculation.totalCost,
            summary: route.summary || 'Vía principal',
            elevationData: elevationData,
            elevationFactor: elevationFactor
        });
    }

    displayResults(results);
}

/**
 * Get elevation profile for a route
 */
function getRouteElevation(path) {
    return new Promise((resolve, reject) => {
        if (!elevationService || !path || path.length === 0) {
            reject('Elevation service not available');
            return;
        }

        // Sample path at intervals (max 512 points for API)
        const maxSamples = 100;
        const step = Math.max(1, Math.floor(path.length / maxSamples));
        const sampledPath = [];

        for (let i = 0; i < path.length; i += step) {
            sampledPath.push(path[i]);
        }

        elevationService.getElevationAlongPath({
            path: sampledPath,
            samples: sampledPath.length
        }, function(results, status) {
            if (status === 'OK' && results) {
                resolve(results);
            } else {
                reject(status);
            }
        });
    });
}

/**
 * Calculate elevation factor for fuel consumption adjustment
 * Returns a factor where:
 * - 1.0 = flat terrain (no adjustment)
 * - < 1.0 = mostly uphill (increased consumption)
 * - > 1.0 = mostly downhill (decreased consumption)
 */
function calculateElevationFactor(elevationData, distanceKm) {
    if (!elevationData || elevationData.length < 2) {
        return 1.0;
    }

    let totalClimb = 0;
    let totalDescent = 0;

    // Calculate total climb and descent
    for (let i = 1; i < elevationData.length; i++) {
        const elevChange = elevationData[i].elevation - elevationData[i - 1].elevation;
        if (elevChange > 0) {
            totalClimb += elevChange;
        } else {
            totalDescent += Math.abs(elevChange);
        }
    }

    // Net elevation change
    const netElevation = elevationData[elevationData.length - 1].elevation - elevationData[0].elevation;

    // Calculate average gradient
    const avgClimbGradient = totalClimb / (distanceKm * 1000); // meters per meter
    const avgDescentGradient = totalDescent / (distanceKm * 1000);

    // Elevation factor calculation
    // Climbing: increases consumption significantly (30-50% for steep climbs)
    // Descending: reduces consumption but less (10-20% savings)
    const climbPenalty = avgClimbGradient * 50; // 5% penalty per 0.1 gradient
    const descentBonus = avgDescentGradient * 15; // 1.5% bonus per 0.1 gradient

    // Final factor (1.0 = no change, <1.0 = more consumption, >1.0 = less consumption)
    const factor = 1.0 - climbPenalty + descentBonus;

    // Clamp between 0.6 (66% increase) and 1.15 (15% decrease)
    return Math.max(0.6, Math.min(1.15, factor));
}

/**
 * Display calculation results
 */
function displayResults(results) {
    const resultsContainer = document.getElementById('routeResults');
    const resultsSection = document.getElementById('step4');

    // Clear previous results
    resultsContainer.innerHTML = '';

    // Sort routes by cost (cheapest first)
    results.sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost));

    // Create result cards
    results.forEach((result, index) => {
        const routeCard = createRouteCard(result, index === 0);
        resultsContainer.appendChild(routeCard);
    });

    // Show results section
    resultsSection.classList.remove('hidden');

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Create a route result card
 */
function createRouteCard(result, isBestOption) {
    const card = document.createElement('div');
    card.className = 'route-option' + (isBestOption ? ' selected' : '');

    const badge = isBestOption ? '<span style="background: #28a745; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; margin-left: 10px;">✓ Mejor opción</span>' : '';

    // Add traffic badge if traffic data is available
    const trafficBadge = result.hasTrafficData ? '<span style="background: #ff9800; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; margin-left: 10px;">🚦 Con tráfico</span>' : '';

    // Add elevation badge if elevation data is available
    let elevationBadge = '';
    if (result.elevationData && result.elevationFactor !== 1.0) {
        const isUphill = result.elevationFactor < 1.0;
        const isDownhill = result.elevationFactor > 1.0;
        const icon = isUphill ? '⛰️' : '⤵️';
        const text = isUphill ? 'Subidas' : 'Bajadas';
        const color = isUphill ? '#d32f2f' : '#388e3c';
        elevationBadge = `<span style="background: ${color}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; margin-left: 10px;">${icon} ${text}</span>`;
    }

    // Calculate elevation info
    let elevationInfo = '';
    if (result.elevationData && result.elevationData.length > 0) {
        const startElev = result.elevationData[0].elevation;
        const endElev = result.elevationData[result.elevationData.length - 1].elevation;
        const netChange = endElev - startElev;

        // Calculate total climb/descent
        let totalClimb = 0;
        let totalDescent = 0;
        for (let i = 1; i < result.elevationData.length; i++) {
            const change = result.elevationData[i].elevation - result.elevationData[i - 1].elevation;
            if (change > 0) totalClimb += change;
            else totalDescent += Math.abs(change);
        }

        const consumptionChange = ((result.consumption - result.baseConsumption) / result.baseConsumption * 100);
        const changeText = consumptionChange > 0
            ? `${Math.abs(consumptionChange).toFixed(0)}% menos consumo`
            : `${Math.abs(consumptionChange).toFixed(0)}% más consumo`;
        const changeColor = consumptionChange > 0 ? '#388e3c' : '#d32f2f';

        elevationInfo = `
            <div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #2196F3;">
                <div style="font-weight: 600; margin-bottom: 10px; color: #1976D2;">⛰️ Análisis de Pendientes</div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; font-size: 0.9rem;">
                    <div>
                        <div style="color: #666; font-size: 0.8rem;">Elevación inicial</div>
                        <div style="font-weight: 600;">${startElev.toFixed(0)} m</div>
                    </div>
                    <div>
                        <div style="color: #666; font-size: 0.8rem;">Elevación final</div>
                        <div style="font-weight: 600;">${endElev.toFixed(0)} m</div>
                    </div>
                    <div>
                        <div style="color: #666; font-size: 0.8rem;">Cambio neto</div>
                        <div style="font-weight: 600; color: ${netChange >= 0 ? '#d32f2f' : '#388e3c'};">${netChange >= 0 ? '+' : ''}${netChange.toFixed(0)} m</div>
                    </div>
                    <div>
                        <div style="color: #666; font-size: 0.8rem;">Subidas totales</div>
                        <div style="font-weight: 600; color: #d32f2f;">↗ ${totalClimb.toFixed(0)} m</div>
                    </div>
                    <div>
                        <div style="color: #666; font-size: 0.8rem;">Bajadas totales</div>
                        <div style="font-weight: 600; color: #388e3c;">↘ ${totalDescent.toFixed(0)} m</div>
                    </div>
                    <div>
                        <div style="color: #666; font-size: 0.8rem;">Impacto en consumo</div>
                        <div style="font-weight: 600; color: ${changeColor};">${changeText}</div>
                    </div>
                </div>
                <div style="margin-top: 10px; padding: 8px; background: white; border-radius: 4px; font-size: 0.85rem; color: #555;">
                    💡 Consumo base: ${result.baseConsumption.toFixed(1)} km/l → Ajustado: ${result.consumption.toFixed(1)} km/l
                </div>
            </div>
        `;
    }

    card.innerHTML = `
        <div class="route-header">
            <div class="route-name">
                ${result.name}
                ${badge}
                ${trafficBadge}
                ${elevationBadge}
            </div>
            <div class="route-cost">Bs ${result.cost}</div>
        </div>
        <div class="route-details">
            <div class="detail-item">
                <div class="detail-label">Distancia</div>
                <div class="detail-value">${result.distance.toFixed(2)} km</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">${result.hasTrafficData ? 'Duración (con tráfico)' : 'Duración'}</div>
                <div class="detail-value">${result.duration}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Consumo ${result.elevationData ? '(ajustado)' : ''}</div>
                <div class="detail-value">${result.consumption.toFixed(1)} km/l</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Litros necesarios</div>
                <div class="detail-value">${result.litersNeeded} L</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Precio combustible</div>
                <div class="detail-value">Bs ${currentFuelPrice.toFixed(2)}/L</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Vehículo</div>
                <div class="detail-value">${selectedCar.name}</div>
            </div>
        </div>
        ${result.summary ? `<div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #ddd; color: #666; font-size: 0.9rem;">📍 ${result.summary}</div>` : ''}
        ${elevationInfo}
        ${result.hasTrafficData ? `<div style="margin-top: 10px; padding: 10px; background: #fff3cd; border-radius: 6px; color: #856404; font-size: 0.85rem;">ℹ️ El tiempo estimado considera las condiciones de tráfico actuales en tiempo real</div>` : ''}
    `;

    return card;
}

/**
 * Setup map interaction - click to select points and get current location
 */
function setupMapInteraction() {
    const startInput = document.getElementById('startPoint');
    const endInput = document.getElementById('endPoint');

    const pickStartBtn = document.getElementById('pickFromMapStart');
    const pickEndBtn = document.getElementById('pickFromMapEnd');
    const useLocationStartBtn = document.getElementById('useCurrentLocationStart');
    const useLocationEndBtn = document.getElementById('useCurrentLocationEnd');

    // Click on map to select location
    map.addListener('click', (event) => {
        if (!pickingMode) return;

        const location = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };

        if (pickingMode === 'start') {
            setStartLocation(location);
            pickStartBtn.classList.remove('active');
        } else if (pickingMode === 'end') {
            setEndLocation(location);
            pickEndBtn.classList.remove('active');
        }

        pickingMode = null;
        map.setOptions({ draggableCursor: null });
    });

    // Pick from map buttons
    pickStartBtn.addEventListener('click', () => {
        pickingMode = 'start';
        pickStartBtn.classList.add('active');
        pickEndBtn.classList.remove('active');
        map.setOptions({ draggableCursor: 'crosshair' });
        startInput.placeholder = '👆 Haz clic en el mapa...';
    });

    pickEndBtn.addEventListener('click', () => {
        pickingMode = 'end';
        pickEndBtn.classList.add('active');
        pickStartBtn.classList.remove('active');
        map.setOptions({ draggableCursor: 'crosshair' });
        endInput.placeholder = '👆 Haz clic en el mapa...';
    });

    // Use current location buttons
    useLocationStartBtn.addEventListener('click', () => {
        getCurrentLocation((location) => {
            setStartLocation(location);
        });
    });

    useLocationEndBtn.addEventListener('click', () => {
        getCurrentLocation((location) => {
            setEndLocation(location);
        });
    });

    console.log('✅ Map interaction initialized - click to select points');
}

/**
 * Get current location using browser geolocation
 */
function getCurrentLocation(callback) {
    if (!navigator.geolocation) {
        alert('Tu navegador no soporta geolocalización');
        return;
    }

    const startInput = document.getElementById('startPoint');
    const endInput = document.getElementById('endPoint');

    startInput.value = 'Obteniendo ubicación...';
    endInput.value = 'Obteniendo ubicación...';

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            callback(location);
        },
        (error) => {
            alert('No se pudo obtener tu ubicación. Asegúrate de permitir el acceso.');
            console.error('Geolocation error:', error);
            startInput.value = '';
            endInput.value = '';
        }
    );
}

/**
 * Set start location and update marker
 */
function setStartLocation(location) {
    startLocation = location;

    // Remove old marker
    if (startMarker) {
        startMarker.setMap(null);
    }

    // Create new marker
    startMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Punto de Partida',
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
        },
        draggable: true
    });

    // Update location if marker is dragged
    startMarker.addListener('dragend', (event) => {
        startLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        reverseGeocode(startLocation, 'startPoint');
    });

    // Get address for this location
    reverseGeocode(location, 'startPoint');

    // Center map on new location
    map.panTo(location);
    map.setZoom(14);
}

/**
 * Set end location and update marker
 */
function setEndLocation(location) {
    endLocation = location;

    // Remove old marker
    if (endMarker) {
        endMarker.setMap(null);
    }

    // Create new marker
    endMarker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Punto de Destino',
        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
        },
        draggable: true
    });

    // Update location if marker is dragged
    endMarker.addListener('dragend', (event) => {
        endLocation = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        };
        reverseGeocode(endLocation, 'endPoint');
    });

    // Get address for this location
    reverseGeocode(location, 'endPoint');

    // Center map on new location
    map.panTo(location);
    map.setZoom(14);
}

/**
 * Convert coordinates to address (reverse geocoding)
 */
function reverseGeocode(location, inputId) {
    const geocoder = new google.maps.Geocoder();
    const input = document.getElementById(inputId);

    geocoder.geocode({ location: location }, (results, status) => {
        if (status === 'OK' && results[0]) {
            input.value = results[0].formatted_address;
        } else {
            input.value = `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`;
        }
    });
}

/**
 * Initialize Google Maps
 * This function is called by the Google Maps API callback
 */
function initMap() {
    try {
        // Initialize map centered on La Paz, Bolivia
        const laPaz = { lat: -16.5000, lng: -68.1500 };

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 6,
            center: laPaz,
            mapTypeControl: true,
            streetViewControl: false,
            fullscreenControl: true
        });

        // Initialize directions service and renderer
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            panel: null,
            suppressMarkers: false
        });

        // Initialize elevation service
        elevationService = new google.maps.ElevationService();

        // Add traffic layer to the map
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        // Setup map interaction for clicking and location selection
        setupMapInteraction();

        // Hide API notice
        const apiNotice = document.getElementById('apiKeyNotice');
        if (apiNotice) {
            apiNotice.style.display = 'none';
        }

        console.log('Google Maps initialized successfully with traffic and elevation services');
    } catch (error) {
        console.error('Error initializing Google Maps:', error);
    }
}

/**
 * Detect Google Maps errors and show helpful notice
 */
function gm_authFailure() {
    const apiNotice = document.getElementById('apiKeyNotice');
    if (apiNotice) {
        apiNotice.style.display = 'block';
    }
    alert('⚠️ ERROR DE GOOGLE MAPS\n\nNo se puede cargar Google Maps. El problema más común es:\n\n❌ NO HAY FACTURACIÓN ACTIVA en Google Cloud\n\nGoogle Maps REQUIERE que agregues una tarjeta de crédito (aunque tienes $200 gratis al mes).\n\n✅ Solución:\n1. Ve a console.cloud.google.com/billing\n2. Agrega una cuenta de facturación con tarjeta\n3. Habilita las APIs necesarias\n\nRevisa el mensaje naranja abajo del mapa para más detalles.');
}

/**
 * Fallback if Google Maps fails to load
 */
window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof google === 'undefined') {
            console.warn('Google Maps API not loaded. Manual distance input will be available.');
            const mapContainer = document.getElementById('map');
            const apiNotice = document.getElementById('apiKeyNotice');

            mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666; text-align: center; padding: 20px;">⚠️ Google Maps no está disponible.<br><br>Revisa la configuración de API Key y facturación.</div>';

            if (apiNotice) {
                apiNotice.style.display = 'block';
            }
        }
    }, 3000);
});

// Make functions available globally for Google Maps callback
if (typeof window !== 'undefined') {
    window.initMap = initMap;
    window.gm_authFailure = gm_authFailure;
}
