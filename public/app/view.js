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
                                  <small>#{{match_num}} - {{description}}</small>\
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
                                  <small>#{{match_num}} - {{description}}</small>\
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
