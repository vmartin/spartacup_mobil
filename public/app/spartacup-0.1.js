var App = (function(lng, undefined) {


    lng.App.init({
        name: 'Sparta Cup',
        version: '1.0',
        resources: {
          sections : [
            'news.html',
            'shop.html',
            'sponsors.html',
            'stars.html',
            'stats.html',
            'videos.html']
        }
    });
    return {

    };

})(LUNGO);


//function play(sound) {
//				
//				  if (window.HTMLAudioElement) {
//					  var snd = new Audio('');
//					
//					  if(snd.canPlayType('audio/ogg')) {
//						  snd = new Audio(document.location.protocol+'//' + document.location.hostname+(document.location.port ? ':' + document.location.port: '') + '/assets/sounds/' + sound + '.ogg');
//					  }
//					  else if(snd.canPlayType('audio/mp3')) {
//						  snd = new Audio(document.location.protocol+'//' + document.location.hostname+(document.location.port ? ':' + document.location.port: '') + '/assets/sounds/' + sound + '.mp3');
//					  }
//					
//					  snd.play();
//				  }
//			  }
App.Data = (function(lng, App, undefined) {

 


})(LUNGO, App);
App.Events = (function(lng, undefined) {

  var handle_timer = null;
  var TIMER_INTERVAL = 60000;

  lng.dom("#play_video").tap(function(event){
    var element = lng.dom("#video");
    element[0].play();
  });
  lng.dom("#play_video").tap(function(event){
    var element = lng.dom("#video");
    element[0].pause();
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
    

})(LUNGO);
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
App.View = (function(lng, App, undefined) {
   lng.View.Template.create('new-items-tmp',
                           '<li id="new-{{id}}" class="selectable">\
                              <a href="#a-new" data-target="article" request_item_id="{{id}}">\
                                <img src={{image}} class="new_item" width="20%">\
                                <small>{{published_at}}</small>\
                                {{title}}\
                                <div class="clear_both"></div>\
                              </a>\
                           </li>');
                           
   lng.View.Template.create('new-item-tmp',
                           '<li id="new-detail" >\
                                {{video_embed}}\
                                <img src={{image}} class="jumbo" id="new-item-image"><br/>\
                                <div class="clear_both"></div>\
                                <small class="onright">{{published_at}}</small>\
                                <br/>\
                                <p><h1>{{title}}</h1></p>\
                                <blockquote><small class="small_visible">{{header}}</small></blockquote>\
                                <p>{{body}}</p>\
                           </li><li></li>');
                                                   
    lng.View.Template.create('products-tmp',
                           '<li id="product-{{id}}"  class="selectable">\
                              <a href="#a-product" data-target="article" request_item_id="{{id}}">\
                                <img src={{image}} class="product" >\
                                <b>{{name}}</b>\
                                <div class="onright" style="margin-top: 10px;"><span class="icon mini right"></span></div>\
                                <small>{{price}}</small>\
                                <div class="clear_both"></div>\
                              </a>\
                           </li>'); 
     lng.View.Template.create('product-tmp',
                         '<li id="product-detail">\
                              <p align="center"><img src="{{image_big}}" class="jumbo" width="100%" align="center""></p>\
                              <br/><p><h1>{{name}}</h1></p>\
                              <blockquote><small class="small_visible">{{description}}</small></blockquote>\
                              <p><b>Preu:</b> {{price}}</p>\
                              <p><b>Ref:</b> {{ref}}</p><br/>\
                         </li>');
     lng.View.Template.create('stars-tmp',
                             '<li class="anchor" >&nbsp;<span class="icon star"></span> Sparta Cup {{year}}</li>\
                             <li>{{players}}</li>');
     lng.View.Template.create('stars-header-tmp','<li><p align="center"><img src="{{image}}" class="jumbo"></p></li>') 
     
     lng.View.Template.create('sponsor-type-tmp',
                             '<li class="anchor" >&nbsp;<span class="icon tag"></span>{{sponsor_type}}</li>');
                             
     lng.View.Template.create('sponsor-tmp',
                             "<li class='selectable'>\
                               <img src='{{image_medium}}' class='product'>\
                                <div class='onright' style='margin-top: 7px;'>\
                                  <span class='icon mini right'></span>\
                               </div>\
                               <p style='margin-right: 15px; margin-top:5px; text-align: right;'>\
                                 <a href='{{url}}'><b>{{name}}</b></a>\
                               </p>\
                               <div class='clear_both'></div></li>");
                                  
     lng.View.Template.create('sponsor-main-tmp',
                             "<li  class='selectable'>\
                                <a href='{{url}}'>\
                                  <p align='center'>\
                                    <b>{{name}}</b><br/>\
                                    <img src='{{image_big}}' class='jumbo'>\
                                  </p>\
                                </a>\
                                <div class='clear_both'></div>\
                              </li>");
     lng.View.Template.create('stats-days-menu-tmp',
                              '<li class="selectable">\
                                <a href="#a-matches" data-target="article" class="tournament_day" request_item_id="{{day}}" data-title="Partits del {{day}}">\
                                  <span class="calendar icon"></span>\
                                  <div class="onright" style="margin-top: 10px;"><span class="icon mini right"></span></div>\
                                  {{day}}\
                                  <small>Partits i resultats</small>\
                                </a>\
                               </li>');
     lng.View.Template.create('stats-pool-menu-tmp',
                              '<li class="selectable">\
                                <a href="#a-stats" data-target="article" data-title="Classificació pools">\
                                  <span class="icon chart"></span>\
                                  <div class="onright" style="margin-top: 10px;"><span class="icon mini right"></span></div>\
                                  Classificació\
                                  <small>Pools i classificacions</small>\
                                </a>\
                               </li>');
     lng.View.Template.create('stats-pool-header-tmp',
                              '<li class="anchor">{{pool_name}}</li>');   
     
     lng.View.Template.create('stats-pool-table-header-tmp',
                               '<li class="tip dark">\
                                  <table width="100%" >\
                                  <tr >\
                                    <td width="16%" class="right"></td>\
                                    <td width="8%" class="header-stats">G</td>\
                                    <td width="8%" class="header-stats">P</td>\
                                    <td width="8%" class="header-stats">W</td>\
                                    <td width="8%" class="header-stats">L</td>\
                                    <td width="8%" class="header-stats">T</td>\
                                    <td width="11%" class="header-stats">OTW</td>\
                                    <td width="11%" class="header-stats">OTL</td>\
                                    <td width="8%" class="header-stats">GF</td>\
                                    <td width="8%" class="header-stats">GA</td>\
                                    <td width="8%" class="header-stats">+/-</td>\
                                    </tr>\
                                </table>\
                                </li>');
                              
     lng.View.Template.create('stats-pool-tmp',
                              '<li>\
                                <table width="100%" border="1">\
                                  <tr>\
                                    <td width="16%"><img src="{{team_logo_mini}}"></td>\
                                    <td width="8%" class="value-stats">{{win}}</td>\
                                    <td width="8%" class="value-stats">{{played}}</td>\
                                    <td width="8%" class="value-stats">{{win}}</td>\
                                    <td width="8%" class="value-stats">{{lose}}</td>\
                                    <td width="8%" class="value-stats">{{tied}}</td>\
                                    <td width="11%" class="value-stats">{{otw}}</td>\
                                    <td width="11%" class="value-stats">{{otl}}</td>\
                                    <td width="8%" class="value-stats">{{gf}}</td>\
                                    <td width="8%" class="value-stats">{{ga}}</td>\
                                    <td width="8%" class="value-stats">{{difgoals}}</td>\
                                    </tr>\
                                  </table>\
                                  <div class="clear_both"></div>\
                              </li>');
     lng.View.Template.create('matches-tmp',
                              '<li>\
                                  <div class="onright count bubble" >{{time}}</div>\
                                  <small>{{description}}</small>\
                                  <table width="100%">\
                                    <tr>\
                                      <td class="value-stats" width="40%">\
                                         <img  src="{{home_logo_medium}}" alt="{{home_team}}" class="match"></td>\
                                      <td class="center middle"  width="20%"><b>vs</b></td>\
                                      <td class="value-stats" width="40%">\
                                         <img  src="{{visitor_logo_medium}}" alt="{{visitor_team}}" class="match"></td>\
                                      </td>\
                                    </tr>\
                                    <tr>\
                                      <td class="match_result">{{home_goals}}</td>\
                                      <td class="center middle" ><small><- resultat -></small></td>\
                                      <td class="match_result">{{visitor_goals}}</td>\
                                    </tr>\
                                  </table>\
                               </li>'
                               );
     lng.View.Template.create('current-match-tmp',
                               '<li id="current_match">\
                                  <div class="onright count bubble" >Actualitzat: {{last_request_at_hour}}</div>\
                                  En aquest moments:\
                                  <small>{{description}}</small>\
                                  <table width="100%">\
                                    <tr>\
                                      <td class="value-stats" width="35%">\
                                         <img  src="{{local_team_logo_medium}}" alt="{{local_team_name}}" class="match"></td>\
                                      <td class="center middle"  width="30%"><b>vs</b></td>\
                                      <td class="value-stats" width="35%">\
                                         <img  src="{{visitor_team_logo_medium}}" alt="{{visitor_team_name}}" class="match"></td>\
                                      </td>\
                                    </tr>\
                                    <tr>\
                                      <td class="match_result" id="home_goals">{{local_team_goals}}</td>\
                                      <td class="center middle" >\
                                        <div class="count bubble">Gol: {{last_goal}}</div>\
                                      </td>\
                                      <td class="match_result" id="visitor_goals">{{visitor_team_goals}}</td>\
                                    </tr>\
                                  </table>\
                                  <a href="#" class="button big " id="refresh_match"><span class="icon refresh" style="float:none;"></span><abbr>Refrescar</abbr></a>\
                               </li>');                           

    return {
     
    }


})(LUNGO, App);
