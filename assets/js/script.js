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
var userSearchCountry = 'Canada';
var countryCode;
var countryCodeTwo;

var searchHistoryArray = [];
var returnedCityResults = [];


//store country search to local storage 
if (!localStorage.getItem('recentSearch')) {   
	localStorage.setItem('recentSearch', JSON.stringify(searchHistoryArray));
	}
	var historySearchList = JSON.parse(localStorage.getItem('recentSearch'));  

//run this function on page load so containers are not empty 
getCountryCodeRegions()
recentSearchBtn()
//imageFunction()


//start of all functions 
function countrySearchFunction(){
	userSearchCountry = searchBtn.value;

	//Clear placeholder test and last input
	$(searchBtn).val('')
    $(searchBtn).attr('placeholder', "")

	//if statement to check if user has put in country name or not
	if(userSearchCountry) {
		//display country search name
		$('.display-country-name').text(userSearchCountry);
		//hid the error msg if present
		$('#inputErrorMsg').css("display", "none");
		$('.api-error-msg').css("display", "none");
		$('#list-results').html("");
		getCountryCodeRegions()

		//imageFunction()

		if (historySearchList) {
			historySearchList.push(userSearchCountry);
			localStorage.setItem('recentSearch', JSON.stringify(historySearchList));
		}
		recentSearchBtn()

	} else {
		//display error msg on html
		var incorrectInputMsg = $('<p>');
		incorrectInputMsg.text('Please enter validate country name');
		incorrectInputMsg.attr('id', 'inputErrorMsg');
		$("#searchForm").append(incorrectInputMsg);
	}
}

// function to get recent search data from local storage and create buttons
function recentSearchBtn() {
    
	$('#recent-search-btn').html('');
	
	for (i = 0; i < historySearchList.length; i++) {
		var btn = $('<button>');
		btn.addClass('btn btn-info my-sm-0 m-1');
		btn.attr('type', 'button');
		btn.text(historySearchList[i]);
		btn.attr('value', historySearchList[i]);
		btn.attr('href', '#results')
		btn.attr('onclick', "recentButtonHandler(this)");
		$('#recent-search-btn').append(btn);
	}
}

//function to excute when recent searches btn is clicked
function recentButtonHandler(identifier) {
	//console.log('hi');
	userSearchCountry = $(identifier).val();
	$('#list-results').html("");
	//console.log(userSearchCountry);
	getCountryCodeRegions()
	//imageFunction()
	window.scrollTo(0, 0);
}

	//api for image ----I have commented out your callback in countrySearchFunction (line 33) for testing purpose -chaitali
document.getElementById("countrySearchFunction").addEventListener("click", function(imageFunction));

	function imageFunction () {
		console.log(searchBtn.value)
		var  imageURL = ("https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=" + searchBtn.value  + "&pageNumber=1&pageSize=1&autoCorrect=true&safeSearch=true")
		fetch(imageURL, {
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
		//console.log(response);
		countryCode = response[0].alpha2Code;
		countryCodeTwo = response[0].alpha3Code
		
		//API call to get 3 regions from the country code 
		function getRegions() {
			//console.log(countryCode);
		
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

                    // add li with regions
                    var regions = $('<li>')
                        .addClass("list-group-item bg-dark text-white")
                        .text(response.data[i].name);

                    //appended with ul
                    $('#list-results').append(regions);
                }
                //console.log(returnedCityResults);
				//display regions on HTML
			})

			.catch(function(err) {
				console.error(err);
				var apiErrorMsg = $('<p>');
				apiErrorMsg.addClass('api-error-msg');
				apiErrorMsg.text('Sorry, we are not able to complete this search. Please search another country');
				$('#searchForm').append(apiErrorMsg);

				if (historySearchList) {
					historySearchList.pop(userSearchCountry);
					localStorage.setItem('recentSearch', JSON.stringify(historySearchList));
				}
				recentSearchBtn()

			})

		}
		//end of getRegions function
		getRegions()
		})

		.catch( function(err) {
			console.error(err);
			var apiErrorMsg = $('<p>');
			apiErrorMsg.addClass('api-error-msg');
			apiErrorMsg.text('Sorry, we are not able to complete this search. Please search another country');
			$('#searchForm').append(apiErrorMsg);

			if (historySearchList) {
				historySearchList.pop(userSearchCountry);
				localStorage.setItem('recentSearch', JSON.stringify(historySearchList));
			}
			recentSearchBtn()
		})

}
//end of getCountryCode function


 // enable draggable/sortable feature on list-group elements
$("#list-results, #list-saved, #list-other").sortable({
    // enable dragging across lists
    connectWith: $("#list-results, #list-saved, #list-other"),
    scroll: false,
    placeholder: "ui-state-highlight",
    opacity: 0.6,
    tolerance: "pointer",
    helper: "clone",
    activate: function(event) {
        $(this).addClass("dropover");
        $(".bottom-trash").addClass("bottom-trash-drag");
    },
    deactivate: function(event, ui) {
        $(this).removeClass("dropover");
        $(".bottom-trash").removeClass("bottom-trash-drag");
    },
    over: function(event) {
        //add class to sortables to show
        $(event.target).addClass("dropover-active");
    },
    out: function(event) {
        $(event.target).removeClass("dropover-active");
    },
    update: function() {
        console.log($(this).children());
    }
});     

// trash icon can be dropped onto
$("#trash").droppable({
    //accept these classes to drop into the trash bin
    accept: ".card .list-group-item",
    tolerance: "touch",

    // remove dragged element from the dom
    drop: function(event, ui) {
      // drop into
      ui.draggable.remove();
      $(".bottom-trash").removeClass("bottom-trash-active");
    },
    over: function(event, ui) {
      console.log(ui);
      $(".bottom-trash").addClass("bottom-trash-active");
    },
    out: function(event, ui) {
      $(".bottom-trash").removeClass("bottom-trash-active");
    }
});

 