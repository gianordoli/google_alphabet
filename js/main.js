var goSearch;
var imagesSrc = [];
var query;

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
        var searchBar = $('input[name="search"]');
        console.log('Called setAutocomplete.');
        if(searchBar.length == 0){
            console.log('Search bar not found.');
            setTimeout(setAutocomplete, 100);
        }else{
            console.log('Search bar found.');
            // Set the default service to web (checked radio button)
            searchBar.googleSuggest({ service: $('input[name="service"]').val() });
            searchBar.attr('maxlength','1');
            // searchBar.keypress(function(e){
            //     $(this).val($(this).val().substring(0, 1));
            // });
            searchBar.focus(function(e){
                $(this).val($(this).val().substring(0, 1));
            });            
        }
    }

    googleSearch(setAutocomplete);

    // Attribute Google Search service when radio button is selected
    $('input[name="service"]').click(function(){
        // console.log($(this).val());
        $('input[name="search"]').googleSuggest({ service: $(this).val() });
    });

    goSearch = function(){
        // var wrapper = $('div.gsc-results.gsc-imageResult.gsc-imageResult-popup');
        var wrapper = $('div.gsc-results-wrapper-nooverlay.gsc-results-wrapper-visible');

        if(wrapper.length == 0){
            console.log('Results not found.');
            setTimeout(goSearch, 500);
        }else{  
            console.log('Results found.');          
            // Get images
            var allImages = $(wrapper).find('img.gs-image.gs-image-scalable');
            console.log(allImages.length);
            // console.log(allImages);

            if(allImages[0].src == imagesSrc[0]){
                console.log('   Search not updated.');
                setTimeout(goSearch, 500);
            }else{
                console.log('   Search updated.');
                // Get src
                for(var i = 0; i < allImages.length; i++){
                    imagesSrc[i] = allImages[i].src;
                }
                console.log(imagesSrc);                
            }



            //Clean up Google's layout
            // $(wrapper).css({
            //     'display': 'none'
            // });
        }
    }

});