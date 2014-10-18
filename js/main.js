var goSearch;

$(document).ready(function () {  

    // Set the default service to web (checked radio button)
    $('#search').googleSuggest({ service: $('input[name="service"]').val() });

    // Attribute Google Search service when radio button is selected
    $('input[name="service"]').click(function(){
        // console.log($(this).val());
        $('#search').googleSuggest({ service: $(this).val() });
    });

    goSearch = function(query){
        console.log('Called search: ' + query);
    }

});