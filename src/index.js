function refreshWeather(response) {
	let temperatureElement = document.querySelector("#temperature");
	let temperature = response.data.temperature.current;
	temperatureElement.innerHTML = Math.round(temperature);
	let cityElement = document.querySelector("#city");
	let speedElement = document.querySelector("#speed");
	let date = new Date(response.data.time * 1000);
	let timeElement = document.querySelector("#time");

	cityElement.innerHTML = response.data.city;

	let descriptionElement = document.querySelector("#description");
	descriptionElement.innerHTML = response.data.condition.description;

	let humidityElement = document.querySelector("#humidity");
	humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

	speedElement.innerHTML = `${response.data.wind.speed}km/h`;
	timeElement.innerHTML = formatDate(date);
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
