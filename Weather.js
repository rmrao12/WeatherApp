const cities = [
    { 
        location: "Rawalpindi", 
        country:"Pakistan",
        forecast: {
            sunday: { temperature: "30°C", weather: "Sunny" },
            monday: { temperature: "31°C", weather: "Cloudy" },
            tuesday: { temperature: "34°C", weather: "Rainy" },
            wednesday: { temperature: "33°C", weather: "Sunny" },
            thursday: { temperature: "32°C", weather: "Cloudy" },
            friday: { temperature: "34°C", weather: "Sunny" },
            saturday: { temperature: "35°C", weather: "Rainy" }
        }
    },
    { 
        location: "Islamabad", 
        country:"Pakistan",
        forecast: {
            sunday: { temperature: "29°C", weather: "Cloudy" },
            monday: { temperature: "30°C", weather: "Sunny" },
            tuesday: { temperature: "32°C", weather: "Rainy" },
            wednesday: { temperature: "31°C", weather: "Sunny" },
            thursday: { temperature: "30°C", weather: "Cloudy" },
            friday: { temperature: "32°C", weather: "Sunny" },
            saturday: { temperature: "33°C", weather: "Rainy" }
        }
    },
    { 
        location: "Karachi", 
        country:"Pakistan",
        forecast: {
            sunday: { temperature: "34°C", weather: "Sunny" },
            monday: { temperature: "35°C", weather: "Cloudy" },
            tuesday: { temperature: "36°C", weather: "Sunny" },
            wednesday: { temperature: "36°C", weather: "Cloudy" },
            thursday: { temperature: "35°C", weather: "Sunny" },
            friday: { temperature: "36°C", weather: "Rainy" },
            saturday: { temperature: "37°C", weather: "Sunny" }
        }
    },
    { 
        location: "Lahore", 
        country:"Pakistan",
        forecast: {
            sunday: { temperature: "33°C", weather: "Sunny" },
            monday: { temperature: "34°C", weather: "Cloudy" },
            tuesday: { temperature: "35°C", weather: "Rainy" },
            wednesday: { temperature: "34°C", weather: "Sunny" },
            thursday: { temperature: "33°C", weather: "Cloudy" },
            friday: { temperature: "35°C", weather: "Sunny" },
            saturday: { temperature: "36°C", weather: "Rainy" }
        }
    },
    { 
        location: "Multan", 
        country:"Pakistan",
        forecast: {
            sunday: { temperature: "37°C", weather: "Sunny" },
            monday: { temperature: "38°C", weather: "Cloudy" },
            tuesday: { temperature: "39°C", weather: "Sunny" },
            wednesday: { temperature: "38°C", weather: "Cloudy" },
            thursday: { temperature: "37°C", weather: "Sunny" },
            friday: { temperature: "38°C", weather: "Rainy" },
            saturday: { temperature: "39°C", weather: "Sunny" }
        }
    },
    { 
        location: "Peshawar", 
        country:"Pakistan",
        forecast: {
            sunday: { temperature: "33°C", weather: "Cloudy" },
            monday: { temperature: "34°C", weather: "Sunny" },
            tuesday: { temperature: "34°C", weather: "Rainy" },
            wednesday: { temperature: "33°C", weather: "Cloudy" },
            thursday: { temperature: "32°C", weather: "Sunny" },
            friday: { temperature: "34°C", weather: "Rainy" },
            saturday: { temperature: "35°C", weather: "Sunny" }
        }
    },
    { 
        location: "Swat", 
        country:"Pakistan",
        forecast: {
            sunday: { temperature: "27°C", weather: "Rainy" },
            monday: { temperature: "28°C", weather: "Cloudy" },
            tuesday: { temperature: "28°C", weather: "Sunny" },
            wednesday: { temperature: "27°C", weather: "Rainy" },
            thursday: { temperature: "26°C", weather: "Cloudy" },
            friday: { temperature: "28°C", weather: "Sunny" },
            saturday: { temperature: "29°C", weather: "Rainy" }
        }
    },
    { 
        location: "Sydney", 
        country:"Australia",
        forecast: {
            sunday: { temperature: "29°C", weather: "Cloudy" },
            monday: { temperature: "30°C", weather: "Sunny" },
            tuesday: { temperature: "32°C", weather: "Rainy" },
            wednesday: { temperature: "31°C", weather: "Sunny" },
            thursday: { temperature: "30°C", weather: "Cloudy" },
            friday: { temperature: "32°C", weather: "Sunny" },
            saturday: { temperature: "33°C", weather: "Rainy" }
        }
    },
];
const today = new Date();

// Get the day of the week as a number (0 for Sunday, 1 for Monday, etc.)
const dayNumber = today.getDay();
const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
const currentDay = daysOfWeek[dayNumber];
const searchBar = document.getElementById('searchBar');
const suggestions = document.getElementById('suggestions');
const selectedLocation = document.getElementById('selected-location');
const selectedCountry = document.getElementById('selected-country');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weathericon');
const weeklyForecastContainer = document.getElementById('weeklyForecast');

// Event listener for input changes
searchBar.addEventListener('input', function() {
    const input = searchBar.value.toLowerCase();
    suggestions.innerHTML = ''; 

    if (input) {
        
        const filteredPlaces=[];
    
        
        for (let i = 0; i < cities.length; i++) {
            
            const place = cities[i];
           
            if (place.location.toLowerCase().includes(input)) 
            {
                filteredPlaces.push(place);
            }
        }
      
       // const filteredPlaces = cities.filter(place => place.location.toLowerCase().includes(input));   //above work can also be done through this
        console.log(filteredPlaces)
        filteredPlaces.forEach(place => {
            const suggestionItem = document.createElement('div');
            suggestionItem.textContent = place.location;
            suggestionItem.addEventListener('click', function() {
                searchBar.value = place.location;
                document.getElementById('showTemperature').style.display='block';
                weeklyForecastContainer.style.display='flex';
              selectedLocation.innerHTML = place.location;
              selectedCountry.innerHTML = place.country;
              temperature.innerHTML=place.forecast[currentDay].temperature;
              const weather=place.forecast[currentDay].weather;
              console.log(weather)
              suggestions.innerHTML = ''; 
              searchBar.value='';
                ShowWeatherIcon(weather);
                displayWeeklyForecast(place.forecast);

            });
            suggestions.appendChild(suggestionItem);
        });
    }
});

function displayWeeklyForecast(forecast) {
    
    weeklyForecastContainer.innerHTML = ''; // Clear previous forecast

    daysOfWeek.forEach((day, index) => {
        const dayCard = document.createElement('div');
        dayCard.classList.add('day-card');
        dayCard.innerHTML = `
            <p>${day.charAt(0).toUpperCase() + day.slice(1)}</p>
            <div>${forecast[day].temperature}</div>
            <div>${getWeatherIcon(forecast[day].weather)}</div>
        `;
        weeklyForecastContainer.appendChild(dayCard);
    });
}

function getWeatherIcon(weather) {
    switch (weather) {
        case "Cloudy":
            return '<i class="fa fa-cloud fa-lg"></i>';
        case "Rainy":
            return '<img src="./Images/rainy.png" alt="Rainy Icon" style="width: 24px;"/>';
        case "Sunny":
            return '<i class="fa fa-sun-o fa-lg"></i>';
    }
}

function ShowWeatherIcon(weather)
{
    let iconHtml
    switch (weather)
    {
        case "Cloudy":
            iconHtml =  '<i class="fa fa-cloud fa-lg" style="color: white;"></i>';
            
            // Insert the HTML into the container
            weatherIcon.innerHTML = iconHtml;
            break;
        case "Rainy":
            iconHtml =  '<img src="./Images/rainy.png" style="color:white;"/>';
            weatherIcon.innerHTML = iconHtml;
           break;
        case "Sunny":
            iconHtml =  '<i class="fa fa-sun-o fa-lg" style="color: white;"></i>';
            weatherIcon.innerHTML = iconHtml;
           break;
    }
}

