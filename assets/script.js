var cityArray = JSON.parse(localStorage.getItem("cities")) || [];
console.log(cityArray)
var cityList = document.querySelector('.previous-cities');

if(cityArray.length > 0){
    console.log(cityArray.length)
    for(var i=0; i<cityArray.length; i++){
        var li = $('<li>').addClass('list-group-item').Html('boston');
        
        console.log("Hello")
       cityList.append(li)
    }

}

var weatherTemp = document.querySelector('temp');
var weatherWind = document.querySelector('wind');
var weatherHumidity = document.querySelector('humidity');


var submitHandler = function (event) {
    event.preventDefault();
    var cityName = $(".city-search").val().trim();

    if (cityName === "") {
        return;
    }
    console.log(cityName);
    // makes sure previous city isnt listed in the array
   if(cityArray.indexOf(cityName) === -1){
       cityArray.push(cityName);

   }



    searchWeatherApi(cityName);
    localStorage.setItem("cities", JSON.stringify(cityArray));
    console.log(cityArray);
};


function searchWeatherApi(cityName) {

    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=4e4346890dbabb049a4ba08f09b5e215';

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // if(cityName !== data.name){
            //     return;
            // }
            var card = $("<div>").addClass("card").attr("style", "background-color: blue");
            var cardTitle = $("<h2>").addClass("cardTitle").text(data.name);
            card.append(cardTitle);
            // $(".searched-cities").append(card);

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



            }


        });

}







$(".submit").on("click", submitHandler);