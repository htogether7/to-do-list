function onGeoOK(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const API_KEY = "553caecbdef8323f61c0c18f08001514";
    console.log("You live in", lat, long);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`;
    fetch(url).then(response => response.json().then(data => {
        const weather = document.querySelector("#weather span:first-child");
        const city = document.querySelector("#weather span:last-child");
        weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        city.innerText = data.name;
    }));
}

function onGeoError(){
    alert("Can't find you!");
}



navigator.geolocation.getCurrentPosition(onGeoOK, onGeoError);