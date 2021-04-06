// set variables 
var search = document.querySelector('#search');
var searchBtn = document.querySelector('#countrySearchBtn');
var searchHistoryBtn = document.querySelector('#searchHistoryBtn');
var cityDisplayCard = document.querySelector('#cityCard');
var displayImageCard = document.querySelector('#imageCard');
var searchHistoryCard = document.querySelector('#historyCard');

var searchHistoryArray = [];
var returnedCityResults = [];

//Country Regions array

var cities = [];

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