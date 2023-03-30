var btnWatchTrailer = $(".btn-watch");
var video = "";
var videos = $("#videos");
$(document).ready(function () {
  var API_KEY = "AIzaSyCEBhpZEX-qkQ_sqW5O_cR7MS9-Pa7kaC0";

  btnWatchTrailer.on("click", function (event) {
    event.preventDefault();

    // getting the value or text the user enters in the search box
    var searchQuery = $("#movie-name").val();

    searchVideo(API_KEY, searchQuery, 10);
  });

  function searchVideo(key, search, max_results) {
    videos.empty();
    $.get(
      "https://www.googleapis.com/youtube/v3/search?key=" +
        key +
        "&type=video&part=snippet&maxResults=" +
        max_results +
        "&q=" +
        search,
      function (data) {
        console.log(data);

        data.items.forEach((item) => {
          video = `
            <iframe width="420" height="315" src="http://www.youtube.com/embed/${item.id.videoId}" frameborder="0" allowfullscreen></iframe>
            `;
          videos.append(video);
        });
      }
    );
  }
});
