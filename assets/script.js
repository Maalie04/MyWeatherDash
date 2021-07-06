var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
console.log(cityArray)
var cityList = document.querySelector('.previous-cities');


var currentWeatherTemp = document.querySelector('temp');
var currentWeatherWind = document.querySelector('wind');
var currentWeatherHumidity = document.querySelector('humidity');


if (cityArray.length > 0) {
    console.log(cityArray.length)
    for (var i = 0; i < cityArray.length; i++) {
      var buttonEl =  $('<button>').addClass('button').attr("style", "background-color: blue");
        var li = $('<li>').addClass('list-group-item');
        $('searched-cities').append(cityArray[i]);
        $('searched-cities').append(buttonEl);
        console.log(cityArray[i])
        cityList.append(cityArray[i])
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
            console.log(data);

            // if(!cityName){
            //     return;
            // }

            weatherTemp = data.temp;
            console.log(weatherTemp);
            var card = $("<div>").addClass("card").attr("style", "background-color: blue");
            var cardTitle = $("<h2>").addClass("cardTitle").text(data.name);
            card.append(cardTitle);
            $(".searched-cities").append(card);

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
                console.log(data.daily[i]);

                var daily = data.daily[i];
                 console.log(data.main)
            }
        });

}

function showWeatherData(data){
    var {temp, wind, humidity, uvi} = data.current;



}







$(".submit").on("click", submitHandler);