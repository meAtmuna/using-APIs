const background = document.getElementById("background");
const time = document.getElementById("time");
const weather = document.getElementById("weather");
const quote = document.getElementById("quote");
const date = document.getElementById("date");


async function getBackground() {
    const url = "https://api.nasa.gov/planetary/apod?api_key=l9vBqzGa1P0bQHfSQEuLM4jpxj2vhxx36EYcPaq8";
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        
        if (result.media_type !== "image") {
            console.log("APOD returned a non-image media type.");
            return null
        }

        return result.url;

    } catch (error) {
        console.log("Error ===>", error);
        return null;
    }
}

window.onload = function () {
    getBackground().then(function (imageUrl) {
        if (!imageUrl) return;

        console.log(imageUrl);
        
        if (background) {
            background.style.backgroundImage = `url('${imageUrl}')`;
        }
    });
};


function updateTime() {
    const dateObject = new Date();

    let ms = dateObject.getTime();
    let offset = dateObject.getTimezoneOffset() * 60 * 1000;
    ms = ms - offset;

    let msInDay = 24 * 60 * 60 * 1000;
    let currentMs = ms % msInDay;

    let hours = Math.floor(currentMs / (1000 * 60 * 60));

    let minutes = Math.floor(
        (currentMs % (1000 * 60 * 60)) / (1000 * 60)
    );
    
    let seconds = Math.floor(
        (currentMs % (1000 * 60)) / 1000
    );

    // console.log(ms);
    // console.log(offset);
    // console.log(hours, minutes, seconds);
    
    time.innerText = `${hours}:${minutes}:${seconds}`;
}

setInterval(() => {
    updateTime();
}, 1000);

async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    try {
        const response = await fetch(url);
        const result =  await response.json();

        return result;

    } catch (error) {
        console.log("weather API error", error);

        return null;
    }
}

navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    getWeather(lat, lon).then((data) => {
        if (!data) return;

        const temp = data.current_weather.temperature;
        const wind = data.current_weather.windspeed;

        weather.innerText = `${temp}°C ${wind} km/h`;
    })
});


fetch("https://dummyjson.com/quotes/random")
    .then(response => response.json())
    .then(data => {

        quote.innerText = data.quote;
        console.log(data);
    })
    .catch(error =>{
        console.log("Quote API error", error);
        
    })

function updateDate() {
    const datehere = new Date();

    const options = {
        weekday: "long",
        day:"numeric",
        month: "long",
        year: "numeric"
    }

    const formateDate = datehere.toLocaleDateString("en-us", options);
    date.innerText = formateDate;
}

updateDate();