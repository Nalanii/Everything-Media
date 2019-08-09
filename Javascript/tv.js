$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getShows(searchText) {
    alert("Here");
    if (searchText != undefined) {
        $.get("http://www.omdbapi.com/?s=" + searchText + "&type=series&apikey=16c987d3")
            .then(function(response) {
                var moviesString = JSON.stringify(response);
                var data = JSON.parse(moviesString);
                var output = "";
                alert("here2");

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
                $('#movies').html(output);
            })
            .catch(function(err) {
                alert(err)
            });
    }
}

function movieSelected(id) {
    sessionStorage.setItem('imdbID', id);
    window.location = 'Movie&TVDetails.html';
    return false;
}