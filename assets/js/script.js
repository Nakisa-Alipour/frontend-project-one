var btnWatchTrailerEl = document.querySelector(".btn-watch");
var movieNameEl = document.querySelector("#movie-name");
var videos = document.querySelector("#videos");
var videoContainerEl = document.querySelector("#video-container");
var API_KEY = "AIzaSyCEBhpZEX-qkQ_sqW5O_cR7MS9-Pa7kaC0";

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

btnWatchTrailerEl.addEventListener("click", watchTrailer);
