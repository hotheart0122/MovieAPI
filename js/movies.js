$(document).ready(function(){
    var inputMovie = document.getElementById("input-movie-text"),
        getMovieButton = document.getElementById("fetch-movie-button"),
      
        movieList = document.getElementById("movie-list"),
        clearButton = document.getElementById("clear-button"),
        searchUri = "https://itunes.apple.com/search?term={{title}}&entity=movie&limit=5&callback=?",

        movieInfo = document.getElementById("movie-info"),
        newSearchUri,
        newTitleUri;

    var renderList = function(eventData){
        movieList.innerHTML = "";
        if(!eventData){
            console.log("Error: No data passed to renderList method.");
            alert("Didn't find any movies.");
            return false;
        }

        eventData.forEach(function(event){
            var newItem = document.createElement("li"),
                newAnchor = document.createElement("a");
                newImage = document.createElement("img");
               
                
                newImage.src = event.artworkUrl100;
                newItem.classList.add("list-group-item");

                // newAnchor.href =event.trackViewUrl;
                newAnchor.innerText = event.trackName;
                // newAnchor.href = newImage.src;

                newAnchor.href = "#";


                newAnchor.addEventListener("click", function(){ 
                    // newImage = document.createElement("img");
                    // newImage.src = event.artworkUrl100;
                    
                    var iTunesAnchor = document.createElement("a");
                    iTunesAnchor.innerText = event.longDescription;
                    
                    iTunesAnchor.href = event.trackViewUrl;
                    movieInfo.appendChild(iTunesAnchor);
                    
                });
                
                            
                newItem.appendChild(newImage);
                newItem.appendChild(newAnchor);
                movieList.appendChild(newItem);
            });
        };    


    getMovieButton.addEventListener("click", function(){
        newSearchUri = searchUri.replace("{{title}}", inputMovie.value);
        $.getJSON(newSearchUri, function(returnData){
            renderList(returnData.results);
        });
    });

    clearButton.addEventListener("click", function(){
        movieList.innerHTML = "";
        inputMovie.innerText = "";
        movieInfo.innerText = "";
    });

});