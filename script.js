const background = document.getElementById("background");
const time = document.getElementById("time");


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