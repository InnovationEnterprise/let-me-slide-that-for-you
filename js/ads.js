letSlide.ads = function() {
  var thisChannel = letSlide.letSlideContainer.getAttribute('data-adtag');

  if (letSlide.data.adTagUrl !== undefined || thisChannel) {

    var options;
    if (thisChannel === null || thisChannel === '') {
      options = {
        id: 'videojs',
        adTagUrl: letSlide.data.adTagUrl
      };
    } else {
      options = {
        id: 'videojs',
        adTagUrl: thisChannel
      };
    }

    letSlide.loadAssets('http://127.0.0.1:8080/build/letSlideads.css', 'css');

    letSlide.loadAssets('//imasdk.googleapis.com/js/sdkloader/ima3.js', 'script', function (){
      letSlide.loadAssets('http://127.0.0.1:8080/build/letSlideads.js', 'script', function() {

        letSlide.thisPlayer.ima(options);
        letSlide.thisPlayer.ima.initializeAdDisplayContainer();
        letSlide.thisPlayer.ima.requestAds();
        console.log('ad script loaded');

        if (letSlide.inarticle === 'true') {

          letSlide.thisPlayer.play();
          var checIfAdRdy = setInterval(pauseAd, 10);

          var pauseAd =function () {
              letSlide.thisPlayer.ima.pauseAd();
          };

          letSlide.thisPlayer.on("adsready", function(){
            setTimeout(function(){
              clearInterval(checIfAdRdy);
            }, 1500);
          });

          letSlide.thisPlayer.on("ended", function(){
            letSlide.thisPlayer.play();
            letSlide.thisPlayer.ima.requestAds();
            letSlide.thisPlayer.ima.start();
            var checIfAdRdy = setInterval(pauseAd, 10);
            letSlide.thisPlayer.on("adsready", function(){
              setTimeout(function(){
                clearInterval(checIfAdRdy);
              }, 1500);
            });
          });

        }
      });
    });

  }
};
