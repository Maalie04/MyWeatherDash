var cityArray = JSON.parse(localStorage.getItem("cities")) || [];


var  searchHandler = function (event) {
    event.preventDefault();

var cityName = $(".city-search").val().trim();

function searchWeather(cityName){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+cityName + '&units=imperial&appid=4e4346890dbabb049a4ba08f09b5e215')
    .then(function(response) {
        return response.JSON;
    })
    .then(function(data){
        console.log(data);

        var card = $("<div>").addClass("card").attr("styled: background-color: blue");
        var cardTitle = $("h2").addClass("cardTitle").text(data.name);
        $("#weather-info").append(card.append(cardTitle));
    });
}

}

$(".submit").on("click", searchHandler);