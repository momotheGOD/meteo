function refreshWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	temperatureElement.innerHTML = Math.round(temperature);
	let cityElement = document.querySelector("#city");
	let speedElement = document.querySelector("#speed");
	let date = new Date(response.data.time * 1000);
	let timeElement = document.querySelector("#time");
	let icon = document.querySelector("#weather-icon");
	icon.innerHTML = `<img src="${response.data.condition.icon_url}" alt="" class="icon">`;

	cityElement.innerHTML = response.data.city;

	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = response.data.condition.description;

	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

	speedElement.innerHTML = `${response.data.wind.speed}km/h`;
	timeElement.innerHTML = formatDate(date);
	console.log(response.data);
}

function formatDate(date) {
	let week = [
		"Saturday",
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
	];
	let day = week[date.getDay()];
	let hours = date.getHours();
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
	//make api call and update the interface
	let apiKey = "4974a3883e1ocea63dc4b19t8940f018";
	let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

	//api call
	axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
	event.preventDefault();
	let searchInput = document.querySelector("#search-form-input");
	let city = document.querySelector("#city");

	searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#search-form-element");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");

function displayForecast() {
	let forecastElement = document.querySelector("#forecast");
	let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
	let forecastHtml = "";
	days.forEach(function (day) {
		forecastHtml =
			forecastHtml +
			`<div class="weather-forecast-day">
	<div class="weather-forecast-date">${day}</div>
	<div class="weather-forecast-icon">⛅</div>
	<div class="weather-forecast-temperatures">
		<div class="weather-forecast-temperature"><strong>15°</strong></div>
		<div class="weather-forecast-temperature">9°</div>
	</div>
	</div>`;
	});
	forecastElement.innerHTML = forecastHtml;
}
displayForecast();