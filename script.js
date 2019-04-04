$(document).ready(function () {

    var searchTerm = ['spooderman', 'cat', 'dog', 'bearded dragon', 'csgo', 'dota2'];
    for (var i = 0; i < searchTerm.length; i++) {
        var addButton = $('<button>');
        addButton.text(searchTerm[i]);
        addButton.attr('data-term', searchTerm[i]);
        addButton.addClass('button');
        $('#buttons').append(addButton);
    }


    $(document).on('click', '.button', function () {
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            $(this).attr('data-term') + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                for (var i = 0; i < 8; i++) {
                    var newGif = $('<div>');
                    var img = $('<img>');
                    newGif.addClass('imgholder');   
                    img.attr('src', response.data[i].images.fixed_height_still.url)
                    img.attr('data-still', response.data[i].images.fixed_height_still.url);
                    img.attr('data-animate', response.data[i].images.fixed_height.url);
                    img.attr('data-state', "still");
                    img.addClass('gif');

                    newGif.append(img);
                    newGif.append('<p style="text-align:center;">rating: ' + response.data[i].rating + '</p><br>');
                    $('#gifs').prepend(newGif);
                }
            })
    })

    $('#search').on('click', function () {
        event.preventDefault();
        if ($('#searchterm').val().trim() != '') {
            var addButton = $('<button>');
            addButton.text($('#searchterm').val().trim());
            addButton.attr('data-term', $('#searchterm').val().trim());
            $('#searchterm').val('');
            addButton.addClass('button');
            $('#buttons').append(addButton);
        }
    })


    $(document).on('click', '.gif', function () {
        if ($(this).attr('data-state') == "still") {
            $(this).attr('src', $(this).attr('data-animate'));
            $(this).attr('data-state', "animate");
        } else {
            $(this).attr('src', $(this).attr('data-still'));
            $(this).attr('data-state', "still");
        }
    })
})