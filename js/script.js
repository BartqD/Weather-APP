const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid= "YOUR KEY" ' // place to enter the api key
const API_UNITS = '&units=metric'

const getWeather = () => {
	const city = input.value || 'London'
	const URL = API_LINK + city + API_KEY + API_UNITS
	axios
		.get(URL)
		.then(res => {
			const temp = res.data.main.temp
			const hum = res.data.main.humidity
			const status = Object.assign({}, ...res.data.weather)

			if (200 <= status.id && status.id <= 232) {
				photo.setAttribute('src', './img/thunderstorm.png')
			} else if (300 <= status.id && status.id <= 321) {
				photo.setAttribute('src', './img/drizzle.png')
			} else if (500 <= status.id && status.id <= 531) {
				photo.setAttribute('src', './img/rain.png')
			} else if (600 <= status.id && status.id <= 622) {
				photo.setAttribute('src', './img/ice.png')
			} else if (status.id === 741) {
				photo.setAttribute('src', './img/fog.png')
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png')
			} else if (801 <= status.id && status.id <= 804) {
				photo.setAttribute('src', './img/cloud.png')
			} else {
				photo.setAttribute('src', './img/unknown.png')
			}

			cityName.textContent = res.data.name
			temperature.textContent = Math.floor(temp) + '°C'
			humidity.textContent = hum + '%'
			weather.textContent = status.main
            warning.textContent = ''
            input.value = ''
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta!'))
}
getWeather()

const enterKeyCheck = e => {
	if (e.key === 'Enter') {
		getWeather()
	}
}

input.addEventListener('keyup', enterKeyCheck)
button.addEventListener('click', getWeather)
