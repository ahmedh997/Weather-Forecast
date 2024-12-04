var allWeather = null; // Store fetched weather data here

// Function to fetch weather data and display it
async function getWeather(weatherLocation) {
    try {
        // Fetch weather data from the API
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7ae06a60bc2d497c9e0181832243011&q=${weatherLocation}&days=3`);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        var finalData = await response.json();
        allWeather = finalData;
        displayWeather(allWeather);
    } catch (error) {
        console.error(error.message);
    }
}

// Call the function for the initial city
getWeather('cairo');

// Search function triggered by user input
async function search(city) {
    try {
        let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7ae06a60bc2d497c9e0181832243011&q=${city}&days=3`);
        if (!response.ok) throw new Error("Failed to fetch weather data");
        let weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error(error.message);
    }
}

// Event listener for the search input field
document.getElementById("search").addEventListener("keyup", event => {
    search(event.target.value);
});

// Function to display weather data
function displayWeather(weatherData) {
    if (!weatherData)
        return;

    let weatherDiv = ``;

    // Display today's weather
    let today = weatherData.current;
    weatherDiv += `
        <div class="today forecast">
            <div class="forecast-header">
                <div class="day"><i class="fa-solid fa-cloud-sun-rain"></i> Current weather</div>
                <div class="date">${weatherData.current.last_updated}</div>
            </div>
            <div class="forecast-content">
                <h1 class="location">${weatherData.location.name}</h1>
                <h6>${weatherData.location.tz_id}</h6>
                <div class="degree">
                    <div class="num">${today.temp_c}<sup>°C</sup></div>
                    <div class="forecast-icon">
                        <img src="https:${today.condition.icon}" alt="Weather icon" width="90">
                    </div>
                    <p style="color: RGB(191, 193, 200); font-weight: 300;"> Condition: ${today.condition.text}</p>
                    <h6 style="color: RGB(191, 193, 200); font-weight: 300;"><i class="fa-solid fa-wind"></i> Wind: ${today.wind_dir} ${today.wind_kph} km/h</h6>
                </div>
            </div>
        </div>
    `;

    // Display weather forecast for the next two days
    let forecastDays = weatherData.forecast.forecastday;
    for (let i = 1; i < forecastDays.length; i++) {
        let forecast = forecastDays[i];
        weatherDiv += `
            <div class="forecast">
                <div class="forecast-header">
                    <div>${new Date(forecast.date).toLocaleDateString()}</div>
                </div>
                <div class="forecast-content">
                    <div class="forecast-icon">
                        <img src="https:${forecast.day.condition.icon}" alt="Weather icon" width="60">
                    </div>
                    <h3>Max: ${forecast.day.maxtemp_c}<sup>°C</sup></h3>
                    <h3>Min: ${forecast.day.mintemp_c}<sup>°C</sup></h3>
                    <p>${forecast.day.condition.text}</p>
                </div>
            </div>
        `;
    }

    // Update the HTML content
    document.getElementById('rowData').innerHTML = weatherDiv;
}
