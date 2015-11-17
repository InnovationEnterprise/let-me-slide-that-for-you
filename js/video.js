slideMe.fireVideJs = function () {

  // player settings

  if (slideMe.data.preload === undefined || '') {

    slideMe.data.preload = 'metadata';

  }

  if (slideMe.data.poster === undefined || '') {

    slideMe.data.poster = '';

  }

  slideMe.addAttributes(slideMe.DOM.thisVideoPlayer, {

    'class': 'video-js vjs-default-skin',
    'poster': slideMe.data.poster,
    'preload': slideMe.data.preload

  });


  if (slideMe.data.youtube === 'true') {
    slideMe.thisPlayer = videojs(slideMe.DOM.thisVideoPlayer, { "techOrder": ["youtube"], "src": "" + slideMe.data.videosources + ""});
  } else {
    slideMe.thisPlayer = videojs(slideMe.DOM.thisVideoPlayer);
  }

  // get ads if available
  if (slideMe.data.youtube !== 'true' && !document.all && window.atob) {

    var thisChannel = slideMe.slideMeContainer.getAttribute('data-adtag');

    if (slideMe.data.adTagUrl !== undefined || thisChannel) {

      var options;
      if (thisChannel === null || thisChannel === '') {
        options = {
          id: 'videojs',
          adTagUrl: slideMe.data.adTagUrl
        };
      } else {
        options = {
          id: 'videojs',
          adTagUrl: thisChannel
        };
      }

      slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.1/slidemeads.css', 'css');

      slideMe.loadAssets('//imasdk.googleapis.com/js/sdkloader/ima3.js', 'script', function (){
        slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.1/slidemeads.js', 'script', function() {

          slideMe.thisPlayer.ima(options);
          slideMe.thisPlayer.ima.initializeAdDisplayContainer();
          slideMe.thisPlayer.ima.requestAds();
          console.log('ad script loaded');

          if (slideMe.inarticle === 'true') {

            slideMe.thisPlayer.play();
            var checIfAdRdy = setInterval(pauseAd, 10);

            var pauseAd =function () {
                slideMe.thisPlayer.ima.pauseAd();
            };

            slideMe.thisPlayer.on("adsready", function(){
              setTimeout(function(){
                clearInterval(checIfAdRdy);
              }, 1500);
            });

            slideMe.thisPlayer.on("ended", function(){
              slideMe.thisPlayer.play();
              slideMe.thisPlayer.ima.requestAds();
              slideMe.thisPlayer.ima.start();
              var checIfAdRdy = setInterval(pauseAd, 10);
              slideMe.thisPlayer.on("adsready", function(){
                setTimeout(function(){
                  clearInterval(checIfAdRdy);
                }, 1500);
              });
            });

          }
        });
      });

    }
  }

  // video player ready function
  slideMe.thisPlayer.ready(function() {

    slideMe.setSize();

    window.onresize = slideMe.throttle(slideMe.setSize, 200);

    document.addEventListener('orientationchange', function() {
      slideMe.setSize();
    });

    console.log('player created');

    // fix for double play button on iphone
    if (navigator.userAgent.match(/iPhone/i)) {
      document.getElementsByClassName('vjs-big-play-button')[0].style.display = 'none';
    }

    if (slideMe.data.autoplay) {
      slideMe.thisPlayer.play();
    }

    if (slideMe.slideMeContainer.parentNode.offsetWidth >= 400) {
      slideMe.embed();
    }

    if (slideMe.slideMeContainer.parentNode.offsetWidth <= 900 && slideMe.data.videoslides || slideMe.slideMeContainer.parentNode.offsetWidth <= 900 && slideMe.data.slideshare) {
      slideMe.fullscreen();
    }

    if (slideMe.slideMeContainer.parentNode.offsetWidth <= 400) {
      document.getElementsByClassName('vjs-big-play-button')[0].style.top = '25%';
      document.getElementsByClassName('vjs-big-play-button')[0].style.left = '0';
    }

    if (document.getElementById('slideme-h1') === null && slideMe.slideMeContainer.getAttribute('data-interview') !== 'true' && slideMe.data.youtube !== 'true') {
      var slidemeVjstitle = slideMe.thisPlayer.addChild('button');
      slidemeVjstitle.addClass('slideme-vjs-title');
      document.getElementsByClassName('slideme-vjs-title')[0].innerHTML = slideMe.data.title;
    }

    slideMe.videoready = true;

  });

};
