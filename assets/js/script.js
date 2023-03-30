// Define variables to store DOM elements
var movieFormEl = document.querySelector("#movie-form");
var movieNameEl = document.querySelector("#movie-name");
var movieInfoContainerEl = document.querySelector("#movie-info-container");
var btnWatchTrailerEl = document.querySelector(".btn-watch");
var videos = document.querySelector("#videos");
var videoContainerEl = document.querySelector("#video-container");
var API_KEY = "AIzaSyCEBhpZEX-qkQ_sqW5O_cR7MS9-Pa7kaC0";

// Define function to retrieve and display movie information
var formSubmitHandler = function (event) {
  event.preventDefault();
  var movie = movieNameEl.value.trim();

  if (movie) {
    // Clear search input area and movie container elements after clicking search button
    movieNameEl.value = "";
    movieInfoContainerEl.innerHTML = "";

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
  event.preventDefault();

  // getting the value or text the user enters in the search box
  var searchQuery = movieNameEl.value.trim();

  if (searchQuery) {
    searchVideo(API_KEY, searchQuery, 10);
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
movieFormEl.addEventListener("submit", formSubmitHandler);
btnWatchTrailerEl.addEventListener("click", watchTrailer);
