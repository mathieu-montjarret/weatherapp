/*           Icons            */

const weatherIcons = {
    "Thunderstorm": "wi wi-thunderstorm",
    "Drizzle": "wi wi-sleet",
    "Rain": "wi wi-rain",
    "Snow": "wi wi-snow",
    "Mist": "wi wi-fog",
    "Haze": "wi wi-fog",
    "Smoke": "wi wi-fog",
    "Dust": "wi wi-sandstorm",
    "Fog": "wi wi-fog",
    "Sand": "wi wi-sandstorm",
    "Ash": "wi wi-smoke",
    "Squall": "wi wi-strong-wind",
    "Tornado": "wi wi-tornado",
    "Clear": "wi wi-day-sunny",
    "Clouds": "wi wi-day-cloudy",
}

/*          Uppercase          */

function capitalize(str){
    return str[0].toUpperCase() + str.slice(1);
}


/*           Weather           */

async function main(withIP = true){

    let city;

    if(withIP){

        const ip = await fetch('https://api.ipify.org/?format=json')
            .then(result => result.json())
            .then(json => json.ip)

        city = await fetch('http://ip-api.com/json/' + ip)
            .then(result => result.json())
            .then(json => json.city)
    }else{
        city = document.querySelector('#city').textContent;
    }

    const weather = await fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&APPID=[APIKEY]&lang=fr")
                        .then(result => result.json())
                        .then(json => json)

    displayWeatherInfos(weather)  
}

function displayWeatherInfos(data){
    const name = data.name;
    const temperature = data.main.temp;
    const temperature_feels_like = data.main.feels_like;
    const temperature_min = data.main.temp_min;
    const temperature_max = data.main.temp_max;
    const humidity = data.main.humidity;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    

    document.querySelector('#city').textContent = name;
    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#temperature_feels_like').textContent = Math.round(temperature_feels_like);
    document.querySelector('#temperature_min').textContent = Math.round(temperature_min);
    document.querySelector('#temperature_max').textContent = Math.round(temperature_max);
    document.querySelector('#humidity').textContent = (humidity);
    document.querySelector('#conditions').textContent = capitalize(description);

    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
}

const city = document.querySelector('#city');
const valid = document.querySelector('#valid');

city.addEventListener('click', () => {
    city.contentEditable = true;
});

valid.addEventListener('click', (e) => {
    
    e.preventDefault();
    city.contentEditable =false
    main(false);
})

main();  