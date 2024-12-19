document.getElementById('getWeatherBtn').addEventListener('click', function() {
    // Получаем значение города и выбранный тип прогноза
    const city = document.getElementById('city').value;
    const forecastType = document.getElementById('forecastType').value;

    if (city) {
        // Скрываем блоки с предыдущими результатами
        document.getElementById('weatherResult').style.display = 'none';
        document.getElementById('weatherWeeklyResult').style.display = 'none';
        document.getElementById('forecastTitle').style.display = 'none';

        // Отправляем запрос на сервер в зависимости от типа прогноза
        if (forecastType === 'one_day') {
            getWeather(city);  // Запрашиваем погоду на один день
        } else if (forecastType === 'weekly') {
            getWeatherWeekly(city);  // Запрашиваем прогноз на неделю
        }
    } else {
        alert("Please enter a city name!");
    }
});

function getWeather(city) {
    // Отправка GET-запроса на сервер для получения погоды на один день
    fetch(`/get_weather/?city=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Отображаем данные о погоде
                document.getElementById('weatherResult').style.display = 'block';
                document.getElementById('cityName').textContent = data.data.city;
                document.getElementById('temperature').textContent = data.data.temperature;
                document.getElementById('description').textContent = data.data.description;
                document.getElementById('windSpeed').textContent = data.data.wind_speed;
                document.getElementById('cloudiness').textContent = data.data.cloudiness;
                document.getElementById('weatherIcon').src = `http://openweathermap.org/img/wn/${data.data.icon}.png`;
            } else {
                alert(data.error || "Error occurred while fetching weather data.");
            }
        })
        .catch(error => alert("An error occurred: " + error));
}

function getWeatherWeekly(city) {
    // Отправка GET-запроса на сервер для получения прогноза на неделю
    fetch(`/get_weather_weekly/?city=${city}`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Отображаем данные о прогнозе на неделю
                document.getElementById('forecastTitle').style.display = 'block';
                document.getElementById('weatherWeeklyResult').style.display = 'block';
                document.getElementById('weatherWeeklyResult').innerHTML = '';

                data.data.forEach(forecast => {
                    const forecastElement = document.createElement('div');
                    forecastElement.classList.add('forecast-item');
                    forecastElement.innerHTML = `
                        <h3>${forecast.date}</h3>
                        <p><strong>Temperature:</strong> ${forecast.temperature} °C</p>
                        <p><strong>Description:</strong> ${forecast.description}</p>
                        <p><strong>Wind Speed:</strong> ${forecast.wind_speed} m/s</p>
                        <p><strong>Cloudiness:</strong> ${forecast.cloudiness}%</p>
                        <img src="http://openweathermap.org/img/wn/${forecast.icon}.png" alt="Weather Icon">
                    `;
                    document.getElementById('weatherWeeklyResult').appendChild(forecastElement);
                });
            } else {
                alert(data.error || "Error occurred while fetching weekly weather data.");
            }
        })
        .catch(error => alert("An error occurred: " + error));
}
