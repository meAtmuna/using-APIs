const background = document.getElementById("background");


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