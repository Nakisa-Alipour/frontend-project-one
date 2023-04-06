// Define variables to store DOM elements
var movieFormEl = document.querySelector("#movie-form");
var movieNameEl = document.querySelector("#movie-name");
var movieInfoContainerEl = document.querySelector("#movie-info-container");
var btnWatchTrailerEl = document.querySelector(".btn-watch");
var videos = document.querySelector("#videos");
var videoContainerEl = document.querySelector("#video-container");
var API_KEY = "AIzaSyCo8CM04wQGlnvixKhuwAVIpMrMmviTQCA";

var movieSearchHistoryEl = document.querySelector("#movie-form-history");
var buttonElement = document.getElementsByClassName("blah");
var movieArray = JSON.parse(localStorage.getItem("searched-movies")) || [];

var createSearchHistoryButton = function () {
  var getArray = JSON.parse(localStorage.getItem("searched-movies")) || [];
  movieSearchHistoryEl.innerHTML = "";
  for (i = 0; i < getArray.length; i++) {
    createSearchHistoryButtons(getArray[i]);
  }
};

// Define function to retrieve and display movie information
var formSubmitHandler = function (event) {
  if (event) event.preventDefault();
  var movie = movieNameEl.value.trim();
  var movieL = movie.toLowerCase();

  if (movie) {
    // Clear search input area and movie container elements after clicking search button
    movieInfoContainerEl.innerHTML = "";
    videoContainerEl.innerHTML = "";

    if (!movieArray.includes(movie)) {
      movieArray.push(movieL);
      localStorage.setItem("searched-movies", JSON.stringify(movieArray));
    }

    createSearchHistoryButton();
    getMovieInfo(movie);
    searchVideo(API_KEY, movie, 20);
  } else {
    return;
  }
};

var getMovieInfo = function (movieName) {
  //Build URL for movie API
  var queryURL = "https://www.omdbapi.com/?t=" + movieName + "&apikey=5cfa51ca";

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

function watchTrailer(event) {
  if (event) event.preventDefault();
  console.log("here");
  // getting the value or text the user enters in the search box
  var searchQuery = movieNameEl.value.trim();
  var searchQueryL = searchQuery.toLowerCase();

  movieNameEl.value = "";
  videos.innerHTML = "";
  if (searchQueryL) {
    searchVideo(API_KEY, searchQueryL, 20);
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
          videoEl.classList = "youtube-video col s12";
          if (
            data.items[i].snippet.title.includes("trailer") ||
            data.items[i].snippet.title.includes("Trailer") ||
            data.items[i].snippet.title.includes("TRAILER")
          ) {
            videoEl.innerHTML += `
            <iframe width="320" height="215" src="http://www.youtube.com/embed/${data.items[i].id.videoId}" frameborder="0" allowfullscreen></iframe>
            `;
            videos.append(videoEl);
            videoContainerEl.append(videos);
          }
        }
      });
    }
  });
}

//When an item is added to the array, create a button for it and attach it to the Search History Form
var createSearchHistoryButtons = function (movie) {
  var buttonEl = document.createElement("button");
  buttonEl.setAttribute("type", "submit");
  buttonEl.setAttribute("class", "btn-small col s12 blue darken-2");
  buttonEl.textContent = movie;
  movieSearchHistoryEl.appendChild(buttonEl);
  buttonEl.addEventListener("click", searchHistoryClick);
};

//Search History Button Click

var searchHistoryClick = function (event) {
  event.preventDefault();
  var movieName = event.target.textContent;
  movieInfoContainerEl.innerHTML = "";
  videos.innerHTML = "";
  getMovieInfo(movieName);
  searchVideo(API_KEY, movieName, 20);
};

createSearchHistoryButton();
movieFormEl.addEventListener("submit", formSubmitHandler);
btnWatchTrailerEl.addEventListener("click", watchTrailer);