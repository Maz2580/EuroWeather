/**
 * EuroWeather - European Travel Weather Forecast
 * JavaScript Application for 7Timer! API Integration
 */

// ============================================
// CONFIGURATION & STATE
// ============================================

const CONFIG = {
    API_BASE_URL: 'https://www.7timer.info/bin/api.pl',
    PRODUCT: 'civillight',
    OUTPUT: 'json'
};

// Embedded City Data from CSV
const EMBEDDED_CITIES = [
    { "city": "Amsterdam", "country": "Netherlands", "latitude": 52.367, "longitude": 4.904 },
    { "city": "Ankara", "country": "Turkey", "latitude": 39.933, "longitude": 32.859 },
    { "city": "\u00c5storp", "country": "Sweden", "latitude": 56.134, "longitude": 12.945 },
    { "city": "Athens", "country": "Greece", "latitude": 37.983, "longitude": 23.727 },
    { "city": "Belfast", "country": "Northern Ireland", "latitude": 54.597, "longitude": -5.93 },
    { "city": "Barcelona", "country": "Spain", "latitude": 41.387, "longitude": 2.168 },
    { "city": "Berlin", "country": "Germany", "latitude": 52.52, "longitude": 13.405 },
    { "city": "Bern", "country": "Switzerland", "latitude": 46.948, "longitude": 7.447 },
    { "city": "Bilbao", "country": "Spain", "latitude": 43.263, "longitude": -2.935 },
    { "city": "Brussels", "country": "Belgium", "latitude": 50.847, "longitude": 4.357 },
    { "city": "Bucharest", "country": "Romania", "latitude": 47.497, "longitude": 19.04 },
    { "city": "Budapest", "country": "Hungary", "latitude": 59.329, "longitude": 18.068 },
    { "city": "Cardiff", "country": "Wales", "latitude": 51.483, "longitude": -3.168 },
    { "city": "Cologne", "country": "Germany", "latitude": 50.937, "longitude": 6.96 },
    { "city": "Copenhagen", "country": "Denmark", "latitude": 55.676, "longitude": 12.568 },
    { "city": "Cork", "country": "Ireland", "latitude": 51.898, "longitude": -8.475 },
    { "city": "Dublin", "country": "Ireland", "latitude": 53.349, "longitude": -6.26 },
    { "city": "Edinburgh", "country": "Scotland", "latitude": 55.953, "longitude": -3.188 },
    { "city": "Florence", "country": "Italy", "latitude": 43.7696, "longitude": 11.255 },
    { "city": "Frankfurt", "country": "Germany", "latitude": 50.11, "longitude": 8.682 },
    { "city": "French Riviera", "country": "France", "latitude": 43.254, "longitude": 6.637 },
    { "city": "Funchal", "country": "Portugual", "latitude": 32.65, "longitude": -16.908 },
    { "city": "Gibraltar", "country": "", "latitude": 36.14, "longitude": -5.353 },
    { "city": "Gothenburg", "country": "Sweden", "latitude": 57.708, "longitude": 11.974 },
    { "city": "Hamburg", "country": "Germany", "latitude": 53.548, "longitude": 9.987 },
    { "city": "Helsinki", "country": "Finland", "latitude": 60.169, "longitude": 24.938 },
    { "city": "Ibiza", "country": "Spain", "latitude": 39.02, "longitude": 1.482 },
    { "city": "Kyiv", "country": "Ukraine", "latitude": 50.45, "longitude": 30.523 },
    { "city": "Lillehammer", "country": "Norway", "latitude": 61.115, "longitude": 10.466 },
    { "city": "Lisbon", "country": "Portugual", "latitude": 38.722, "longitude": -9.139 },
    { "city": "London", "country": "England", "latitude": 51.507, "longitude": -0.127 },
    { "city": "Madrid", "country": "Spain", "latitude": 40.416, "longitude": -3.703 },
    { "city": "Mallorca", "country": "Spain", "latitude": 39.695, "longitude": 3.017 },
    { "city": "Manchester", "country": "England", "latitude": 53.48, "longitude": -2.242 },
    { "city": "Marseille", "country": "France", "latitude": 43.296, "longitude": 5.369 },
    { "city": "Maspalomas", "country": "Spain", "latitude": 27.76, "longitude": -15.586 },
    { "city": "Milan", "country": "Italy", "latitude": 45.464, "longitude": 9.19 },
    { "city": "Munich", "country": "Germany", "latitude": 48.135, "longitude": 11.582 },
    { "city": "Naples", "country": "Italy", "latitude": 40.851, "longitude": 14.268 },
    { "city": "O\u00f1ati", "country": "Spain", "latitude": 43.034, "longitude": -2.417 },
    { "city": "Oslo", "country": "Norway", "latitude": 59.913, "longitude": 10.752 },
    { "city": "Paris", "country": "France", "latitude": 48.856, "longitude": 2.352 },
    { "city": "Prague", "country": "Czech Republic", "latitude": 50.075, "longitude": 14.437 },
    { "city": "Reykjav\u00edk", "country": "Iceland", "latitude": 64.146, "longitude": -21.942 },
    { "city": "Riga", "country": "Latvia", "latitude": 56.879, "longitude": 24.603 },
    { "city": "Rome", "country": "Italy", "latitude": 41.902, "longitude": 12.496 },
    { "city": "Santa Cruz das Flores", "country": "Portugual", "latitude": 39.453, "longitude": -31.127 },
    { "city": "Santa Cruz de Tenerife", "country": "Spain", "latitude": 28.463, "longitude": -16.251 },
    { "city": "Skye", "country": "Scotland", "latitude": 57.273, "longitude": -6.215 },
    { "city": "Sofia", "country": "Bulgaria", "latitude": 42.697, "longitude": 23.321 },
    { "city": "Stockholm", "country": "Sweden", "latitude": 59.329, "longitude": 18.068 },
    {
        "city": "Tallinn", "country": "Estonia",
        "latitude": 59.437,
        "longitude": 24.753
    },
    { "city": "Vienna", "country": "Austria", "latitude": 18.208, "longitude": 16.373 },
    { "city": "Warsaw", "country": "Poland", "latitude": 52.229, "longitude": 21.012 },
    { "city": "York", "country": "England", "latitude": 53.961, "longitude": -1.07 },
    { "city": "Zurich", "country": "Switzerland", "latitude": 47.376, "longitude": 8.541 }
];

// Application State
const state = {
    cities: [],
    selectedCity: null,
    forecastData: null,
    isCelsius: true
};

// Weather type to icon mapping
const WEATHER_ICONS = {
    'clear': 'clear.png',
    'pcloudy': 'pcloudy.png',
    'mcloudy': 'mcloudy.png',
    'cloudy': 'cloudy.png',
    'humid': 'humid.png',
    'lightrain': 'lightrain.png',
    'oshower': 'oshower.png',
    'ishower': 'ishower.png',
    'lightsnow': 'lightsnow.png',
    'rain': 'rain.png',
    'snow': 'snow.png',
    'rainsnow': 'rainsnow.png',
    'ts': 'tstorm.png',
    'tsrain': 'tsrain.png',
    'tstorm': 'tstorm.png',
    'fog': 'fog.png',
    'windy': 'windy.png'
};

// Weather descriptions mapping
const WEATHER_DESCRIPTIONS = {
    'clear': 'Clear Sky',
    'pcloudy': 'Partly Cloudy',
    'mcloudy': 'Mostly Cloudy',
    'cloudy': 'Cloudy',
    'humid': 'Humid',
    'lightrain': 'Light Rain',
    'oshower': 'Occasional Showers',
    'ishower': 'Isolated Showers',
    'lightsnow': 'Light Snow',
    'rain': 'Rain',
    'snow': 'Snow',
    'rainsnow': 'Rain & Snow Mix',
    'ts': 'Thunderstorm',
    'tsrain': 'Thunderstorm with Rain',
    'tstorm': 'Thunderstorm',
    'fog': 'Foggy',
    'windy': 'Windy'
};

// Wind speed descriptions
const WIND_DESCRIPTIONS = {
    1: 'Calm',
    2: 'Light',
    3: 'Moderate',
    4: 'Fresh',
    5: 'Strong',
    6: 'Gale',
    7: 'Storm',
    8: 'Violent Storm'
};

// Day names
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ============================================
// DOM ELEMENTS
// ============================================

const elements = {
    citySelect: document.getElementById('city-select'),
    getForecastBtn: document.getElementById('get-forecast'),
    loading: document.getElementById('loading'),
    errorMessage: document.getElementById('error-message'),
    forecastContainer: document.getElementById('forecast-container'),
    forecastGrid: document.getElementById('forecast-grid'),
    selectedCityName: document.getElementById('selected-city-name'),
    selectedCountry: document.getElementById('selected-country'),
    updateTime: document.getElementById('update-time'),
    celsiusBtn: document.getElementById('celsius-btn'),
    fahrenheitBtn: document.getElementById('fahrenheit-btn')
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Convert Celsius to Fahrenheit
 */
function celsiusToFahrenheit(celsius) {
    return Math.round((celsius * 9 / 5) + 32);
}

/**
 * Format temperature with unit
 */
function formatTemperature(celsius) {
    if (state.isCelsius) {
        return `${celsius}°C`;
    }
    return `${celsiusToFahrenheit(celsius)}°F`;
}

/**
 * Parse date string from API (YYYYMMDD format)
 */
function parseDate(dateString) {
    const year = parseInt(dateString.substring(0, 4));
    const month = parseInt(dateString.substring(4, 6)) - 1;
    const day = parseInt(dateString.substring(6, 8));
    return new Date(year, month, day);
}

/**
 * Format date for display
 */
function formatDate(date) {
    return `${MONTH_NAMES[date.getMonth()]} ${date.getDate()}`;
}

/**
 * Get day name from date
 */
function getDayName(date, isToday = false) {
    if (isToday) return 'Today';
    return DAY_NAMES_SHORT[date.getDay()];
}

/**
 * Get weather icon path
 */
function getWeatherIcon(weatherType) {
    // Images are in the 'images' folder relative to index.html
    const filename = WEATHER_ICONS[weatherType] || 'cloudy.png';
    return `images/${filename}`;
}

/**
 * Get weather description
 */
function getWeatherDescription(weatherType) {
    return WEATHER_DESCRIPTIONS[weatherType] || weatherType;
}

/**
 * Get wind description
 */
function getWindDescription(windLevel) {
    return WIND_DESCRIPTIONS[windLevel] || 'Unknown';
}

/**
 * Show element
 */
function showElement(element) {
    element.classList.remove('hidden');
}

/**
 * Hide element
 */
function hideElement(element) {
    element.classList.add('hidden');
}

/**
 * Show error message
 */
function showError(message) {
    const errorText = elements.errorMessage.querySelector('.error-text');
    errorText.textContent = message;
    showElement(elements.errorMessage);
    hideElement(elements.loading);
    hideElement(elements.forecastContainer);
}

/**
 * Hide error message
 */
function hideError() {
    hideElement(elements.errorMessage);
}

// ============================================
// API FUNCTIONS
// ============================================

/**
 * Initialize Cities Data
 * Uses embedded data to avoid CORS issues with local files
 */
function loadCities() {
    state.cities = EMBEDDED_CITIES.sort((a, b) => a.city.localeCompare(b.city));
    populateCityDropdown();
}

/**
 * Populate city dropdown with options
 */
function populateCityDropdown() {
    const select = elements.citySelect;

    // Clear existing options except the first one
    while (select.options.length > 1) {
        select.remove(1);
    }

    // Add city options
    state.cities.forEach((city, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${city.city}, ${city.country}`;
        select.appendChild(option);
    });
}

/**
 * Fetch weather forecast from 7Timer! API
 */
async function fetchWeatherForecast(latitude, longitude) {
    const url = `${CONFIG.API_BASE_URL}?lat=${latitude}&lon=${longitude}&product=${CONFIG.PRODUCT}&output=${CONFIG.OUTPUT}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error('Failed to fetch weather data. Please try again.');
    }
}

// ============================================
// UI RENDERING
// ============================================

/**
 * Create a forecast card element
 */
function createForecastCard(dayData, index) {
    const date = parseDate(dayData.date.toString());
    const isTodayCard = index === 0;

    const card = document.createElement('div');
    card.className = `forecast-card${isTodayCard ? ' today' : ''}`;

    // Temperature data
    const tempMax = dayData.temp2m?.max ?? dayData.temp2m;
    const tempMin = dayData.temp2m?.min ?? dayData.temp2m;

    const weatherIcon = getWeatherIcon(dayData.weather);
    const weatherDesc = getWeatherDescription(dayData.weather);
    const windDesc = getWindDescription(dayData.wind10m_max);

    card.innerHTML = `
        ${isTodayCard ? '<span class="today-badge">Today</span>' : ''}
        <div class="card-day">${getDayName(date, isTodayCard)}</div>
        <div class="card-date">${formatDate(date)}</div>
        <img src="${weatherIcon}" alt="${weatherDesc}" class="weather-icon" loading="lazy" onerror="this.src='images/cloudy.png'">
        <div class="weather-desc">${weatherDesc}</div>
        <div class="temperature-range">
            <span class="temp-high">${formatTemperature(tempMax)}</span>
            <span class="temp-low">${formatTemperature(tempMin)}</span>
        </div>
        <div class="wind-info">
            <span class="wind-icon">💨</span>
            <span>${windDesc}</span>
        </div>
    `;

    return card;
}

/**
 * Render forecast data
 */
function renderForecast() {
    if (!state.forecastData || !state.selectedCity) return;

    const { dataseries } = state.forecastData;
    const grid = elements.forecastGrid;

    // Clear existing cards
    grid.innerHTML = '';

    // Create cards for each day (up to 7 days)
    const daysToShow = Math.min(dataseries.length, 7);
    for (let i = 0; i < daysToShow; i++) {
        const card = createForecastCard(dataseries[i], i);
        grid.appendChild(card);
    }

    // Update header
    elements.selectedCityName.textContent = state.selectedCity.city;
    elements.selectedCountry.textContent = state.selectedCity.country;

    // Update timestamp
    const now = new Date();
    elements.updateTime.textContent = now.toLocaleString();

    // Show forecast container
    showElement(elements.forecastContainer);
}

/**
 * Update temperature display (when toggling units)
 */
function updateTemperatureDisplay() {
    if (!state.forecastData) return;
    renderForecast();
}

// ============================================
// EVENT HANDLERS
// ============================================

/**
 * Handle get forecast button click
 */
async function handleGetForecast() {
    const selectedIndex = elements.citySelect.value;

    if (!selectedIndex) {
        showError('Please select a city from the dropdown.');
        return;
    }

    const city = state.cities[selectedIndex];
    state.selectedCity = city;

    // Show loading, hide others
    hideError();
    hideElement(elements.forecastContainer);
    showElement(elements.loading);

    try {
        const data = await fetchWeatherForecast(city.latitude, city.longitude);
        state.forecastData = data;

        hideElement(elements.loading);
        renderForecast();

        // Scroll to forecast
        elements.forecastContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
        showError(error.message);
    }
}

/**
 * Handle temperature unit toggle
 */
function handleCelsiusClick() {
    if (!state.isCelsius) {
        state.isCelsius = true;
        elements.celsiusBtn.classList.add('active');
        elements.fahrenheitBtn.classList.remove('active');
        updateTemperatureDisplay();
    }
}

function handleFahrenheitClick() {
    if (state.isCelsius) {
        state.isCelsius = false;
        elements.fahrenheitBtn.classList.add('active');
        elements.celsiusBtn.classList.remove('active');
        updateTemperatureDisplay();
    }
}

/**
 * Handle city select change (auto-fetch)
 */
function handleCitySelectChange() {
    hideError();
    // Optional: Auto-fetch when city changes
    // Uncomment below to enable auto-fetch
    if (elements.citySelect.value) {
        handleGetForecast();
    }
}

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================

function handleKeyboardNav(event) {
    if (event.key === 'Enter' && event.target === elements.citySelect) {
        handleGetForecast();
    }
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
function init() {
    // Load city data
    loadCities();

    // Add event listeners
    elements.getForecastBtn.addEventListener('click', handleGetForecast);
    elements.celsiusBtn.addEventListener('click', handleCelsiusClick);
    elements.fahrenheitBtn.addEventListener('click', handleFahrenheitClick);
    elements.citySelect.addEventListener('change', handleCitySelectChange);
    elements.citySelect.addEventListener('keypress', handleKeyboardNav);

    console.log('EuroWeather initialized successfully!');
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', init);

// ============================================
// ERROR HANDLING
// ============================================

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
