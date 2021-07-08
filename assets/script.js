var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
console.log(cityArray)
var cityList = document.querySelector('.previous-cities');


var currentWeatherTemp = document.querySelector('temp');
var currentWeatherWind = document.querySelector('wind');
var currentWeatherHumidity = document.querySelector('humidity');


if (cityArray.length > 0) {
    console.log(cityArray.length)
    for (var i = 0; i < cityArray.length; i++) {
        var card = $("<div>").addClass("card").attr("style", "background-color: blue");
        var cardTitle = $("<h2>").addClass("cardTitle").text(cityArray[i]);
        card.append(cardTitle);
        $(".searched-cities").append(card);
        console.log(cityArray[i])
        // cityList.append(cityArray[i])
        // li.appendChild(button)
    }

}

var submitHandler = function (event) {
    event.preventDefault();
    var cityName = $(".city-search").val().trim();

    if (cityName === "") {
        return;
    }
    console.log(cityName);
    // makes sure previous city isnt listed in the array
    if (cityArray.indexOf(cityName) === -1) {
        cityArray.push(cityName);
    }

    searchWeatherApi(cityName);
    localStorage.setItem("cities", JSON.stringify(cityArray));
    // console.log(cityArray);
};


function searchWeatherApi(cityName) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=4e4346890dbabb049a4ba08f09b5e215';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.main.temp);
            console.log(data.name);
            //  console.log(data);


            var card = $("<div>").addClass("card").attr("style", "background-color: blue");
            var cardTitle = $("<h2>").addClass("cardTitle").text(data.name);
            card.append(cardTitle);
            $(".searched-cities").append(card);

            var lis = document.getElementsByClassName(".temp");
            // document.li.innerHTML = "";
            console.log(data);
            $(".temp").text("");
            $(".cityTitle").text("");
            $(".wind").text("");
            $(".humidity").text("");
            $(".cityTitle").append(data.name);
            $(".temp").append("Temp: " + data.main.temp);
            $(".wind").append("Wind: " + data.wind.speed);
            $(".humidity").append("Humidiy: " + data.main.humidity);

            // console.log(data.temp)
            fiveDay(data.coord.lat, data.coord.lon);
        });
}

function fiveDay(lat, lon) {

    var oneCallUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=4e4346890dbabb049a4ba08f09b5e215`

    fetch(oneCallUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            for (var i = 1; i < 6; i++) {
                var daily = data.daily[i];
                console.log(daily);
                console.log(data)
                console.log(daily.temp.day);
                console.log(daily.uvi);
                console.log();

                $(".temp-f").text("");
                $(".wind-f").text("");
                $(".humidity-f").text("");
                $(".temp-f").append("Temp: " + daily.temp.day);
                $(".wind-f").append("Wind: " + daily.wind_gust);
                $(".humidity-f").append("Humidity: " + daily.humidity);

            }
            $(".uv-index").text("");
            $(".uv-index").append("UV-Index: " + daily.uvi);
        });

}




$(".submit").on("click", submitHandler);