var App=function(a){a.App.init({name:"Sparta Cup",version:"1.0",resources:{sections:["news.html","shop.html","sponsors.html","stars.html","stats.html","videos.html"]}});return{}}(LUNGO);App.Data=function(){}(LUNGO,App);App.Events=function(a){var j=null,i=false,h=false,g=false,b=false,c=false,d=false;a.dom("#play_video").tap(function(){a.dom("#video")[0].play()});a.dom("#play_video").tap(function(){a.dom("#video")[0].pause()});a.dom("a#go-new-items").tap(function(){h=false;App.Services.GetNewItems()});a.dom("article#a-news ul li").touch(function(){if(h==false){a.View.Scroll.init(a.dom("article#a-news").attr("id"));h=true}});a.dom("#a-new").on("unload",function(){a.dom("article#a-new ul").children().remove()});a.dom("article#a-news li a").tap(function(){var e=
a.dom(this);App.Services.GetNewItem(e.attr("request_item_id"))});a.dom("a#go-shop").tap(function(){App.Services.GetProducts();c=false});a.dom("#a-product").on("unload",function(){a.dom("article#a-product ul").children().remove()});a.dom("article#a-products li a").tap(function(){var e=a.dom(this);App.Services.GetProduct(e.attr("request_item_id"))});a.dom("a#go-stars").tap(function(){i=false;App.Services.GetStars()});a.dom("a#go-sponsors").tap(function(){App.Services.GetSponsors();d=false});a.dom("a#go-stats").tap(function(){App.Services.GetTournamentInfo()});
a.dom("#a-stats").on("load",function(){App.Services.GetStats();b=false});a.dom("article#a-stats-menu ul li a.tournament_day").tap(function(){var e=a.dom("section#s-stats span.title"),f=a.dom(this).attr("data-title");e.text(f);App.Services.GetMatches(a.dom(this).attr("request_item_id"))});a.dom("#a-matches").on("unload",function(){a.dom("article#a-matches ul").children().remove();g=false});a.dom("article#a-matches ul li").touch(function(){if(g==false){a.View.Scroll.init(a.dom("article#a-matches").attr("id"));
g=true}});a.dom("#refresh_match").tap(function(){App.Services.GetCurrentMatch()});a.dom("#go-home-stats").tap(function(){j!=null&&window.clearInterval(j)});a.dom("#go-stats").tap(function(){j=window.setInterval("App.Services.GetCurrentMatch(true)",6E4)});a.dom("article#a-stars ul li").touch(function(){if(i==false){a.View.Scroll.init(a.dom("article#a-stars").attr("id"));i=true}});a.dom("article#a-stats ul li").touch(function(){if(b==false){a.View.Scroll.init(a.dom("article#a-stats").attr("id"));b=
true}});a.dom("article#a-sponsors ul li").touch(function(){if(d==false){a.View.Scroll.init(a.dom("article#a-sponsors").attr("id"));d=true}});a.dom("article#a-products ul li").touch(function(){if(c==false){a.View.Scroll.init(a.dom("article#a-products").attr("id"));c=true}})}(LUNGO);App.Services=function(a,j,i){var h=function(b){for(var c=0;c<b.length;c++){a.View.Template.List.append({el:"#a-sponsors",template:"sponsor-type-tmp",data:b[c],scroll_to:"none"});for(var d=0;d<b[c].sponsors.length;d++){var e=b[c].sponsors[d],f="sponsor-tmp";if(b[c].sponsor_type==="Sponsor principal")f="sponsor-main-tmp";a.View.Template.List.append({el:"#a-sponsors",template:f,data:e,scroll_to:"none"})}}},g=function(){var b={timestamp:(new Date).getTime()};a.Service.get("http://www.spartacup.com/api/stats/get_current_match",
b,function(c){try{a.dom("#current_match").remove()}catch(d){}c.data.any_match==true&&a.View.Template.List.append({el:"#a-stats-menu",template:"current-match-tmp",data:c.data.current_match,scroll_to:"none"})})};return{GetNewItems:function(){var b={timestamp:(new Date).getTime()};a.Service.get("http://www.spartacup.com/api/new_items/get_items",b,function(c){a.View.Template.List.create({el:"#a-news",template:"new-items-tmp",data:c.data,scroll_to:"none"})})},GetNewItem:function(b){b={timestamp:(new Date).getTime(),
id:b};a.Service.get("http://www.spartacup.com/api/new_items/get_item",b,function(c){a.View.Template.List.create({el:"#a-new",template:"new-item-tmp",data:c.data,scroll_to:"none"});var d=a.dom("#new-item-image");c.data.video_embed!=""&&d.remove()})},GetProducts:function(){var b={timestamp:(new Date).getTime()};b=a.Data.Storage.session("products");b==null?a.Service.get("http://www.spartacup.com/api/products/get_items",b,function(c){a.Data.Storage.session("products",c.data);a.View.Template.List.create({el:"#a-products",
template:"products-tmp",data:c.data,scroll_to:"none"})}):a.View.Template.List.create({el:"#a-products",template:"products-tmp",data:b})},GetProduct:function(b){var c=a.Data.Storage.session("products");b=a.Core.findByProperty(c,"id",b);a.View.Template.List.create({el:"#a-product",template:"product-tmp",data:b,scroll_to:"none"})},GetStars:function(){var b={timestamp:(new Date).getTime()},c=document.location.protocol+"//"+document.location.hostname+(document.location.port?":"+document.location.port:
"")+"/assets/images/stars.jpg";b=a.Data.Storage.session("stars");if(b==null)a.Service.get("http://www.spartacup.com/api/stars/get_items",b,function(d){a.Data.Storage.session("stars",d.data);a.View.Template.List.create({el:"#a-stars",template:"stars-tmp",data:d.data});a.View.Template.List.prepend({el:"#a-stars",template:"stars-header-tmp",data:[{image:c}]})});else{a.View.Template.List.create({el:"#a-stars",template:"stars-tmp",data:b});a.View.Template.List.prepend({el:"#a-stars",template:"stars-header-tmp",
data:[{image:c}]})}},GetSponsors:function(){var b={timestamp:(new Date).getTime()};b=a.Data.Storage.session("sponsors");if(b==null)a.Service.get("http://www.spartacup.com/api/sponsors/get_items",b,function(c){a.Data.Storage.session("sponsors",c.data);a.dom("article#a-sponsors ul li").remove();h(c.data)});else a.dom("article#a-sponsors ul li").length==0&&h(b)},GetTournamentInfo:function(){var b={timestamp:(new Date).getTime()},c=a.Data.Storage.session("tournament");if(c==null)a.Service.get("http://www.spartacup.com/api/stats/get_info",
b,function(d){a.Data.Storage.session("tournament",d.data.tournament);a.View.Template.List.create({el:"#a-stats-menu",template:"stats-days-menu-tmp",data:d.data.tournament.tournament_days,scroll_to:"none"});a.View.Template.List.append({el:"#a-stats-menu",template:"stats-pool-menu-tmp",data:{mock:""},scroll_to:"none"});g(false)});else{a.View.Template.List.create({el:"#a-stats-menu",template:"stats-days-menu-tmp",data:c.tournament_days,scroll_to:"none"});a.View.Template.List.append({el:"#a-stats-menu",
template:"stats-pool-menu-tmp",data:{mock:""},scroll_to:"none"});g(false)}},GetStats:function(){var b={timestamp:(new Date).getTime()};a.Service.get("http://www.spartacup.com/api/stats/get_stats",b,function(c){a.dom("article#a-stats ul li").remove();for(var d=0;d<c.data.pools.length;d++){var e=c.data.pools[d];a.View.Template.List.append({el:"#a-stats",template:"stats-pool-header-tmp",data:e,scroll_to:"none"});a.View.Template.List.append({el:"#a-stats",template:"stats-pool-table-header-tmp",data:[{}],
scroll_to:"none"});for(var f=0;f<e.stats.length;f++)a.View.Template.List.append({el:"#a-stats",template:"stats-pool-tmp",data:e.stats[f],scroll_to:"none"})}})},GetMatches:function(b){var c=(new Date).getTime();a.Service.get("http://www.spartacup.com/api/stats/get_matches",{date:b,timestamp:c},function(d){a.View.Template.List.create({el:"#a-matches",template:"matches-tmp",data:d.data.matches,scroll_to:"none"});d=a.dom('img.match[src=""]');for(var e="",f=i,k=0;k<d.length;k++){var l=a.dom(d[k]);e=l.attr("alt");
f=l.parent();f.html("<h1>"+e+"</h1>");l.remove()}})},GetCurrentMatch:g}}(LUNGO,App);App.View=function(a){a.View.Template.create("new-items-tmp",'<li id="new-{{id}}" class="selectable">                              <a href="#a-new" data-target="article" request_item_id="{{id}}">                                <img src={{image}} class="new_item" width="20%">                                <small>{{published_at}}</small>                                {{title}}                                <div class="clear_both"></div>                              </a>                           </li>');
a.View.Template.create("new-item-tmp",'<li id="new-detail" >                                {{video_embed}}                                <img src={{image}} class="jumbo" id="new-item-image"><br/>                                <div class="clear_both"></div>                                <small class="onright">{{published_at}}</small>                                <br/>                                <p><h1>{{title}}</h1></p>                                <blockquote><small class="small_visible">{{header}}</small></blockquote>                                <p>{{body}}</p>                           </li><li></li>');
a.View.Template.create("products-tmp",'<li id="product-{{id}}"  class="selectable">                              <a href="#a-product" data-target="article" request_item_id="{{id}}">                                <img src={{image}} class="product" >                                <b>{{name}}</b>                                <div class="onright" style="margin-top: 10px;"><span class="icon mini right"></span></div>                                <small>{{price}}</small>                                <div class="clear_both"></div>                              </a>                           </li>');
a.View.Template.create("product-tmp",'<li id="product-detail">                              <p align="center"><img src="{{image_big}}" class="jumbo" width="100%" align="center""></p>                              <br/><p><h1>{{name}}</h1></p>                              <blockquote><small class="small_visible">{{description}}</small></blockquote>                              <p><b>Preu:</b> {{price}}</p>                              <p><b>Ref:</b> {{ref}}</p><br/>                         </li>');
a.View.Template.create("stars-tmp",'<li class="anchor" >&nbsp;<span class="icon star"></span> Sparta Cup {{year}}</li>                             <li>{{players}}</li>');a.View.Template.create("stars-header-tmp",'<li><p align="center"><img src="{{image}}" class="jumbo"></p></li>');a.View.Template.create("sponsor-type-tmp",'<li class="anchor" >&nbsp;<span class="icon tag"></span>{{sponsor_type}}</li>');a.View.Template.create("sponsor-tmp","<li class='selectable'>                               <img src='{{image_medium}}' class='product'>                                <div class='onright' style='margin-top: 7px;'>                                  <span class='icon mini right'></span>                               </div>                               <p style='margin-right: 15px; margin-top:5px; text-align: right;'>                                 <a href='{{url}}'><b>{{name}}</b></a>                               </p>                               <div class='clear_both'></div></li>");
a.View.Template.create("sponsor-main-tmp","<li  class='selectable'>                                <a href='{{url}}'>                                  <p align='center'>                                    <b>{{name}}</b><br/>                                    <img src='{{image_big}}' class='jumbo'>                                  </p>                                </a>                                <div class='clear_both'></div>                              </li>");a.View.Template.create("stats-days-menu-tmp",
'<li class="selectable">                                <a href="#a-matches" data-target="article" class="tournament_day" request_item_id="{{day}}" data-title="Partits del {{day}}">                                  <span class="calendar icon"></span>                                  <div class="onright" style="margin-top: 10px;"><span class="icon mini right"></span></div>                                  {{day}}                                  <small>Partits i resultats</small>                                </a>                               </li>');
a.View.Template.create("stats-pool-menu-tmp",'<li class="selectable">                                <a href="#a-stats" data-target="article" data-title="Classificaci\u00f3 pools">                                  <span class="icon chart"></span>                                  <div class="onright" style="margin-top: 10px;"><span class="icon mini right"></span></div>                                  Classificaci\u00f3                                  <small>Pools i classificacions</small>                                </a>                               </li>');
a.View.Template.create("stats-pool-header-tmp",'<li class="anchor">{{pool_name}}</li>');a.View.Template.create("stats-pool-table-header-tmp",'<li class="tip dark">                                  <table width="100%" >                                  <tr >                                    <td width="16%" class="right"></td>                                    <td width="8%" class="header-stats">G</td>                                    <td width="8%" class="header-stats">P</td>                                    <td width="8%" class="header-stats">W</td>                                    <td width="8%" class="header-stats">L</td>                                    <td width="8%" class="header-stats">T</td>                                    <td width="11%" class="header-stats">OTW</td>                                    <td width="11%" class="header-stats">OTL</td>                                    <td width="8%" class="header-stats">GF</td>                                    <td width="8%" class="header-stats">GA</td>                                    <td width="8%" class="header-stats">+/-</td>                                    </tr>                                </table>                                </li>');
a.View.Template.create("stats-pool-tmp",'<li>                                <table width="100%" border="1">                                  <tr>                                    <td width="16%"><img src="{{team_logo_mini}}"></td>                                    <td width="8%" class="value-stats">{{win}}</td>                                    <td width="8%" class="value-stats">{{played}}</td>                                    <td width="8%" class="value-stats">{{win}}</td>                                    <td width="8%" class="value-stats">{{lose}}</td>                                    <td width="8%" class="value-stats">{{tied}}</td>                                    <td width="11%" class="value-stats">{{otw}}</td>                                    <td width="11%" class="value-stats">{{otl}}</td>                                    <td width="8%" class="value-stats">{{gf}}</td>                                    <td width="8%" class="value-stats">{{ga}}</td>                                    <td width="8%" class="value-stats">{{difgoals}}</td>                                    </tr>                                  </table>                                  <div class="clear_both"></div>                              </li>');
a.View.Template.create("matches-tmp",'<li>                                  <div class="onright count bubble" >{{time}}</div>                                  <small>{{description}}</small>                                  <table width="100%">                                    <tr>                                      <td class="value-stats" width="40%">                                         <img  src="{{home_logo_medium}}" alt="{{home_team}}" class="match"></td>                                      <td class="center middle"  width="20%"><b>vs</b></td>                                      <td class="value-stats" width="40%">                                         <img  src="{{visitor_logo_medium}}" alt="{{visitor_team}}" class="match"></td>                                      </td>                                    </tr>                                    <tr>                                      <td class="match_result">{{home_goals}}</td>                                      <td class="center middle" ><small><- resultat -></small></td>                                      <td class="match_result">{{visitor_goals}}</td>                                    </tr>                                  </table>                               </li>');
a.View.Template.create("current-match-tmp",'<li id="current_match">                                  <div class="onright count bubble" >Actualitzat: {{last_request_at_hour}}</div>                                  En aquest moments:                                  <small>{{description}}</small>                                  <table width="100%">                                    <tr>                                      <td class="value-stats" width="35%">                                         <img  src="{{local_team_logo_medium}}" alt="{{local_team_name}}" class="match"></td>                                      <td class="center middle"  width="30%"><b>vs</b></td>                                      <td class="value-stats" width="35%">                                         <img  src="{{visitor_team_logo_medium}}" alt="{{visitor_team_name}}" class="match"></td>                                      </td>                                    </tr>                                    <tr>                                      <td class="match_result" id="home_goals">{{local_team_goals}}</td>                                      <td class="center middle" >                                        <div class="count bubble">Gol: {{last_goal}}</div>                                      </td>                                      <td class="match_result" id="visitor_goals">{{visitor_team_goals}}</td>                                    </tr>                                  </table>                                  <a href="#" class="button big " id="refresh_match"><span class="icon refresh" style="float:none;"></span><abbr>Refrescar</abbr></a>                               </li>');
return{}}(LUNGO,App);
