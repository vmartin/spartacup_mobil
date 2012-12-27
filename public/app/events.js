App.Events = (function(lng, undefined) {

  var handle_timer = null;
  var TIMER_INTERVAL = 60000;
  var init_stars = false;
  var init_news = false;
  var init_matches = false;
  var init_stats = false;
  var init_shop = false;
  var init_sponsors = false;
  
  lng.dom("#play_video").tap(function(event){
    var element = lng.dom("#video");
    element[0].play();
  });
  lng.dom("#play_video").tap(function(event){
    var element = lng.dom("#video");
    element[0].pause();
  });

  lng.dom("a#go-new-items").tap(function(event){
    init_news = false;
    App.Services.GetNewItems();
  });
  
  lng.dom("article#a-news ul li").touch(function(event){
    if (init_news == false){
      lng.View.Scroll.init(lng.dom("article#a-news").attr("id"));
      init_news = true;
    };
  });
  
  lng.dom('#a-new').on('unload', function(event) {
    var element = lng.dom("article#a-new ul");
    element.children().remove();
  });
  
  lng.dom("article#a-news li a").tap(function(event){
    var element = lng.dom(this);
    App.Services.GetNewItem(element.attr("request_item_id"));
  });
  
  lng.dom("a#go-shop").tap(function(event){
   // lng.Router.section("#s-shop");
   // lng.Router.article("#s-shop", "a-products");
    App.Services.GetProducts();
    init_shop = false;
  });
  
  lng.dom('#a-product').on('unload', function(event) {
    var element = lng.dom("article#a-product ul");
    element.children().remove();
  });
  
  lng.dom("article#a-products li a").tap(function(event){
    var element = lng.dom(this);
    App.Services.GetProduct(element.attr("request_item_id"));
  });
  
  lng.dom("a#go-stars").tap(function(event){
    init_stars = false;
    App.Services.GetStars();
  });
  
  lng.dom("a#go-sponsors").tap(function(event){
    App.Services.GetSponsors();
    init_sponsors = false;
  });
  
  lng.dom("a#go-stats").tap(function(event){
    App.Services.GetTournamentInfo();
  });
  
  lng.dom("#a-stats").on('load', function(event){
    App.Services.GetStats();
    init_stats = false;
  });
  
  lng.dom("article#a-stats-menu ul li a.tournament_day").tap(function(event){
    var element_title = lng.dom('section#s-stats span.title');
    var str_title = lng.dom(this).attr("data-title");
    element_title.text(str_title);
    App.Services.GetMatches(lng.dom(this).attr("request_item_id"))
  });
  
  lng.dom("#a-matches").on('unload', function(event){
    var element = lng.dom("article#a-matches ul");
    element.children().remove();
    init_matches = false;
  });
  
  lng.dom("article#a-matches ul li").touch(function(event){
    if (init_matches == false){
      lng.View.Scroll.init(lng.dom("article#a-matches").attr("id"));
      init_matches = true;
    }  
  });
  
  lng.dom("#refresh_match").tap(function(event){
    App.Services.GetCurrentMatch();
  }); 
 
  lng.dom("#go-home-stats").tap(function(event){
    if ( handle_timer != null ){
      window.clearInterval(handle_timer);
    };
  });
  lng.dom("#go-stats").tap(function(event){
    handle_timer = window.setInterval('App.Services.GetCurrentMatch(true)', TIMER_INTERVAL);
  });
  
  lng.dom("article#a-stars ul li").touch(function(event){
    if (init_stars == false){
      lng.View.Scroll.init(lng.dom("article#a-stars").attr("id"));
      init_stars = true;
    }
  });
  lng.dom("article#a-stats ul li").touch(function(event){
    if (init_stats == false){
      lng.View.Scroll.init(lng.dom("article#a-stats").attr("id"));
      init_stats = true;
    }
  });
  
  lng.dom('article#a-sponsors ul li').touch(function(event){
   if (init_sponsors == false){
      lng.View.Scroll.init(lng.dom("article#a-sponsors").attr("id"));
      init_sponsors = true;
    }  
  });
  
  lng.dom('article#a-products ul li').touch(function(event){
   if (init_shop == false){
      lng.View.Scroll.init(lng.dom("article#a-products").attr("id"));
      init_shop = true;
    }  
  });


})(LUNGO);
