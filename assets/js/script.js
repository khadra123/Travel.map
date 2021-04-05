// set variables 

var searchHistoryArray = [];
var search = document.querySelector('#search');
var searchBtn = document.querySelector('#countrySearchBtn');
var searchHistoryBtn = document.querySelector('#searchHistoryBtn');
var cityDisplayCard = document.querySelector('#cityCard');
var displayImageCard = document.querySelector('#imageCard');
var returnedCityResults = [];
var searchHistoryCard = document.querySelector('#historyCard');

var countries = "US"

fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/countries/" + countries + "/regions", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "9898e76638msh7fc219f72ab87d6p18d7ddjsn2c6c05aff44d",
		"x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
	}
})
.then(function(response) {
  return response.json();
})
.then(function(response) {
  console.log(response)
})
.catch(function(err) {
	console.error(err);
});
