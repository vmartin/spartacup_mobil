App.Services = (function(lng, App, undefined) {
     

    //var API_DOMAIN = 'http://192.168.1.128:3000'
    var API_DOMAIN = 'http://www.spartacup.com'
    var API_NEW_ITEMS_URL = API_DOMAIN + '/api/new_items/get_items'
    var API_NEW_ITEM_URL = API_DOMAIN + '/api/new_items/get_item'
    var API_PRODUCTS_URL = API_DOMAIN + '/api/products/get_items'
    var API_PRODUCT_URL = API_DOMAIN + '/api/products/get_item'
    var API_STARS_URL = API_DOMAIN + '/api/stars/get_items'
    var API_SPONSORS_URL = API_DOMAIN + '/api/sponsors/get_items'
    var API_STATS_INFO_URL = API_DOMAIN + '/api/stats/get_info'
    var API_STATS_URL = API_DOMAIN + '/api/stats/get_stats'
    var API_MATCHES_URL = API_DOMAIN + '/api/stats/get_matches'
    var API_CURRENT_MATCH_URL = API_DOMAIN + '/api/stats/get_current_match'

    var home_goals = undefined;
    var visitor_goals = undefined;
    
    var get_new_items = function(){
      var url = API_NEW_ITEMS_URL;
      var time_stamp = new Date().getTime();
      var data = {
          timestamp: time_stamp
      };
      lng.Service.get(url,data, function(response){
    
        lng.View.Template.List.create({
           el: '#a-news', 
           template: 'new-items-tmp', 
           data: response.data,
           scroll_to: 'none'
         });   
      });
    };
    
    var get_new_item = function(p_id){
      var url = API_NEW_ITEM_URL;
      var time_stamp = new Date().getTime();
      var data = {
          timestamp: time_stamp,
          id: p_id
      };
      lng.Service.get(url,data, function(response){
 
        lng.View.Template.List.create({
           el: '#a-new', 
           template: 'new-item-tmp', 
           data: response.data,
           scroll_to: 'none'
         });   
        var element = lng.dom("#new-item-image");
        if (response.data.video_embed != ""){
          element.remove();
        };
      });
    };
    
    var get_products = function(){
      var url = API_PRODUCTS_URL;
      var time_stamp = new Date().getTime();
      var data = {
          timestamp: time_stamp
      };
      var data = lng.Data.Storage.session('products');
      if (data == null){
        lng.Service.get(url,data, function(response){
          lng.Data.Storage.session('products',response.data);
          lng.View.Template.List.create({
             el: '#a-products', 
             template: 'products-tmp', 
             data: response.data,
             scroll_to: 'none'
           });   
        });
      }else{
        lng.View.Template.List.create({
         el: '#a-products', 
         template: 'products-tmp', 
         data:data
        });
      };
    };
    
    var get_product = function(p_id){
      var data = lng.Data.Storage.session('products');
      var product = lng.Core.findByProperty(data, 'id', p_id);
      lng.View.Template.List.create({
        el: '#a-product', 
        template: 'product-tmp', 
        data: product,
        scroll_to: 'none'
      });     
    };
    
    var get_stars = function(){
      var url = API_STARS_URL;
      var time_stamp = new Date().getTime();
      var data = {
          timestamp: time_stamp
      };
      var image_url =  document.location.protocol+'//' + document.location.hostname+(document.location.port ? ':' + document.location.port: '') +  "/assets/images/stars.jpg" 
      var data = lng.Data.Storage.session('stars');
      if (data == null){
        lng.Service.get(url,data, function(response){
          lng.Data.Storage.session('stars',response.data);
          lng.View.Template.List.create({
             el: '#a-stars', 
             template: 'stars-tmp', 
             data: response.data
          });
          lng.View.Template.List.prepend({
           el: '#a-stars', 
           template: 'stars-header-tmp', 
           data:[{ image : image_url }]
          });    
        });
      }else{
        lng.View.Template.List.create({
         el: '#a-stars', 
         template: 'stars-tmp', 
         data:data
        });
        lng.View.Template.List.prepend({
         el: '#a-stars', 
         template: 'stars-header-tmp', 
         data: [ { image: image_url} ]
        });
      };   
    };
    
    var get_sponsors = function(){
      var url = API_SPONSORS_URL;
      var time_stamp = new Date().getTime();
      var data = {
          timestamp: time_stamp
      };
      var data = lng.Data.Storage.session('sponsors');
      if (data == null){
        lng.Service.get(url,data, function(response){
          lng.Data.Storage.session('sponsors',response.data);
          lng.dom('article#a-sponsors ul li').remove();
          create_sponsors(response.data);  
 
        });
      }else{
        if (lng.dom('article#a-sponsors ul li').length == 0){
          create_sponsors(data);
        };
      };
    };
    var create_sponsors = function(data){
      for (var i = 0; i < data.length; i++) {
        lng.View.Template.List.append({
          el: '#a-sponsors',
          template: 'sponsor-type-tmp',
          data: data[i],
          scroll_to: 'none'
        });
        for (var j = 0; j < data[i].sponsors.length; j++){
          var sponsor = data[i].sponsors[j] ;
          var tmp = 'sponsor-tmp';
          if (data[i].sponsor_type === 'Sponsor principal'){
            tmp = 'sponsor-main-tmp'
          }
          lng.View.Template.List.append({
            el: '#a-sponsors',
            template: tmp,
            data: sponsor,
            scroll_to: 'none'           
          }); 
        };
      };
    };
    
    var get_info = function(){
      var url = API_STATS_INFO_URL;
      var time_stamp = new Date().getTime();
      var data = {
          timestamp: time_stamp
      };
      var tournament = lng.Data.Storage.session('tournament');
      if (tournament == null){      
        lng.Service.get(url,data, function(response){
          lng.Data.Storage.session('tournament', response.data.tournament);
          var days = response.data.tournament.tournament_days
          
          lng.View.Template.List.create({
            el: "#a-stats-menu",
            template: "stats-days-menu-tmp",
            data: days,
            scroll_to: 'none'
          });
          lng.View.Template.List.append({
            el: "#a-stats-menu",
            template: "stats-pool-menu-tmp",
            data: {'mock':''},
            scroll_to: 'none' 
          });
          _get_and_render_current_match(false);
        });
       }else{
          lng.View.Template.List.create({
            el: "#a-stats-menu",
            template: "stats-days-menu-tmp",
            data: tournament.tournament_days,
            scroll_to: 'none'
          });
          lng.View.Template.List.append({
            el: "#a-stats-menu",
            template: "stats-pool-menu-tmp",
            data: {'mock':''},
            scroll_to: 'none'
          });  
          _get_and_render_current_match(false);         
       };
    };
    
    var _get_and_render_current_match = function(b_play){
      var data = {
        timestamp : new Date().getTime()
      };
      lng.Service.get(API_CURRENT_MATCH_URL,data, function(response){
        try{
          lng.dom('#current_match').remove();
        }catch(err){
          //do-nothing
        };
        if (response.data.any_match == true){
          lng.View.Template.List.append({
            el: "#a-stats-menu",
            template: "current-match-tmp",
            data: response.data.current_match,
            scroll_to: 'none'
          });
//          if (b_play == true){
//            play('drip'); 
//          };
        };
      });      
    };
    
    var get_stats = function(){
      var url = API_STATS_URL;
      var time_stamp = new Date().getTime();
      var data = {
          timestamp: time_stamp
      };
      lng.Service.get(url,data, function(response){
        lng.dom('article#a-stats ul li').remove();
        for (var i = 0; i < response.data.pools.length; i++){
          var pool = response.data.pools[i];
          lng.View.Template.List.append({
            el: "#a-stats",
            template: 'stats-pool-header-tmp',
            data: pool,
            scroll_to: 'none'
          });
          lng.View.Template.List.append({
            el: "#a-stats",
            template: 'stats-pool-table-header-tmp',
            data: [{}],
            scroll_to: 'none' 
          }); 
          for (var j = 0; j < pool.stats.length; j++){
            lng.View.Template.List.append({
              el: "#a-stats",
              template: 'stats-pool-tmp',
              data: pool.stats[j],
              scroll_to: 'none'
            });          
          };
        };    
      });
    };

    var get_matches = function(p_date){
      var url = API_MATCHES_URL;
      var time_stamp = new Date().getTime();
      var data = {
          date: p_date,
          timestamp: time_stamp
      };
      lng.Service.get(url,data, function(response){
        lng.View.Template.List.create({
          el: "#a-matches",
          template: 'matches-tmp',
          data: response.data.matches,
          scroll_to: 'none'
        });
        var images = lng.dom('img.match[src=""]');
        var str_alt = "";
        var parent = undefined;
        for (var i=0; i < images.length; i ++){
          var image = lng.dom(images[i]);
          str_alt = image.attr('alt');
          parent = image.parent();
          parent.html('<h1>' + str_alt + '</h1>');
          image.remove();
        };
      });      
    };    
    
    return {
      GetNewItems: get_new_items,
      GetNewItem: get_new_item,
      GetProducts: get_products,
      GetProduct: get_product,
      GetStars: get_stars,
      GetSponsors: get_sponsors,
      GetTournamentInfo: get_info,
      GetStats: get_stats,
      GetMatches: get_matches,
      GetCurrentMatch: _get_and_render_current_match
    }

})(LUNGO, App);
