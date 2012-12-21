App.Services = (function(lng, App, undefined) {
     

    //const API_DOMAIN = 'http://192.168.1.128:3000'
    const API_DOMAIN = 'http://www.spartacup.com'
    const API_NEW_ITEMS_URL = API_DOMAIN + '/api/new_items/get_items'
    const API_NEW_ITEM_URL = API_DOMAIN + '/api/new_items/get_item'
    const API_PRODUCTS_URL = API_DOMAIN + '/api/products/get_items'
    const API_PRODUCT_URL = API_DOMAIN + '/api/products/get_item'
    const API_STARS_URL = API_DOMAIN + '/api/stars/get_items'
    const API_SPONSORS_URL = API_DOMAIN + '/api/sponsors/get_items'
    const API_STATS_INFO_URL = API_DOMAIN + '/api/stats/get_info'
    const API_STATS_URL = API_DOMAIN + '/api/stats/get_stats'
    const API_MATCHES_URL = API_DOMAIN + '/api/stats/get_matches'

    
    var get_new_items = function(){
      var url = API_NEW_ITEMS_URL;
      var time_stamp = new Date().getTime();
      var data = {
          timestamp: time_stamp
      };
      lng.Service.get(url,data, function(response){
        console.error(response.data); 
        lng.View.Template.List.create({
           el: '#a-news', 
           template: 'new-items-tmp', 
           data: response.data
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
        console.error(response.data); 
        lng.View.Template.List.create({
           el: '#a-new', 
           template: 'new-item-tmp', 
           data: response.data
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
             data: response.data
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
        data: product
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
          lng.View.Scroll.init('#a-sponsors');
          lng.View.Scroll.first('#a-sponsors');
        });
      }else{
        if (lng.dom('article#a-sponsors ul li').length == 0){
          create_sponsors(data);
        };
        lng.View.Scroll.init('a-sponsors');
        lng.View.Scroll.first('a-sponsors');
      };
    };
    var create_sponsors = function(data){
      for (var i = 0; i < data.length; i++) {
        lng.View.Template.List.append({
          el: '#a-sponsors',
          template: 'sponsor-type-tmp',
          data: data[i]
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
            data: sponsor
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
            data: days
          });
          lng.View.Template.List.append({
            el: "#a-stats-menu",
            template: "stats-pool-menu-tmp",
            data: {'mock':''}
          });
          
        });
       }else{
          lng.View.Template.List.create({
            el: "#a-stats-menu",
            template: "stats-days-menu-tmp",
            data: tournament.tournament_days
          });
          lng.View.Template.List.append({
            el: "#a-stats-menu",
            template: "stats-pool-menu-tmp",
            data: {'mock':''}
          });          
       }
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
            data: pool
          });
          lng.View.Template.List.append({
            el: "#a-stats",
            template: 'stats-pool-table-header-tmp',
            data: [{}]
          }); 
          for (var j = 0; j < pool.stats.length; j++){
            lng.View.Template.List.append({
              el: "#a-stats",
              template: 'stats-pool-tmp',
              data: pool.stats[j]
            });          
          };
        };
        lng.View.Scroll.init("a-stats");
        lng.View.Scroll.first("a-stats");
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
        console.error(response.data);
        lng.View.Template.List.create({
          el: "#a-matches",
          template: 'matches-tmp',
          data: response.data.matches
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
        lng.View.Scroll.init("a-matches");
        lng.View.Scroll.first("a-matches");
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
      GetMatches: get_matches
    }

})(LUNGO, App);
