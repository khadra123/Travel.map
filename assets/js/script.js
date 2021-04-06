// set variables 

var searchBtn = document.querySelector('#searchBtn');
var searchHistoryBtn = document.querySelector('#searchHistoryBtn');
var cityDisplayCard = document.querySelector('#cityCard');
var displayImageCard = document.querySelector('#imageCard');
var returnedCityResults = [];
var searchHistoryCard = document.querySelector('#historyCard');

var searchHistoryCard = document.querySelector('#historyCard');
var countryCode;
var countryCodeTwo;
//
var searchHistoryArray = [];
var returnedCityResults = [];



function getCountryCode() {

	//API call to Get country code from the country name 
	//var findCountryCode = searchBtn.val();
	var findCountryCode = 'Canada';

	fetch("https://restcountries-v1.p.rapidapi.com/name/" +  findCountryCode, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "9898e76638msh7fc219f72ab87d6p18d7ddjsn2c6c05aff44d",
			"x-rapidapi-host": "restcountries-v1.p.rapidapi.com"
		}
	})
	.then(function(response) {
		return response.json();
		//var CountryCode;
	})

	.then(function(response) {
		countryCode = response[0].alpha2Code;
		countryCodeTwo = response[0].alpha3Code
		console.log(countryCode);
		console.log(response);

		//API call to get 3 regions from the country code 
		function getRegions() {
			console.log(countryCode);
		
			fetch("https://wft-geo-db.p.rapidapi.com/v1/geo/countries/" + countryCode + "/regions?limit=3", {
				"method": "GET",
				"headers": {
					"x-rapidapi-key": "9898e76638msh7fc219f72ab87d6p18d7ddjsn2c6c05aff44d",
					"x-rapidapi-host": "wft-geo-db.p.rapidapi.com"
				}
			})
			
			.then(function(response) {
				return response.json();
				//var CountryCode;
			})

			.then(function(response) {
				console.log(response);
			})

			.catch(function(responce) {
				console.error(err);
			});

		}
		getRegions()
		})

		.catch( function(err) {
			console.error(err);
		})

}

getCountryCode()
