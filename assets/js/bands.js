// testing
$(document).ready(function() {
  function searchBandsInTown(artist) {
    var queryURL =
      "https://rest.bandsintown.com/artists/" +
      artist +
      "/events?app_id=06eb39d6496f7c099e8fb74c69111298";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      for (var i = 0; i < response.length; i++) {
        // Logging and debuggin
        console.log("this is the artist name: " + response[i].lineup);
        console.log("this is the venue name: " + response[i].venue.name);
        console.log(
          "this is the venue latitude: " + response[i].venue.latitude
        );
        console.log(
          "this is the venue longitude: " + response[i].venue.longitude
        );
        console.log("this is the event link: " + response[i].url);
        // created a bunch of variables to populate the html as well as ready the lat and long for the liqour api
        // that we end up matching to
        var artistName = response[i].lineup;
        var venueName = response[i].venue.name;
        var venueLat = response[i].venue.latitude;
        var venueLong = response[i].venue.longitude;
        var eventURL = response[i].url;

        var city = response[i].venue.city;
        var state = response[i].venue.region;
        
        var locBand = { lat: venueLat, lng: venueLong };
        // modifying variables to create the date look we want
        var eventDate = response[i].datetime.substring(0, 10);
        var formattedEventDate = new Date( Date.parse(eventDate) );
        var newStr = formattedEventDate.toString();
        // logging and debugging
        console.log("String: " + newStr.substring(0,15));
        console.log("this is the date of show: " + eventDate);
        console.log("this is the formattted date: " + formattedEventDate);
        // these are plugging the results to html
        var p1 = $("<p>").text(venueName);
        var p3 = $("<p>").text(newStr.substring(0,15));
        var p4 = $("<p>").text(city + ', ' + state);
        //creates button next to results
        var mapsBut = $(
          "<a class= 'modal-trigger waves-effect waves-light btn blue'>Get Drunk</a>"
        );
        //button opens modal
        mapsBut.attr("href", "#modal1");
        //applies the latitude and longitude data for venue to button
        mapsBut.prop({ dataLat: venueLat, dataLong: venueLong });
        //on click function for maps button
        mapsBut.on("click", function() {
          //loc 1 is a blan object
          loc1 = {};
          // loc 1 latitude and longitude are floats of the latitutde and longitude output from bands in town
          loc1.lat = parseFloat($(this).prop("dataLat"));
          loc1.lng = parseFloat($(this).prop("dataLong"));
          // console.log(loc1);
          //materialize code for opening modal
          var elem = document.querySelector(".modal");
          var instance = M.Modal.init(elem);
          //initializes the map
          initMap();
        });
        //creates horizontal rule after each results
        var pB = $("<hr>");
        //creates link to buy tickets to evernts
        var p2 = $("<a>")
          .attr("href", eventURL)
          .text("Click to buy tickets");
          //appends all of it to feauted div
        $("#featured-div").append(p1, p4, p3, p2, mapsBut, pB);
      }
    });
  }

  // This event reads the artist entered to the search form when user hits search
  // button and calls the main bands events function
  $("#search-btn").on("click", function(event) {
    $("#featured-div").empty();
    event.preventDefault();
    var inputBand = $("#searchBand")
      .val()
      .trim();
    searchBandsInTown(inputBand);
  });
});
//empties out results
$("#clear-btn").on("click", function(event) {
  $("#featured-div").empty();
});
