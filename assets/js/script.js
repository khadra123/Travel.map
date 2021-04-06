// set variables 
var search = document.querySelector('#search');
var searchBtn = document.querySelector('#searchBtn');
var searchHistoryBtn = document.querySelector('#searchHistoryBtn');
var cityDisplayCard = document.querySelector('#cityCard');
var displayImageCard = document.querySelector('#imageCard');
var searchHistoryCard = document.querySelector('#historyCard');

//
var searchHistoryArray = [];
var returnedCityResults = [];

//start of all functions 

function countrySearchFunction(){
    function imageFucntion()
};
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