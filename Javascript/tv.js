$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getShows(searchText);
        e.preventDefault();
    });
});

function getShows(searchText) {
    if (searchText != undefined) {
        $.get("http://www.omdbapi.com/?s=" + searchText + "&type=series&apikey=16c987d3")
            .then(function(response) {
                var moviesString = JSON.stringify(response);
                var data = JSON.parse(moviesString);
                var output = "";

                for (index = 0; index < data.Search.length; index++) {
                    output += `
                    <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${data.Search[index].Poster}">
                        <h5>${data.Search[index].Title}</h5>
                        <a onclick="movieSelected('${data.Search[index].imdbID}')" class="btn btn-primary" href="#">Show Details</a>
                        <a onclick="movieSelected('${data.Search[index].imdbID}')" class="btn btn-primary" href="#">Add to List</a>
                    </div>
                    </div>
                    `;
                }
                $('#tvShows').html(output);
            })
            .catch(function(err) {
                alert(err);
            });
    }
}

function movieSelected(id) {
    sessionStorage.setItem('imdbID', id);
    window.location = 'TV_Show_Details.html';
    return false;
}

function getShow() {
    var id = sessionStorage.getItem('imdbID');
    $.get("http://www.omdbapi.com/?i=" + id + "&apikey=16c987d3")
        .then(function(response) {
            var movieString = JSON.stringify(response);
            var data = JSON.parse(movieString);
            output = `
          <div class="row">
            <div class="col-md-4">
              <img src="${data.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${data.Title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Genre:</strong> ${data.Genre}</li>
                <li class="list-group-item"><strong>Released:</strong> ${data.Released}</li>
                <li class="list-group-item"><strong>Rated:</strong> ${data.Rated}</li>
                <li class="list-group-item"><strong>IMDB Rating:</strong> ${data.imdbRating}</li>
                <li class="list-group-item"><strong>Director:</strong> ${data.Director}</li>
                <li class="list-group-item"><strong>Writer:</strong> ${data.Writer}</li>
                <li class="list-group-item"><strong>Actors:</strong> ${data.Actors}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Plot</h3>
              ${data.Plot}
              <hr>
              <a href="http://imdb.com/title/${data.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
              <a href="TV_Shows.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>
        `;
            $('#show').html(output);
        })
        .catch((err) => {
            alert(str(err));
        });
}