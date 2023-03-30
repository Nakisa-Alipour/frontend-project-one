// Define variables to store DOM elements
var movieFormEl = document.querySelector('#movie-form');
var movieNameEl = document.querySelector('#movie-name');
var movieInfoContainerEl = document.querySelector('#movie-info-container')



// Define function to retrieve and display movie information
var formSubmitHandler = function (event){
    event.preventDefault();
    var movie = movieNameEl.value.trim();

    if (movie) {
       
        // Clear search input area and movie container elements after clicking search button
        movieNameEl.value = '';
        movieInfoContainerEl.innerHTML = '';

        getMovieInfo(movie);
        console.log(movie);
        
    } else {
        return;
    }
}

var getMovieInfo = function (movieName) {
    //Build URL for movie API
    var queryURL = 'http://www.omdbapi.com/?t=' + movieName + '&apikey=5cfa51ca';

    /// Send GET request to weather API
    fetch(queryURL)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
              console.log(data);
              console.log(data.Title);

              // Create list items with bullet points for movie info
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
              
            })
            }
        })
}




movieFormEl.addEventListener("submit", formSubmitHandler);