var suggestCallBack; // global var for autocomplete jsonp

$(document).ready(function () {  

    $("#search").autocomplete({
        source: function(request, response) {
            $.getJSON("http://suggestqueries.google.com/complete/search?callback=?",
                { 
                  "hl":"en", // Language                  
                  "jsonp":"suggestCallBack", // jsonp callback function name
                  "q":request.term, // query term
                  "client":"youtube" // force youtube style response, i.e. jsonp
                }
            );
            suggestCallBack = function (data) {
                var suggestions = [];
                $.each(data[1], function(key, val) {
                    suggestions.push({"value":val[0]});
                });
                suggestions.length = 5; // prune suggestions list to only 5 items
                response(suggestions);
            };
        },
        select: function(event, ui) {
            var query = ui.item.value;
            console.log(query);
        },        
    });

    $("#search").keypress(function(e){
        if (e.keyCode == 13) {
            console.log($(this).val());
        }
    });
});