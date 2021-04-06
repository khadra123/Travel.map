// set variables 

var search = document.querySelector('#search');
var searchBtn = document.querySelector('#searchBtn');
var searchHistoryBtn = document.querySelector('#searchHistoryBtn');
var cityDisplayCard = document.querySelector('#cityCard');
var displayImageCard = document.querySelector('#imageCard');
var returnedCityResults = [];
var searchHistoryCard = document.querySelector('#historyCard');

var searchHistoryCard = document.querySelector('#historyCard');
// storing user input country in this var after onclick event
var userSearchCountry;
var countryCode;
var countryCodeTwo;
//
var searchHistoryArray = [];
var returnedCityResults = [];

//store country search to local storage 
if (!localStorage.getItem('recentSearch')) {   
	localStorage.setItem('recentSearch', JSON.stringify(searchHistoryArray));
	}
	var historySearchList = JSON.parse(localStorage.getItem('recentSearch'));  



//start of all functions 

function countrySearchFunction(){

	userSearchCountry = searchBtn.value;

	//if statement to check if user has put in country name or not
	if(userSearchCountry) {
		//display country search name
		$('.display-country-name').text(userSearchCountry);
		//hid the error msg if present
		$('#inputErrorMsg').css("display", "none");

		getCountryCodeRegions()

		//imageFunction()

		//add new search to local storage

		//display recent searchs in navbar
		var recentSearchNavBtn = $('<a>').html('class="nav-link" href="#recent-search-container" Recent Searchs');
		recentSearchNavBtn.attr('href', '#recent-search-container');
		recentSearchNavBtn.addClass('nav-link');
		recentSearchNavBtn.text('Recent Searchs');
		$('.navbar-nav').append(recentSearchNavBtn);

		//display recent section on html
		$('#recent-search-btn').css('display', 'block');
		$('#recent-search-container').css('display', 'block');


		if (historySearchList) {
			historySearchList.push(userSearchCountry);
			localStorage.setItem('recentSearch', JSON.stringify(historySearchList));
		}
		

	} else {
		//display error msg on html
		var incorrectInputMsg = $('<p>');
		incorrectInputMsg.text('Please enter validate country name');
		incorrectInputMsg.attr('id', 'inputErrorMsg');
		$("#searchForm").append(incorrectInputMsg);
	
	}
	recentSearchBtn()
}

	// function to get recent search data from local storage and create buttons
	function recentSearchBtn() {
    
		$('#past-search-btn').html('');
	
		for (i = 0; i < historySearchList.length; i++) {
			var btn = $('<button>');
			btn.addClass('btn btn-info m-2 my-sm-0');
			btn.attr('type', 'button');
			btn.text(historySearchList[i]);
			btn.attr('data-city', historySearchList[i]);
			$('#recent-search-btn').append(btn);
		}
	}

	//api for image ----I have commented out your callback in countrySearchFunction (line 33) for testing purpose -chaitali
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

//Nested API call to get country code first then based on code get country regions
function getCountryCodeRegions() {

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
		console.log(response);
		countryCode = response[0].alpha2Code;
		countryCodeTwo = response[0].alpha3Code
		
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

				for (var i = 0; i < 3; i++) {
					returnedCityResults.push(response.data[i].name);
					var regions = $('<h5>');
					regions.text(response.data[i].name);
					$('#display-result-regions').append(regions);
				}
				console.log(returnedCityResults);
				//display regions on HTML
			})

			.catch(function(err) {
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

