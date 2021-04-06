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

//Country Regions array

var cities = [];

var 

var loadCities = function(cities){

    cities= JSON.parse(localStorage.getItem("cities"));

    if(!cities){
        cities ={
            countries:[],
            countriesSearched:[],
            savedCountries:[],
            visitedCountries:[]
        };
    }

    $.each(cities, function(list, arr){
        console.log(list, arr);

        arr.forEach(function(cities){
            createcountry()
        })
    })
};

/* // enable draggable/sortable feature on list-group elements
$(".card .list-group").sortable({
    // enable dragging across lists
    connectWith: $(".card .list-group"),
    scroll: false,
    tolerance: "pointer",
    helper: "clone",
    activate: function(event, ui) {
      $(this).addClass("dropover");
      $(".bottom-trash").addClass("bottom-trash-drag");
    },
    deactivate: function(event, ui) {
      $(this).removeClass("dropover");
      $(".bottom-trash").removeClass("bottom-trash-drag");
    },
    over: function(event) {
      $(event.target).addClass("dropover-active");
    },
    out: function(event) {
      $(event.target).removeClass("dropover-active");
    },
    update: function() {
      var tempArr = [];
  
      // loop over current set of children in sortable list
      $(this)
        .children()
        .each(function() {
          // save values in temp array
          tempArr.push({
            text: $(this)
              .find("p")
              .text()
              .trim(),
            date: $(this)
              .find("span")
              .text()
              .trim()
          });
        });
  
      // trim down list's ID to match object property
      var arrName = $(this)
        .attr("id")
        .replace("list-", "");
  
      // update array on tasks object and save
      tasks[arrName] = tempArr;
      saveTasks();
    }
  });
 */