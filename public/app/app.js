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
