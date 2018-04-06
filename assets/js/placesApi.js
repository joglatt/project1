        // latitude,longitude
        var loc = "40.939252,-74.124226";
        //google api key
        var apiKey = "AIzaSyC2HtqDacJ12JKefj4ooXduCb9YkmZczHg";
        //Kevin's cors workaround server
        var queryURL = "https://mighty-river-19291.herokuapp.com/cors"
        $.ajax({
            //post to kevins server
            method: "POST",
            url: queryURL,
            data: {
                url:"https://maps.googleapis.com/maps/api/place/textsearch/json?query=liquor+store&location=" + loc + "&type=liquor_store&radius=100&key=" + apiKey,
                //kevins key, expires at the end of cohort
                key:"8b5dcaf7cdfb9c46221d492eec6560c571d6ec218b2485c54075ab7840fa77f9"
            }
        }).then(function (response) {
            console.log(response);
        });
