// set variables 

var search = document.querySelector('#search');
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

// storing user input country in this var
var userSearchCountry;

//start of all functions 

function countrySearchFunction(){
	console.log('hi');
	userSearchCountry = searchBtn.value;
	//if statement to check if user has put in country name or not
	if(userSearchCountry) {
    //imageFucntion()
	$('#inputErrorMsg').css("display", "none");
	getCountryCode()
	} else {
	var incorrectInputMsg = $('<p>');
	incorrectInputMsg.text('Please enter validate country name');
	incorrectInputMsg.attr('id', 'inputErrorMsg');
	$("#searchForm").append(incorrectInputMsg);
	
	}
}


	//api for image
	function imageFunction () {
		fetch("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" + searchBtn  + "&pageNumber=1&pageSize=1&autoCorrect=true&safeSearch=true", {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "edc80740bfmsh7af0ea3522b23e7p1413b9jsnbec35903712b",
			"x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
			}
		})
		.then(response => {
			console.log(response);
		})
			.catch(err => {
			console.error(err);
		});
	};


function getCountryCode() {

	//API call to Get country code from the country name 
	//var findCountryCode = 'Canada';

	fetch("https://restcountries-v1.p.rapidapi.com/name/" +  userSearchCountry, {
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
		//end of getRegions function
		getRegions()
		})

		.catch( function(err) {
			console.error(err);
		})

}
//end of getCountryCode function

