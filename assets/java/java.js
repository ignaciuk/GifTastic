$(document).ready(function() {
    var shapes = ["circle", "triangle", "square", "dodecahedron", "cube", "hypercube"];

    //event listener for click on add shape button
    $("#add-shape-btn").on("click", function() {
        event.preventDefault();
        if ($("#shape-input").val()){
        //gets user input value for new shape
        var newShape = $("#shape-input").val().trim();
        //adds new shape to shape array
        shapes.push(newShape);
        console.log(shapes);
        generateButtons();
    }
    });

    function generateButtons() {
        $("#buttons-display").empty();
        for (var i = 0; i < shapes.length; i++) {
            var a = $("<button>");
            a.addClass("shape-btn btn btn-light btn-outline-dark top-btn");
            a.attr("data-name", shapes[i]);
            a.text(shapes[i]);
            $("#buttons-display").append(a);
        }
    }

    $(document).on("click", ".shape-btn", function(){
        var shapeQuery = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + shapeQuery + "&api_key=0w8jsNW2s4LjeemTJe6MZblKQPPOr3Qz&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++){
                console.log(response);
                var gifDiv = $("<div class='card'>");
                var title = response.data[i].title;
                var showTitle = $("<p class='card-header'>").text("Title: " + title);
                gifDiv.append(showTitle);
                var rating = response.data[i].rating;
                var showRating = $("<p class='card-body card-text'>").text("Rating: " + rating);
                gifDiv.append(showRating);
                var gifURL = response.data[i].images.fixed_height_still.url;
                var gifFixedHeight = $("<img class='card-body gif'>").attr("src", gifURL);
                gifFixedHeight.attr("data-still", gifURL);
                gifFixedHeight.attr("data-animate", response.data[i].images.fixed_height.url);
                gifFixedHeight.attr("data-state", "still");
                gifDiv.append(gifFixedHeight);
                $("#gifs-display").prepend(gifDiv);
            }
        });

    });

    $(document).on("click", ".gif", function(){
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
      });

    generateButtons();

    // function displayShapeGifs() {
    //     var shape = $(this).attr("data-name");
    //     var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + shape + "&api_key=0w8jsNW2s4LjeemTJe6MZblKQPPOr3Qz&limit=10";
    //     console.log(queryURL);

    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"

    //       }).then(function(response) {
  
    //         // Creating a div to hold the movie
    //         var gifDiv = $("<div class='gif'>");
  
    //         // Storing the rating data
    //         var rating = response.data.rating;
  
    //         // Creating an element to have the rating displayed
    //         var pOne = $("<p>").text("Rating: " + rating);
  
    //         // Displaying the rating
    //         gifDiv.append(pOne);
  
    //         // Retrieving the URL for the image
    //         var gifURL = response.data.images.fixed_height.url;
  
    //         // Creating an element to hold the image
    //         var image = $("<img>").attr("src", gifURL);
  
    //         // Appending the image
    //         gifDiv.append(image);
  
    //         // Putting the entire movie above the previous movies
    //         $("#gifs-display").prepend(gifDiv);
    //       });
    // }

    // // Function for displaying shape gifs
    // function renderButtons() {

    // // Deleting the previous shapes prior to adding new shapes
    // // (this is necessary otherwise you will have repeat buttons)
    // $("#buttons-display").empty();

    // // Looping through the array of shapes
    //     for (var i = 0; i < shapes.length; i++) {

    //         // Then dynamically generating buttons for each shape in the array
    //         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    //         var a = $("<button>");
    //         // Adding a class of shape-btn to our button
    //         a.addClass("shape-btn");
    //         // Adding a data-attribute
    //         a.attr("data-name", shapes[i]);
    //         // Providing the initial button text
    //         a.text(shapes[i]);
    //         // Adding the button to the buttons-display div
    //         $("#buttons-display").append(a);
    //         console.log(shapes);
    //         console.log(a);
    //     }
    // }

    //       // This function handles events where a movie button is clicked
    //       $("#add-shape").on("click", function(event) {
    //         event.preventDefault();
    //         // This line grabs the input from the textbox
    //         var shape = $("#shape-input").val().trim();
    //         // Adding shape from the textbox to our array
    //         shapes.push(shape);
    //         //logs shapes currently in array
    //         console.log(shapes);
    //         // Calling renderButtons which handles the processing of our movie array
    //         renderButtons();
    //       });
    
    //       // Adding a click event listener to all elements with a class of "shape-btn"
    //       $(document).on("click", ".shape-btn", displayShapeGifs());
    
    //       // Calling the renderButtons function to display the intial buttons
    //       renderButtons();
    

});