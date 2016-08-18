// jq check to be comment out later
$("#animal-buttons").html("jq link check");

// js check to be comment out later
document.getElementById("animal-gifs").innerHTML = "js link check";

// sudo 01: skeleton hard code a few buttons to test giphy api url
// with limit 10
$('button').on('click', function() {
	var animal = $(this).data('animal');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + 
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

// sudo 02: console.log Ajax
    $.ajax({
        url: queryURL,
        method: 'GET'
     })
     .done(function(response) {                
        console.log(queryURL)
        console.log(response)

// sudo 03: assign variable for response data to do for loop
// which displays animated giphy by the length of objects in the response.
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var animalDiv = $('<div class="item">')

            var p = $('<p>').text("Rating: " + results[i].rating);

            var animalImage = $('<img>');

            animalImage.attr('src', results[i].images.fixed_height.url);

            animalDiv.append(p)

            animalDiv.append(animalImage)

            $('#animal-gifs').prepend(animalDiv);

        }

     });
});

// sudo 04: add new button from input form with submit button.

// sudo 05: add still/animate codes.

// sudo 06: format layout to float left.

// sudo 07: bootstrap webpage layout and tab icon.

// sudo 08: change static buttons to arrays and change initial button
// values from animal to something unique.