var cityArray = JSON.parse(localStorage.getItem("cities")) || [];


var submitHandler = function (event) {
    event.preventDefault();
    var cityName = $(".city-search").val().trim();
    console.log(cityName);

    searchWeather(cityName);
    cityArray.push(cityName);
    localStorage.setItem("cities", JSON.stringify(cityArray));
};


function searchWeather(cityName) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=4e4346890dbabb049a4ba08f09b5e215')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var card = $("<div>").addClass("card").attr("style", "background-color: blue");
            var cardTitle = $("<h2>").addClass("cardTitle").text(data.name);
            card.append(cardTitle);
            $("#weather-info").append(card);
        });
}



$(".submit").on("click", submitHandler);