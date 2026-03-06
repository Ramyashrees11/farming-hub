// Weather icons mapping
const weatherIcons = {
    'Clear': 'fa-sun',
    'Sunny': 'fa-sun',
    'Partly Cloudy': 'fa-cloud-sun',
    'Cloudy': 'fa-cloud',
    'Overcast': 'fa-cloud',
    'Mist': 'fa-smog',
    'Fog': 'fa-smog',
    'Rain': 'fa-cloud-rain',
    'Showers': 'fa-cloud-showers-heavy',
    'Thunderstorm': 'fa-bolt',
    'Snow': 'fa-snowflake',
    'Sleet': 'fa-cloud-meatball',
    'Hail': 'fa-cloud-meatball',
    'Drizzle': 'fa-cloud-rain'
};

// API Configuration
const API_KEY = '9ae5af4465e158152e3dc4fba36d7953';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Common Indian cities with their coordinates
const indianCities = {
    'mumbai': { lat: 19.0760, lon: 72.8777 },
    'delhi': { lat: 28.6139, lon: 77.2090 },
    'bangalore': { lat: 12.9716, lon: 77.5946 },
    'hyderabad': { lat: 17.3850, lon: 78.4867 },
    'ahmedabad': { lat: 23.0225, lon: 72.5714 },
    'chennai': { lat: 13.0827, lon: 80.2707 },
    'kolkata': { lat: 22.5726, lon: 88.3639 },
    'surat': { lat: 21.1702, lon: 72.8311 },
    'pune': { lat: 18.5204, lon: 73.8567 },
    'jaipur': { lat: 26.9124, lon: 75.7873 },
    'lucknow': { lat: 26.8467, lon: 80.9462 },
    'kanpur': { lat: 26.4499, lon: 80.3319 },
    'nagpur': { lat: 21.1458, lon: 79.0882 },
    'indore': { lat: 22.7196, lon: 75.8577 },
    'thane': { lat: 19.2183, lon: 72.9781 },
    'bhopal': { lat: 23.2599, lon: 77.4126 },
    'visakhapatnam': { lat: 17.6868, lon: 83.2185 },
    'patna': { lat: 25.5941, lon: 85.1376 },
    'vadodara': { lat: 22.3072, lon: 73.1812 },
    'ghaziabad': { lat: 28.6692, lon: 77.4538 },
    'ludhiana': { lat: 30.9010, lon: 75.8573 },
    'agra': { lat: 27.1767, lon: 78.0081 },
    'nashik': { lat: 19.9975, lon: 73.7898 },
    'faridabad': { lat: 28.4089, lon: 77.3178 },
    'meerut': { lat: 28.9845, lon: 77.7064 },
    'rajkot': { lat: 22.3039, lon: 70.8022 },
    'varanasi': { lat: 25.3176, lon: 82.9739 },
    'srinagar': { lat: 34.0837, lon: 74.7973 },
    'amritsar': { lat: 31.6340, lon: 74.8723 },
    'allahabad': { lat: 25.4358, lon: 81.8463 },
    'coimbatore': { lat: 11.0168, lon: 76.9558 },
    'jabalpur': { lat: 23.1815, lon: 79.9864 },
    'gwalior': { lat: 26.2183, lon: 78.1828 },
    'vijayawada': { lat: 16.5062, lon: 80.6480 },
    'jodhpur': { lat: 26.2389, lon: 73.0243 },
    'madurai': { lat: 9.9252, lon: 78.1198 },
    'raipur': { lat: 21.2514, lon: 81.6296 },
    'kota': { lat: 25.2138, lon: 75.8648 },
    'guwahati': { lat: 26.1445, lon: 91.7362 },
    'chandigarh': { lat: 30.7333, lon: 76.7794 },
    'solapur': { lat: 17.6599, lon: 75.9064 },
    'hubli': { lat: 15.3647, lon: 75.1240 },
    'mysore': { lat: 12.2958, lon: 76.6394 },
    'tiruchirappalli': { lat: 10.7905, lon: 78.7047 },
    'bareilly': { lat: 28.3670, lon: 79.4304 },
    'aligarh': { lat: 27.8974, lon: 78.0880 },
    'tiruppur': { lat: 11.1085, lon: 77.3411 },
    'gurgaon': { lat: 28.4595, lon: 77.0266 },
    'moradabad': { lat: 28.8389, lon: 78.7768 },
    'jalandhar': { lat: 31.3260, lon: 75.5762 },
    'bhubaneswar': { lat: 20.2961, lon: 85.8245 },
    'salem': { lat: 11.6643, lon: 78.1460 },
    'warangal': { lat: 17.9689, lon: 79.5941 },
    'guntur': { lat: 16.3067, lon: 80.4365 },
    'bhiwandi': { lat: 19.3002, lon: 73.0588 },
    'saharanpur': { lat: 29.9675, lon: 77.5539 },
    'gorakhpur': { lat: 26.7606, lon: 83.3732 },
    'bikaner': { lat: 28.0229, lon: 73.3119 },
    'amravati': { lat: 20.9374, lon: 77.7796 },
    'noida': { lat: 28.5355, lon: 77.3910 },
    'jamshedpur': { lat: 22.8046, lon: 86.2029 },
    'bhilai': { lat: 21.1938, lon: 81.3509 },
    'cuttack': { lat: 20.4625, lon: 85.8830 },
    'firozabad': { lat: 27.1590, lon: 78.3957 },
    'kochi': { lat: 9.9312, lon: 76.2673 },
    'nellore': { lat: 14.4426, lon: 79.9865 },
    'bhavnagar': { lat: 21.7645, lon: 72.1519 },
    'dehradun': { lat: 30.3165, lon: 78.0322 },
    'durgapur': { lat: 23.5204, lon: 87.3119 },
    'asansol': { lat: 23.6739, lon: 86.9524 },
    'rourkela': { lat: 22.2604, lon: 84.8536 },
    'nanded': { lat: 19.1383, lon: 77.3210 },
    'kolhapur': { lat: 16.7050, lon: 74.2433 },
    'ajmer': { lat: 26.4499, lon: 74.6399 },
    'akola': { lat: 20.7096, lon: 77.0022 },
    'belgaum': { lat: 15.8497, lon: 74.4977 },
    'gulbarga': { lat: 17.3297, lon: 76.8343 },
    'jamnagar': { lat: 22.4707, lon: 70.0577 },
    'dhule': { lat: 20.9042, lon: 74.7749 },
    'gaya': { lat: 24.7955, lon: 85.0002 },
    'jalgaon': { lat: 21.0077, lon: 75.5626 },
    'kurnool': { lat: 15.8281, lon: 78.0373 },
    'udaipur': { lat: 24.5854, lon: 73.7125 },
    'bellary': { lat: 15.1394, lon: 76.9214 },
    'sangli': { lat: 16.8524, lon: 74.5815 },
    'tuticorin': { lat: 8.7642, lon: 78.1348 },
    'calicut': { lat: 11.2588, lon: 75.7804 },
    'karnal': { lat: 29.6857, lon: 76.9905 },
    'bharatpur': { lat: 27.2159, lon: 77.4987 },
    'puducherry': { lat: 11.9416, lon: 79.8083 },
    'port blair': { lat: 11.6234, lon: 92.7265 }
};

// Default coordinates (Coimbatore, India)
let currentLat = 11.0168;
let currentLon = 76.9558;
let currentLocation = 'Coimbatore';

// DOM elements
const locationSearch = document.getElementById('location-search');
const searchBtn = document.getElementById('search-btn');
const getWeatherBtn = document.querySelector('.weather-btn');
const backBtn = document.querySelector('.back-btn');
const forecastContainer = document.getElementById('forecast-container');
const cropRecommendations = document.getElementById('crop-recommendations');

// Function to get coordinates from location name with fallback
async function getCoordinates(locationName) {
    const normalizedName = locationName.toLowerCase().trim();
    
    // First try: Check our predefined Indian cities
    if (indianCities[normalizedName]) {
        return {
            lat: indianCities[normalizedName].lat,
            lon: indianCities[normalizedName].lon,
            name: locationName.charAt(0).toUpperCase() + locationName.slice(1)
        };
    }
    
    // Second try: Use OpenWeatherMap geocoding API
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${locationName},IN&appid=${API_KEY}`);
        if (response.ok) {
            const data = await response.json();
            return {
                lat: data.coord.lat,
                lon: data.coord.lon,
                name: data.name
            };
        }
    } catch (error) {
        console.error('Error with OpenWeatherMap geocoding:', error);
    }
    
    // Third try: Try without country code
    try {
        const response = await fetch(`${BASE_URL}/weather?q=${locationName}&appid=${API_KEY}`);
        if (response.ok) {
            const data = await response.json();
            return {
                lat: data.coord.lat,
                lon: data.coord.lon,
                name: data.name
            };
        }
    } catch (error) {
        console.error('Error with generic geocoding:', error);
    }
    
    // Final fallback: Show error and suggest common cities
    const suggestions = Object.keys(indianCities).slice(0, 10).join(', ');
    alert(`Location "${locationName}" not found. Try these cities: ${suggestions}`);
    return null;
}

// Function to fetch current weather data
async function getCurrentWeather(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Weather data not available');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching current weather:', error);
        alert('Unable to fetch weather data. Please try again.');
        return null;
    }
}

// Function to fetch 5-day forecast
async function getForecast(lat, lon) {
    try {
        const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error('Forecast data not available');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching forecast:', error);
        alert('Unable to fetch forecast data. Please try again.');
        return null;
    }
}

function getFarmingAdvice(weatherData) {
    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].main;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    
    let advice = '';
    
    
    if (temp < 10) {
        advice = '❄️ Very cold temperatures. Protect sensitive crops with covers or greenhouses.';
    } else if (temp < 15) {
        advice = '🌡️ Cool conditions. Ideal for cool-season crops like wheat and vegetables.';
    } else if (temp >= 15 && temp <= 30) {
        advice = '✅ Optimal temperatures for most crops. Good growing conditions.';
    } else if (temp > 30 && temp <= 35) {
        advice = '☀️ Warm temperatures. Increase irrigation frequency for moisture-loving crops.';
    } else {
        advice = '🔥 Very hot conditions. Provide shade and extra water for heat-sensitive plants.';
    }
    
    if (condition === 'Rain') {
        advice += ' 🌧️ Rain expected - reduce irrigation and ensure proper drainage.';
    } else if (condition === 'Clear' || condition === 'Sunny') {
        advice += ' ☀️ Sunny weather - maintain regular watering schedule.';
    } else if (condition === 'Cloudy') {
        advice += ' ☁️ Cloudy conditions - reduced evaporation, adjust watering accordingly.';
    } else if (condition === 'Thunderstorm') {
        advice += ' ⚡ Thunderstorms expected - secure crops and equipment.';
    }
    

    if (humidity > 80) {
        advice += ' 💧 High humidity - watch for fungal diseases and improve air circulation.';
    } else if (humidity < 30) {
        advice += ' 🌵 Low humidity - plants may need more frequent watering.';
    }
    
   
    if (windSpeed > 20) {
        advice += ' 💨 Strong winds - protect young plants and consider windbreaks.';
    }
    
    return advice;
}


function getCropRecommendations(weatherData) {
    const temp = weatherData.main.temp;
    const condition = weatherData.weather[0].main;
    const humidity = weatherData.main.humidity;
    
    if (temp >= 25 && temp <= 35) {
        return [
            { name: 'Rice', suitability: 'High', description: 'Ideal for kharif season with adequate water.' },
            { name: 'Cotton', suitability: 'High', description: 'Thrives in warm conditions with good drainage.' },
            { name: 'Sugarcane', suitability: 'High', description: 'Loves warm temperatures and sunshine.' }
        ];
    } else if (temp >= 20 && temp < 25) {
        return [
            { name: 'Wheat', suitability: 'High', description: 'Perfect rabi season conditions.' },
            { name: 'Vegetables', suitability: 'High', description: 'Ideal for most vegetable varieties.' },
            { name: 'Pulses', suitability: 'Medium', description: 'Good conditions for lentil and chickpea crops.' }
        ];
    } else if (temp >= 15 && temp < 20) {
        return [
            { name: 'Potato', suitability: 'High', description: 'Cool temperatures perfect for potato cultivation.' },
            { name: 'Mustard', suitability: 'High', description: 'Ideal conditions for mustard crops.' },
            { name: 'Barley', suitability: 'Medium', description: 'Suitable for barley cultivation.' }
        ];
    } else {
        return [
            { name: 'Greenhouse Crops', suitability: 'High', description: 'Consider protected cultivation.' },
            { name: 'Millets', suitability: 'Medium', description: 'Drought-resistant options available.' },
            { name: 'Seasonal Adjust', suitability: 'Variable', description: 'Consult local agricultural experts.' }
        ];
    }
}


async function updateWeatherUI(locationName) {
    try {
        
        document.getElementById('location').textContent = 'Loading...';
        document.getElementById('temp').textContent = '--°C';
        
        
        const coords = await getCoordinates(locationName);
        if (!coords) return;
        
        // Update current location
        currentLat = coords.lat;
        currentLon = coords.lon;
        currentLocation = coords.name;
        
        // Fetch current weather and forecast
        const [currentWeather, forecastData] = await Promise.all([
            getCurrentWeather(currentLat, currentLon),
            getForecast(currentLat, currentLon)
        ]);
        
        if (!currentWeather || !forecastData) return;
        
        // Update current weather display
        document.getElementById('location').textContent = currentLocation;
        document.getElementById('forecast-location').textContent = currentLocation;
        document.getElementById('temp').textContent = `${Math.round(currentWeather.main.temp)}°C`;
        document.getElementById('weather-condition').textContent = currentWeather.weather[0].main;
        document.getElementById('humidity').textContent = `${currentWeather.main.humidity}%`;
        document.getElementById('wind').textContent = `${Math.round(currentWeather.wind.speed * 3.6)} km/h`;
        document.getElementById('pressure').textContent = `${currentWeather.main.pressure} hPa`;
        
        // Update weather icon
        const iconElement = document.getElementById('weather-icon');
        const condition = currentWeather.weather[0].main;
        iconElement.innerHTML = `<i class="fas ${weatherIcons[condition] || 'fa-cloud'}"></i>`;
        
        // Update forecast
        forecastContainer.innerHTML = '';
        // Get forecast for next 5 days (every 24 hours)
        for (let i = 0; i < forecastData.list.length; i += 8) {
            if (forecastContainer.children.length >= 5) break;
            
            const forecast = forecastData.list[i];
            const date = new Date(forecast.dt * 1000);
            const dayName = i === 0 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'long' });
            
            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';
            dayCard.innerHTML = `
                <h4>${dayName}</h4>
                <div><i class="fas ${weatherIcons[forecast.weather[0].main] || 'fa-cloud'}"></i></div>
                <p class="temp">${Math.round(forecast.main.temp)}°C</p>
                <p>${forecast.weather[0].main}</p>
            `;
            forecastContainer.appendChild(dayCard);
        }
        
        // Update farming advice
        const advice = getFarmingAdvice(currentWeather);
        document.getElementById('advice-text').textContent = advice;
        
        // Update crop recommendations
        const crops = getCropRecommendations(currentWeather);
        cropRecommendations.innerHTML = '';
        crops.forEach(crop => {
            const cropCard = document.createElement('div');
            cropCard.className = 'crop-card';
            cropCard.innerHTML = `
                <div class="crop-image">
                    <i class="fas fa-seedling" style="font-size: 50px; color: #4caf50;"></i>
                </div>
                <div class="crop-info">
                    <h3>${crop.name}</h3>
                    <p><strong>Suitability:</strong> ${crop.suitability}</p>
                    <p>${crop.description}</p>
                </div>
            `;
            cropRecommendations.appendChild(cropCard);
        });
        
    } catch (error) {
        console.error('Error updating weather UI:', error);
        alert('Failed to update weather information. Please try again.');
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    const location = locationSearch.value.trim();
    if (location) {
        updateWeatherUI(location);
    } else {
        alert('Please enter a location name');
    }
});

locationSearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const location = locationSearch.value.trim();
        if (location) {
            updateWeatherUI(location);
        } else {
            alert('Please enter a location name');
        }
    }
});

getWeatherBtn.addEventListener('click', () => {
    const location = locationSearch.value.trim() || currentLocation;
    updateWeatherUI(location);
});

backBtn.addEventListener('click', () => {
    window.location.href = 'ov.html';
});

// Add autocomplete functionality
locationSearch.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    if (value.length > 2) {
        // You could implement a dropdown with suggestions here
        console.log('Searching for:', value);
    }
});

// Initialize with default data
document.addEventListener('DOMContentLoaded', () => {
    updateWeatherUI(currentLocation);
    
    // Add some common Indian cities as search suggestions
    const popularCities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'];
    locationSearch.placeholder = `Search location (e.g., ${popularCities.join(', ')})`;
});