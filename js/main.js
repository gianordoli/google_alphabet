var goSearch;

$(document).ready(function () {

    function googleSearch(callback) {
        var cx = '009093787028265469982:75wos-7sdjk';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
          '//www.google.com/cse/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);

        callback();
    }

    function setAutocomplete() {
        console.log('Called setAutocomplete.');
        if($('input[name="search"]').length == 0){
            console.log('Search bar not found.');
            setTimeout(setAutocomplete, 1000);
        }else{
            console.log('Search bar found.');
            // Set the default service to web (checked radio button)
            $('input[name="search"]').googleSuggest({ service: $('input[name="service"]').val() });
        }
    }

    googleSearch(setAutocomplete);

    // Attribute Google Search service when radio button is selected
    $('input[name="service"]').click(function(){
        // console.log($(this).val());
        $('input[name="search"]').googleSuggest({ service: $(this).val() });
    });

    goSearch = function(query){
        console.log('Called search: ' + query);
    }

});