// Define variables to store DOM elements
var movieFormEl = document.querySelector("#movie-form");
var movieNameEl = document.querySelector("#movie-name");
var movieInfoContainerEl = document.querySelector("#movie-info-container");
var btnWatchTrailerEl = document.querySelector(".btn-watch");
var videos = document.querySelector("#videos");
var videoContainerEl = document.querySelector("#video-container");
var API_KEY = "AIzaSyCEBhpZEX-qkQ_sqW5O_cR7MS9-Pa7kaC0";

var movieSearchHistoryEl = document.querySelector("#movie-form-history");
var buttonElement = document.getElementsByClassName("blah");
console.log(buttonElement);
var movieArray = JSON.parse(localStorage.getItem('searched-movies')) || [];
var uniqueArray;


// Define function to retrieve and display movie information
var formSubmitHandler = function (event) {
  if (event) event.preventDefault();
  var movie = movieNameEl.value.trim();
  var movieL = movie.toLowerCase();

  if (movie) {
    // Clear search input area and movie container elements after clicking search button
    movieNameEl.value = "";
    movieInfoContainerEl.innerHTML = "";

    movieArray.push(movieL);
    console.log(movieArray);
  
    uniqueArray = [...new Set(movieArray)];
    console.log(uniqueArray);
    localStorage.setItem('searched-movies', JSON.stringify(uniqueArray));
  
    for ( i = 0; i < uniqueArray.length; i++) {
      var getArray = JSON.parse(localStorage.getItem('searched-movies') || '[]');
      console.log(getArray)
      createSearchHistoryButtons(getArray[i]);
    }

    getMovieInfo(movie);
    console.log(movie);
  } else {
    return;
  }
};

var getMovieInfo = function (movieName) {
  //Build URL for movie API
  var queryURL = "http://www.omdbapi.com/?t=" + movieName + "&apikey=5cfa51ca";

  // Send GET request to weather API
  fetch(queryURL).then(function (response) {
    if (response.ok) {
      console.log(response);
      response.json().then(function (data) {
        console.log(data);
        console.log(data.Title);

        // Create list items with bullet points
        var movieNameItem = document.createElement("li");
        movieNameItem.textContent = "Movie Name: " + data.Title;

        var movieYearItem = document.createElement("li");
        movieYearItem.textContent = "Year: " + data.Year;

        var movieGenreItem = document.createElement("li");
        movieGenreItem.textContent = "Genre: " + data.Genre;

        var movieDirectorItem = document.createElement("li");
        movieDirectorItem.textContent = "Director: " + data.Director;

        var movieActorsItem = document.createElement("li");
        movieActorsItem.textContent = "Actors: " + data.Actors;

        var movieRatingItem = document.createElement("li");
        movieRatingItem.textContent = "IMDB Rating: " + data.imdbRating;

        // Create unordered list element to hold list items
        var movieInfoList = document.createElement("ul");

        //append created elements to the movie info container to diplay
        movieInfoContainerEl.appendChild(movieNameItem);
        movieInfoContainerEl.appendChild(movieYearItem);
        movieInfoContainerEl.appendChild(movieGenreItem);
        movieInfoContainerEl.appendChild(movieDirectorItem);
        movieInfoContainerEl.appendChild(movieActorsItem);
        movieInfoContainerEl.appendChild(movieRatingItem);
      });
    }
  });
};

////////////////////////////////////////////

function watchTrailer(event) {
if (event) event.preventDefault();

  // getting the value or text the user enters in the search box
  var searchQuery = movieNameEl.value.trim();
  var searchQueryL = searchQuery.toLowerCase();

  movieNameEl.value = "";
  videos.innerHTML = "";

  movieArray.push(searchQueryL);
  console.log(movieArray);

  uniqueArray = [...new Set(movieArray)];
  console.log(uniqueArray);
  localStorage.setItem('searched-movies', JSON.stringify(uniqueArray));

  for ( i = 0; i < uniqueArray.length; i++) {
    var getArray = JSON.parse(localStorage.getItem('searched-movies') || '[]');
    console.log(getArray)
    createSearchHistoryButtons(getArray[i]);
  }


  if (searchQueryL) {
    searchVideo(API_KEY, searchQueryL, 2);
  }
}
function searchVideo(key, search, max_results) {
  var apiUrl =
    "https://www.googleapis.com/youtube/v3/search?key=" +
    key +
    "&type=video&part=snippet&maxResults=" +
    max_results +
    "&q=" +
    search;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);

        for (var i = 0; i < data.items.length; i++) {
          var videoEl = document.createElement("div");
          videoEl.classList = "youtube-video";
          videoEl.innerHTML += `
            <iframe width="420" height="315" src="http://www.youtube.com/embed/${data.items[i].id.videoId}" frameborder="0" allowfullscreen></iframe>
            `;
          videos.append(videoEl);
          videoContainerEl.append(videos);
        }
      });
    }
  });
}


////Search History 

//If user search is obtained, add it to an array
//function viewSearchHistory (event) {
//  event.preventDefault(); 
//  var movieSearch = movieNameEl.value.trim();
//
//  if (movieSearch) {
//    keepTab();
//  }
//}

//When an item is added to the array, create a button for it and attach it to the Search History Form
//var createSearchHistoryButtons = function (movie) {
//  var buttonEl = document.createElement('button');
//  buttonEl.setAttribute ('type', 'submit');
//  buttonEl.setAttribute ('class', 'btn btn-info mt-4 blah');
//  buttonEl.textContent = movie;
//  movieSearchHistoryEl.appendChild(buttonEl);
//  buttonEl.addEventListener('click', searchHistoryClick);
//};

var createSearchHistoryButtons = function (movie) {

  // Check if button already exists
  for (var i = 0; i < buttonElement.length; i++) {
    if (buttonElement[i].textContent === movie) {
      // If button already exists, do not create a new one
      return;
    }
  }

  var buttonEl = document.createElement('button');
  buttonEl.setAttribute ('type', 'submit');
  buttonEl.setAttribute ('class', 'btn btn-info mt-4 blah');
  buttonEl.textContent = movie;
  movieSearchHistoryEl.appendChild(buttonEl);
  buttonEl.addEventListener('click', searchHistoryClick);
};

//Search History Button Click

var searchHistoryClick = function (event) {
  console.log("hehehaha");
  event.preventDefault();
  var movieName = event.target.textContent
  console.log(movieName);
  movieInfoContainerEl.innerHTML = "";
  getMovieInfo(movieName);
  videos.innerHTML = "";
  searchVideo(API_KEY, movieName, 2);
  //movieNameEl.value = "";


  //formSubmitHandler();
  //watchTrailer();
}

movieFormEl.addEventListener("submit", formSubmitHandler);
btnWatchTrailerEl.addEventListener("click", watchTrailer);
//for (let index = 0; index < buttonElement.length; index++) {
//  buttonElement[index].addEventListener("click", searchHistoryClick);
//}

//If history button is pressed, invoke both functions at the same time 
//buttonEl.addEventListener('click', formSubmitHandler);
//buttonEl.addEventListener('click', watchTrailer)
//
for ( i = 0; i < movieArray.length; i++) {
  createSearchHistoryButtons(movieArray[i]);
}