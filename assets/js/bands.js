// testing
$(document).ready(function () {

  function searchBandsInTown(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=06eb39d6496f7c099e8fb74c69111298";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        // Logging and debugging
        console.log('this is the artist name: ' + response[i].lineup);
        console.log('this is the venue name: ' + response[i].venue.name);
        console.log('this is the venue latitude: ' + response[i].venue.latitude);
        console.log('this is the venue longitude: ' + response[i].venue.longitude);
        console.log('this is the event link: ' + response[i].url);
        // created a bunch of variables to populate the html as well as ready the lat and long for the liqour api
        // that we end up matching to
        var artistName = response[i].lineup;
        var venueName = response[i].venue.name;
        var venueLat = response[i].venue.latitude;
        var venueLong = response[i].venue.longitude;
        var eventURL = response[i].url;
        // these are plugging the results to html
        var p1 = $('<p>').text(venueName);
        var pB = $('<hr>')
        var p2 = $('<a>').attr('href', eventURL).text('Click to buy tickets');
        $('#featured-div').append(p1, p2, pB);
      }
    });
  }

  // This event reads the artist entered to the search form when user hits search 
  // button and calls the main bands events function
  $("#search-btn").on("click", function (event) {
    event.preventDefault();
    var inputBand = $("#searchBand").val().trim();
    searchBandsInTown(inputBand);
  });
});  