App.Events = (function(lng, undefined) {

  lng.dom("#play_video").tap(function(event){
    var element = lng.dom("#video");
    element[0].play();
  });

  lng.dom("a#go-new-items").tap(function(event){
    App.Services.GetNewItems();
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
    App.Services.GetStars();
  });
  
  lng.dom("a#go-sponsors").tap(function(event){
    App.Services.GetSponsors();
  });
  
  lng.dom("a#go-stats").tap(function(event){
    App.Services.GetTournamentInfo();
  });
  
  lng.dom("#a-stats").on('load', function(event){
    App.Services.GetStats();
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
  });
  
 
    

})(LUNGO);
