

const apiKey = '78f52716c353bfe1231fc47d44fd6ff9'; 
const searchBar = document.getElementById('searchBar');
const suggestions = document.getElementById('suggestions');
const selectedLocation = document.getElementById('selected-location');
const selectedCountry = document.getElementById('selected-country');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weathericon');
const weeklyForecastContainer = document.getElementById('weeklyForecast');
const hourlyForecastContainer = document.getElementById('hourlyForecastContainer');
// Event listener for input changes
searchBar.addEventListener('input', async function() {
    const input = searchBar.value.trim();
    suggestions.innerHTML = ''; 

    if (input.length > 1) { // Start searching after 3 characters
        try {
            const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=${apiKey}`);
            const data = await response.json();

            console.log(data)
            data.forEach(place => {
                const suggestionItem = document.createElement('div');
                suggestionItem.classList.add('suggestion-item');
                suggestionItem.textContent = `${place.name}, ${place.country}`;
                suggestionItem.addEventListener('click', function() {
                    searchBar.value = place.name;
                    document.getElementById('showTemperature').style.display = 'block';
                    selectedLocation.innerHTML = place.name;
                    selectedCountry.innerHTML = place.country;
                    fetchWeatherData(place.lat, place.lon,input);
                    suggestions.innerHTML = ''; 
                    searchBar.value = '';
                });
                suggestions.appendChild(suggestionItem);
            });
        } catch (error) {
            console.error("Error fetching suggestions:", error);
        }
    }
});



async function fetchWeatherData(lat, lon ,loc) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        const weatherData = await response.json();

        const currentWeather = weatherData.weather[0].main;
        const currentTemp = weatherData.main.temp + '°C';
        weeklyForecastContainer.style.display='flex';
        hourlyForecastContainer.style.display='flex';
        temperature.innerHTML = currentTemp;
        ShowWeatherIcon(currentWeather);
       getWeatherData(loc)
      
    
     

    } catch (error)
     {
        console.error("Error fetching weather data:", error);
        alert("Unable to fetch weather data. Please try again later.");
    }
}

function getWeatherData(loc) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${loc}&units=metric&appid=${apiKey}`; //used 5 days data key becuase 7 days api key was not free 

    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Data not Found');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
          fetchWeeklyForecast(data);
          fetchHourlyForecast(data);
          
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
          
        });
}


function fetchWeeklyForecast(data) {
    
    
    weeklyForecastContainer.innerHTML = ''; // Clear previous forecast

    for (let i = 0; i < 5; i++) {
        const forecastDay = data.list[i * 8];
        const date = new Date(forecastDay.dt_txt).toLocaleDateString(undefined, { weekday: 'long' });
        const temp = forecastDay.main.temp;
       

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-day');
        forecastElement.innerHTML = `
            <p>${date}</p>
            <div>${getWeatherIcon(forecastDay.weather[0].main)}</div>
            <p>${temp}°C</p>
        `;

        weeklyForecastContainer.appendChild(forecastElement);
    }
}

function fetchHourlyForecast(data) {
   
    hourlyForecastContainer.innerHTML = ''; // Clear previous forecast

    // Display hourly data for the next 24 hours
    data.list.slice(0, 8).forEach(hour => {
        const time = new Date(hour.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const temp = hour.main.temp;
        const icon = `https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`;
        const description = hour.weather[0].description;

        const hourElement = document.createElement('div');
        
        hourElement.innerHTML = `
            <p>${time}</p>
           <img src="${icon}" alt="${description}" style="width:83px; height:83px;">
            <p>${temp}°C</p>
            <p>${description}</p>
        `;

        hourlyForecastContainer.appendChild(hourElement);
    });
}
// simple icon display in daily panel
function getWeatherIcon(weather) {
    switch (weather) {
        case "Clouds":
            return '<i class="fa fa-cloud fa-3x" style="margin-top:10px; margin-bottom:14px;"></i>';
        case "Rain":
            return '<img src="./Images/rainy.png" alt="Rainy Icon" style="width: 54px; margin-top:10px;  margin-bottom:10px;"/>';
        case "Clear":
            return '<i class="fa fa-sun-o fa-3x" style="margin-top:10px; margin-bottom:14px;"></i>';
    }
}


//show icon in today weather
function ShowWeatherIcon(weather)
{
    console.log(weather)
    let iconHtml
    switch (weather)
    {
        case "Mist":
            iconHtml =  '<i class="fa fa-cloud fa-lg" style="color: white;"></i>';
            
            // Insert the HTML into the container
            weatherIcon.innerHTML = iconHtml;
            break;
        case "Clouds":
            iconHtml =  '<i class="fa fa-cloud fa-lg" style="color: white;"></i>';
            
            // Insert the HTML into the container
            weatherIcon.innerHTML = iconHtml;
            break;
        case "Rainy":
            iconHtml =  '<img src="./Images/rainy.png" style="color:white;"/>';
            weatherIcon.innerHTML = iconHtml;
           break;
        case "Clear":
            iconHtml =  '<i class="fa fa-sun-o fa-lg" style="color: white;"></i>';
            weatherIcon.innerHTML = iconHtml;
           break;
    }
}

