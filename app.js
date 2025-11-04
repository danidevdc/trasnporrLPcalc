/**
 * Transport Cost Calculator - Main Application
 * For Suzuki vehicles in Bolivia
 */

// Global variables
let map;
let directionsService;
let directionsRenderer;
let selectedCar = null;
let currentFuelPrice = 5.96; // Default: Premium+

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
    const startPoint = document.getElementById('startPoint').value.trim();
    const endPoint = document.getElementById('endPoint').value.trim();

    // Validation
    if (!selectedCar) {
        alert('Por favor selecciona un modelo de vehículo primero.');
        return;
    }

    if (!startPoint || !endPoint) {
        alert('Por favor ingresa el punto de partida y destino.');
        return;
    }

    // Check if Google Maps is loaded
    if (typeof google === 'undefined' || !directionsService) {
        // Fallback: Manual distance input
        showManualDistanceInput();
        return;
    }

    // Calculate route with Google Maps
    calculateRouteWithMaps(startPoint, endPoint);
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
function calculateRouteWithMaps(start, end) {
    if (!directionsService) {
        showManualDistanceInput();
        return;
    }

    // Check if traffic should be considered
    const considerTraffic = document.getElementById('considerTraffic').checked;

    const request = {
        origin: start,
        destination: end,
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
function processRouteResults(result, considerTraffic) {
    const routes = result.routes;
    const results = [];

    routes.forEach((route, index) => {
        const leg = route.legs[0];
        const distanceKm = leg.distance.value / 1000; // Convert meters to km

        // Get duration (with or without traffic)
        let duration = leg.duration.text;
        let durationInTraffic = null;

        if (considerTraffic && leg.duration_in_traffic) {
            durationInTraffic = leg.duration_in_traffic.text;
            duration = durationInTraffic;
        }

        // Use combined consumption as default
        const consumption = selectedCar.consumption.combined;
        const calculation = calculateFuelCost(distanceKm, consumption, currentFuelPrice);

        results.push({
            name: routes.length > 1 ? `Ruta ${index + 1}` : 'Ruta Principal',
            distance: distanceKm,
            duration: duration,
            durationInTraffic: durationInTraffic,
            hasTrafficData: considerTraffic,
            consumption: consumption,
            litersNeeded: calculation.litersNeeded,
            cost: calculation.totalCost,
            summary: route.summary || 'Vía principal'
        });
    });

    displayResults(results);
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

    card.innerHTML = `
        <div class="route-header">
            <div class="route-name">
                ${result.name}
                ${badge}
                ${trafficBadge}
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
                <div class="detail-label">Consumo</div>
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
        ${result.hasTrafficData ? `<div style="margin-top: 10px; padding: 10px; background: #fff3cd; border-radius: 6px; color: #856404; font-size: 0.85rem;">ℹ️ El tiempo estimado considera las condiciones de tráfico actuales en tiempo real</div>` : ''}
    `;

    return card;
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

        // Add traffic layer to the map
        const trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        // Hide API notice
        const apiNotice = document.getElementById('apiKeyNotice');
        if (apiNotice) {
            apiNotice.style.display = 'none';
        }

        console.log('Google Maps initialized successfully with traffic layer');
    } catch (error) {
        console.error('Error initializing Google Maps:', error);
    }
}

/**
 * Fallback if Google Maps fails to load
 */
window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof google === 'undefined') {
            console.warn('Google Maps API not loaded. Manual distance input will be available.');
            const mapContainer = document.getElementById('map');
            mapContainer.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666; text-align: center; padding: 20px;">Google Maps no está disponible.<br>Usa el botón de calcular para ingresar la distancia manualmente.</div>';
        }
    }, 3000);
});

// Make initMap available globally for Google Maps callback
if (typeof window !== 'undefined') {
    window.initMap = initMap;
}
