/**@license
This file uses Google Suggest for jQuery plugin (licensed under GPLv3) by Haochi Chen ( http://ihaochi.com )
 */
$.fn.googleSuggest = function(opts){
  opts = $.extend({service: 'web', secure: false}, opts);
  
  // console.log(opts.service);

  var services = {
    youtube: { client: 'youtube', ds: 'yt' },
    books: { client: 'books', ds: 'bo' },
    products: { client: 'products-cc', ds: 'sh' },
    news: { client: 'news-cc', ds: 'n' },
    images: { client: 'img', ds: 'i' },
    web: { client: 'psy', ds: '' },
    recipes: { client: 'psy', ds: 'r' }
  }, service = services[opts.service];

  // console.log(service);

  opts.source = function(request, response){
    $.ajax({
      url: 'http'+(opts.secure?'s':'')+'://clients1.google.com/complete/search',
      dataType: 'jsonp',
      data: {
        q: request.term,
        nolabels: 't',
        client: service.client,
        ds: service.ds
      },
      success: function(data) {
        response($.map(data[1], function(item){
          return { value: $("<span>").html(item[0]).text() };
        }));
      }
    });
  };

  opts.select = function(event, ui) {
    query = ui.item.value;
    console.log(query);
    getImages();
  }; 
  
  return this.each(function(){
    // Bind the autocomplete to the element
    $(this).autocomplete(opts);

    // Calls the autocomplete onFocus
    $(this).focus(function(e){
      $(this).val($(this).val().substring(0, 1));
      $(this).autocomplete('search', $(this).val());
    });


  });
}
