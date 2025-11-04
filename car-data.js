/**
 * Suzuki Vehicle Data for IMCRUZ Bolivia
 * Data includes fuel consumption rates and engine specifications
 * Sources: Official Suzuki Bolivia specs and real-world consumption data
 */

const suzukiCars = [
    {
        id: 'alto-800',
        name: 'Suzuki Alto 800',
        engineSize: '0.8L',
        engineType: 'Gasolina',
        consumption: {
            city: 20,      // km/l in city
            highway: 25,   // km/l on highway
            combined: 22   // km/l combined average
        },
        description: 'El automóvil más económico en consumo de combustible',
        year: '2024'
    },
    {
        id: 'alto-10',
        name: 'Suzuki Alto 1.0 DualJet',
        engineSize: '1.0L',
        engineType: 'Gasolina DualJet',
        consumption: {
            city: 21,
            highway: 26,
            combined: 23
        },
        description: 'Motor DualJet optimizado con mayor eficiencia',
        year: '2024'
    },
    {
        id: 'swift-standard',
        name: 'Suzuki Swift 1.2L',
        engineSize: '1.2L',
        engineType: 'Gasolina',
        consumption: {
            city: 15.6,
            highway: 21.9,
            combined: 18
        },
        description: 'Deportivo compacto con excelente rendimiento',
        year: '2024'
    },
    {
        id: 'swift-hybrid',
        name: 'Suzuki Swift Híbrido',
        engineSize: '1.2L',
        engineType: 'Híbrido 12V SHVS',
        consumption: {
            city: 20.6,
            highway: 25.5,
            combined: 22.5
        },
        description: 'Tecnología híbrida con batería auto-recargable',
        year: '2024'
    },
    {
        id: 'swift-boosterjet',
        name: 'Suzuki Swift Boosterjet 1.0L Turbo',
        engineSize: '1.0L Turbo',
        engineType: 'Gasolina Turbo',
        consumption: {
            city: 16,
            highway: 24,
            combined: 19.5
        },
        description: 'Motor turbo con alto rendimiento y eficiencia',
        year: '2024'
    },
    {
        id: 'baleno',
        name: 'Suzuki Baleno 1.5L',
        engineSize: '1.5L',
        engineType: 'Gasolina',
        consumption: {
            city: 15,
            highway: 19,
            combined: 17
        },
        description: 'Sedán elegante con tecnología avanzada',
        year: '2024'
    },
    {
        id: 'vitara-16',
        name: 'Suzuki Vitara 1.6 VVT',
        engineSize: '1.6L',
        engineType: 'Gasolina VVT',
        consumption: {
            city: 14,
            highway: 19.6,
            combined: 17.5
        },
        description: 'SUV compacto versátil para ciudad y carretera',
        year: '2024'
    },
    {
        id: 'vitara-hybrid',
        name: 'Suzuki Vitara Híbrido',
        engineSize: '1.4L',
        engineType: 'Híbrido 48V',
        consumption: {
            city: 17,
            highway: 21,
            combined: 18.9
        },
        description: 'SUV con sistema híbrido de 48V',
        year: '2024'
    },
    {
        id: 'grand-vitara-hybrid',
        name: 'Suzuki Grand Vitara Híbrido',
        engineSize: '1.5L',
        engineType: 'Híbrido Completo',
        consumption: {
            city: 19,
            highway: 23,
            combined: 21
        },
        description: 'SUV híbrido con máxima eficiencia de combustible',
        year: '2024'
    },
    {
        id: 'fronx-hybrid',
        name: 'Suzuki Fronx Híbrido',
        engineSize: '1.2L',
        engineType: 'Híbrido 12V SHVS',
        consumption: {
            city: 19,
            highway: 24,
            combined: 21
        },
        description: 'SUV compacto con tecnología híbrida ISG',
        year: '2024'
    },
    {
        id: 'ertiga',
        name: 'Suzuki Ertiga',
        engineSize: '1.5L',
        engineType: 'Gasolina',
        consumption: {
            city: 14,
            highway: 18,
            combined: 16
        },
        description: 'MPV de 7 asientos con motorización eficiente',
        year: '2024'
    },
    {
        id: 'xl7',
        name: 'Suzuki XL7',
        engineSize: '1.5L',
        engineType: 'Gasolina',
        consumption: {
            city: 13.5,
            highway: 17.5,
            combined: 15.5
        },
        description: 'SUV de 7 asientos robusto y espacioso',
        year: '2024'
    },
    {
        id: 'sx4',
        name: 'Suzuki SX4',
        engineSize: '1.6L',
        engineType: 'Gasolina',
        consumption: {
            city: 13,
            highway: 18,
            combined: 15.5
        },
        description: 'Crossover versátil para todo terreno',
        year: '2024'
    }
];

/**
 * Gasoline prices in Bolivia (Bolivianos per liter)
 * Updated: January 2025
 */
const gasolinePrices = {
    especial: {
        name: 'Gasolina Especial',
        price: 3.74,
        description: 'Subsidiada por el Estado'
    },
    especialPlus: {
        name: 'Gasolina Especial Plus',
        price: 3.74,
        description: 'Subsidiada por el Estado'
    },
    superEtanol: {
        name: 'Super Etanol 92',
        price: 4.50,
        description: 'Etanol con octanaje 92'
    },
    premiumPlus: {
        name: 'Gasolina Premium+',
        price: 5.96,
        description: 'Precio indexado al mercado internacional (Q1 2025)'
    },
    ultraPremium: {
        name: 'Ultra Premium 100',
        price: 6.82,
        description: 'Máximo octanaje disponible'
    }
};

/**
 * Calculate fuel cost for a given distance
 * @param {number} distance - Distance in kilometers
 * @param {number} consumption - Fuel consumption in km/l
 * @param {number} fuelPrice - Price per liter in Bolivianos
 * @returns {object} - Calculation details
 */
function calculateFuelCost(distance, consumption, fuelPrice) {
    const litersNeeded = distance / consumption;
    const totalCost = litersNeeded * fuelPrice;

    return {
        distance: distance.toFixed(2),
        consumption: consumption.toFixed(2),
        litersNeeded: litersNeeded.toFixed(2),
        fuelPrice: fuelPrice.toFixed(2),
        totalCost: totalCost.toFixed(2)
    };
}

// Make data available globally
if (typeof window !== 'undefined') {
    window.suzukiCars = suzukiCars;
    window.gasolinePrices = gasolinePrices;
    window.calculateFuelCost = calculateFuelCost;
}
