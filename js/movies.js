$(document).ready(function(){
    var inputMovie = document.getElementById("input-movie-text"),
        getMovieButton = document.getElementById("fetch-movie-button"),
      
        movieList = document.getElementById("movie-list"),
        clearButton = document.getElementById("clear-button"),
        movieUri = "http://www.omdbapi.com/?s={{title}}&y=&plot=short&r=json",
        newMovieUri;

    var renderList = function(eventData){
        movieList.innerHTML = "";
        if(!eventData){
            console.log("Error: No data passed to renderList method.");
            alert("Didn't find any movies.");
            return false;
        }
//  var newItem = document.createElement("li"),
//                 newAnchor = document.createElement("a");

//                 newItem.classList.add("list-group-item");

//                 newAnchor.href = eventData.Poster;

//                 newAnchor.innerText = eventData.Title;

//                 newItem.appendChild(newAnchor);

//                 movieList.appendChild(newItem);
        eventData.Search.forEach(function(event){
            var newItem = document.createElement("li"),
                newAnchor = document.createElement("a"),
                newImage = document.createElement("img");
                newItem.classList.add("list-group-item");

                newAnchor.href = event.Poster;
                newAnchor.innerText = event.Title;
                newImage.src = event.Poster;

                newItem.appendChild(newAnchor);
                newItem.appendChild(newImage);

                movieList.appendChild(newItem);
        });
    };    

    getMovieButton.addEventListener("click", function(){
        newMovieUri = movieUri.replace("{{title}}", inputMovie.value);
        $.getJSON(newMovieUri, function(returnData){
            renderList(returnData);
        });
    });

    clearButton.addEventListener("click", function(){
        movieList.innerHTML = "";
        inputMovie.innerText = "";
        // inputMovie.innerHTML = "";
    });

});