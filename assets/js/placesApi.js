var map;
var infoWindow;



function initMap() {
    // Create the map.
    // var loc = { lat: -33.866, lng: 151.196 };
    var loc = loc1;
    console.log(loc);
    map = new google.maps.Map(document.getElementById('map'), {
        center: loc,
        zoom: 15
    });

    // Create the places service.
    var service = new google.maps.places.PlacesService(map);
    infoWindow = new google.maps.InfoWindow();



    // Perform a nearby search.
    service.nearbySearch(
        { location: loc, radius: 500, type: ['liquor_store'] },
        function (results, status, pagination) {
            if (status !== 'OK') return;

            for (var i = 0; i < results.length; i++) {

                request = {
                    placeId: results[i].place_id
                }

                service.getDetails(request, placeDetailsCallback);

                function placeDetailsCallback(place, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        createMarker(place);
                    }
                }
            }

        });
}

function createMarker(place) {

    //add markers
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
    });

    //expand marker when clicked
    google.maps.event.addListener(marker, 'click', function () {
        var name = "<p><strong> " + place.name + "</strong></br>";
        var address = "Store Address: " + place.formatted_address + "</p>";
        infoWindow.setContent(name+address);
        infoWindow.open(map, this);
    });



}
