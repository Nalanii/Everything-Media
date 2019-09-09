$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getBooks(searchText);
        e.preventDefault();
    });
});

function getBooks(searchText) {
    if (searchText != undefined) {
        $.get("https://www.googleapis.com/books/v1/volumes?q=" + searchText)
            .then(function(response) {
                var output = "";

                for (index = 0; index < response.items.length; index++) {
                    output += `
                    <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${response.items[index].volumeInfo.imageLinks.thumbnail}">
                        <h5>${response.items[index].volumeInfo.title}</h5>
                        <a onclick="bookSelected('${response.items[index].id}')" class="btn btn-primary" href="#">Book Details</a>
                        <a onclick="bookSelected('${response.items[index].id}')" class="btn btn-primary" href="#">Add to List</a>
                    </div>
                    </div>
                    `;
                }
                $('#books').html(output);
            })
            .catch(function(err) {
                alert(err);
            });
    }
}

function bookSelected(id) {
    sessionStorage.setItem('id', id);
    window.location = 'Book_Details.html';
    return false;
}

function getBook() {
    var id = sessionStorage.getItem('id');
    $.get("https://www.googleapis.com/books/v1/volumes/" + id)
        .then(function(response) {
            output = `
          <div class="row">
            <div class="col-md-4">
              <img src="${response.volumeInfo.imageLinks.extraLarge}" class="thumbnail">
            </div>
            <div class="col-md-8">
              <h2>${response.volumeInfo.title}</h2>
              <ul class="list-group">
                <li class="list-group-item"><strong>Author(s):</strong> ${response.volumeInfo.authors}</li>
                <li class="list-group-item"><strong>Publisher:</strong> ${response.volumeInfo.publisher}</li>
                <li class="list-group-item"><strong>PublishedDate:</strong> ${response.volumeInfo.publishedDate}</li>
                <li class="list-group-item"><strong>Average Rating:</strong> ${response.volumeInfo.averageRating}/5</li>
                <li class="list-group-item"><strong>Page Count:</strong> ${response.volumeInfo.pageCount}</li>
              </ul>
            </div>
          </div>
          <div class="row">
            <div class="well">
              <h3>Description</h3>
              ${response.volumeInfo.description}
              <hr>
              <a href="${response.volumeInfo.infoLink}" target="_blank" class="btn btn-primary">Info</a>
              <a href="Books.html" class="btn btn-default">Go Back To Search</a>
            </div>
          </div>
        `;
            $('#book').html(output);
        })
        .catch((err) => {
            alert(str(err));
        });
}