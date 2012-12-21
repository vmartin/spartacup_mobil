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
    

    var _getEnvironmentFromQuoJS = (function() {
        var environment = lng.Core.environment();
        if (environment.isMobile) {
           // alert('Your phone is ' + environment.os.name + ' (' + environment.os.version + ')');
        }
    })();


    return {

    };

})(LUNGO);
