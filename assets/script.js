var cityArray = JSON.parse(localStorage.getItem("cities")) || [];


var submitHandler = function (event) {
    event.preventDefault();
    var cityName = $(".city-search").val().trim();

    if(cityName === ""){
        return;
    }
    console.log(cityName);
    // console.log(tempeture.value)

    searchWeatherApi(cityName);
    cityArray.push(cityName);
    localStorage.setItem("cities", JSON.stringify(cityArray));
};


function searchWeatherApi(cityName) {

    var requestUrl = ('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=4e4346890dbabb049a4ba08f09b5e215');

    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var card = $("<div>").addClass("card").attr("style", "background-color: blue");
            var cardTitle = $("<h2>").addClass("cardTitle").text(data.name);
            card.append(cardTitle);
            $(".searched-cities").append(card);
        });
}

function fiveDay(requestLatLon) {
    var oneCallUrl = ('https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}')

     

}







$(".submit").on("click", submitHandler);