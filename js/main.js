var getImages;
var query;
var imagesSrc = [];

$(document).ready(function () {

    googleSearch(setAutocomplete);
    
    /*------------------------- FUNCTIONS -------------------------*/

    // Creates Google Custom Search Engine
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

    // Sets up the Autocomplete jQuery plugin
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
        }
    }

    // Gets images from the Google results and store in an array
    getImages = function(){
        // var wrapper = $('div.gsc-results.gsc-imageResult.gsc-imageResult-popup');
        var wrapper = $('div.gsc-results-wrapper-nooverlay.gsc-results-wrapper-visible');

        if(wrapper.length == 0){
            console.log('Results not found.');
            setTimeout(getImages, 500);
        }else{  
            console.log('Results found.');          
            // Get images
            var allImages = $(wrapper).find('img.gs-image.gs-image-scalable');
            console.log(allImages.length);
            // console.log(allImages);
            
            if(allImages.length > 0 &&
               (imagesSrc.length == 0 || allImages[0].src != imagesSrc[0])){
                console.log('   Search updated.');
                // Get src
                for(var i = 0; i < allImages.length; i++){
                    imagesSrc[i] = allImages[i].src;
                }
                console.log(imagesSrc);
                
                // Clean up Google's layout
                $(wrapper).css({
                    'display': 'none'
                });

                // Remove previous divs
                $('img.pixel-img').remove();

                // Clean up search bar
                $('input[name="search"]').val(query.substring(0, 1));                

                // Call p5 app
                initApp();

            }else{
                console.log('   Search not updated.');
                setTimeout(getImages, 500);
            }
        }
    }

    /*------------------------- LISTENERS -------------------------*/
    // Attribute Google Search service when radio button is selected
    $('input[name="service"]').click(function(){
        // console.log($(this).val());
        var searchBar = $('input[name="search"]');
        
        // Bind the autocomplete to a new service
        $(searchBar).googleSuggest({ service: $(this).val() });

        // Calls the autocomplete
        $(searchBar).autocomplete('search', $(searchBar).val());
    });    
});


/*----------------------------------------------------------------
------------------------------ P5 --------------------------------
----------------------------------------------------------------*/
function initApp(){
    // isLoaded = true;

    background(0);

    fill(255);
    stroke(0);
    textSize((height/2)*1.5);
    textAlign(LEFT);
    textFont('Helvetica');
    var letter = query.substr(0, 1);
    letter = letter.toUpperCase();
    text(letter, 0, height/2);

    var res = 30;
    var divScale = 1.8;
    var imgIndex = 0;

    for(var i = 0; i < width; i += res){
        for(var j = 0; j < height; j += res){       
            var c = get(i*2, j*2);      
            if(c[0] > 10){
                var newImg = createImg(imagesSrc[imgIndex], '');
                newImg.position((i*divScale*1.5) - (res*divScale), j*divScale);
                newImg.style('z-index', '10');
                newImg.class('pixel-img');
                imgIndex ++;
                if(imgIndex > imagesSrc.length - 1){
                    imgIndex = 0;
                }
            }
        }
    }
    background(random(255), 255, 255);
}

function setup() {
    colorMode(HSB, 255);
    var canvas = createCanvas(window.innerWidth - 4, window.innerHeight - 4);  
    canvas.position(0, 0);
    // console.log(width, height);
}

function draw() {

}