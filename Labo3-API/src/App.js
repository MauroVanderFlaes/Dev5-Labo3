export default class App {
    constructor() {
        this.getLocation();
    }

    getLocation() {
        navigator.geolocation.getCurrentPosition(
            this.showPosition.bind(this),
            this.showError
            );
    }
    
    showPosition(position) {
        console.log(position);
        let x = position.coords.latitude;
        let y = position.coords.longitude;
        this.getWeather(x, y);
        this.getJoke();
    }

    getWeather(x, y) {
        //url: https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current_weather=true&forecast_days=1
        //fetch this url, and log the result
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" +
              x +
              "&longitude=" +
              y +
              "&hourly=temperature_2m&current_weather=true&forecast_days=1"
          )
            .then((response) => response.json())
            .then((data) => {
                document.querySelector("h2").innerHTML = 
                data.current_weather.temperature + " °C";
            })
            .catch((error) => console.log(error));
    }

    showError(error) {
        console.log(error);
    }

    getJoke(){
        //url: https://v2.jokeapi.dev/joke/Any
        //fetch this url, and log the result
        fetch("https://v2.jokeapi.dev/joke/Any")
        .then((response) => response.json())
        .then((data) => {
            document.querySelector("p").innerHTML = 
            data.setup + "<br>" + data.delivery;
        })
        .catch((error) => console.log(error));
    }

}