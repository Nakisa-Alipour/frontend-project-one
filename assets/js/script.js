var btnWatchTrailer = $(".btn-watch");

$(document).ready(function () {
  var API_KEY = "AIzaSyCEBhpZEX-qkQ_sqW5O_cR7MS9-Pa7kaC0";

  btnWatchTrailer.on("click", function (event) {
    event.preventDefault();

    // getting the value or text the user enters in the search box
    var searchQuery = $("#movie-name").val();
  });
});
