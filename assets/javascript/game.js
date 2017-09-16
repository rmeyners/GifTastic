var topics = ["BMW", "Audi", "Volkswagen", "Mercedes-Benz", "Ford", "Chevy", "Toyota", "Lexus", "Honda"];

function displayInfo() {
    $("#carGifs").empty();
    var car = $(this).attr("data-name");
    var api = "https://api.giphy.com/v1/gifs/search?q=" + car + "&api_key=dd77134347974c7688ab9630959cc7b1";
    $.ajax({
        url: api,
        method: "GET"
    }).done(function(response) {
        var results = response.data;
        
        for (var i = 0; i < 10; i++) {
            var gifDiv = $("<div class='item'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);
            var carImage = $("<img class='pause'>");
            carImage.attr({
                src: results[i].images.fixed_height_still.url,
                "data-still": results[i].images.fixed_height_still.url,
                "data-animate": results[i].images.fixed_height.url,
                "data-state": "still",
            });
            gifDiv.append(p);
            gifDiv.append(carImage);
            gifDiv.addClass("gifs");
            $("#carGifs").prepend(gifDiv);
        }
        
        $(".pause").on("click", function() {
            var state = $(this).attr("data-state");
            if (state == "still") {
                $(this).attr("src", $(this).data("animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).data("still"));
                $(this).attr("data-state", "still");
            }
        })
    })
}

function addButton() {
    $("#carButtons").empty();
    $.each(topics, function(index, element) {
        var button = $("<button/>").addClass("car").attr("data-name", element).text(element);
        $("#carButtons").append(button);
    });
};
$("#addCar").on("click", function() {
        var car = $("#carAdd").val().trim();
        topics.push(car);
        addButton();
        
        $("#carAdd").val("");
        return false;
    })
    
$(document).on("click", ".car", displayInfo);
addButton();