var getImages;
var imagesSrc = [];
var query;

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
            // searchBar.keypress(function(e){
            //     $(this).val($(this).val().substring(0, 1));
            // });
            // searchBar.focus(function(e){
            //     $(this).val($(this).val().substring(0, 1));
            // });            
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
        $('input[name="search"]').googleSuggest({ service: $(this).val() });
    });    
});


/*----------------------------------------------------------------
------------------------------ P5 --------------------------------
----------------------------------------------------------------*/
var isLoaded = false;
function initApp(){
    isLoaded = true;
}

function setup() {
    var canvas = createCanvas(window.innerWidth - 4, window.innerHeight - 4);  
    canvas.position(0, 0);
    console.log(width, height);
}

function mousePressed() {

    if(isLoaded){

        background(0);

        fill(255);
        stroke(0);
        textSize(height/2);
        textAlign(LEFT);
        textFont('Helvetica');
        var letter = query.substr(0, 1);
        letter = letter.toUpperCase();
        text(letter, 0, height/2);

        var res = 20;
        var rectSize = 15;

        for(var i = 0; i < width; i += res){
            for(var j = 0; j < height; j += res){       
                var c = get(i*2, j*2);      
                if(c[0] > 10){
                    fill(255, 0, 0);
                    noStroke();
                    rect(i - rectSize/2, j - rectSize/2, rectSize, rectSize);
                }
            }
        }
    }
}

function draw() {
    if(isLoaded){
        // if(createP5Images){
        //     var img = loadImage(imagesSrc[0]);
        //     createP5Images = false;
        // }
            

        // background(0);



        // var c = get(round(mouseX/2), round(mouseY/2));
        // console.log(c);        
        // console.log(mouseX + ', ' + mouseY);

        // var res = 40;
        
        // for(var y = 0; y < height; y += res){
        //     for(var x = 0; x < width; x += res){

        //         // rect(x, y, res/2, res/2);

        //         // var i = (x + (y * width))*4;
        //         var c = get(x*2, y*2);
        //         fill(0, 255, 255);
        //         noStroke();
        //         textSize(8);
        //         text(c[0], x/2, y/2);
        //         // text(x, x, y);
        //         // text(y, x, y + 8);

        //         // if(c.red > 10){
        //         //     var newDiv = createDiv('');
        //         //     newDiv.position(x - width/2, y);
        //         //     newDiv.class('pixelDiv');
        //         // }
        //     }
        // }

        // var res = floor(map(mouseX, 0, width, 5, 40));
        


    }
}