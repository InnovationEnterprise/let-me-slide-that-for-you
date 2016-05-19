letSlide.fireVideJs = function () {

  // player settings
  if (letSlide.data.preload === undefined || '') {
    letSlide.data.preload = 'metadata';
  }

  if (letSlide.data.poster === undefined || '') {
    letSlide.data.poster = '';
  }

  letSlide.addAttributes(letSlide.DOM.thisVideoPlayer, {
    'class': 'video-js vjs-default-skin',
    'poster': letSlide.data.poster,
    'preload': letSlide.data.preload
  });


  if (letSlide.data.youtube === 'true') {
    letSlide.thisPlayer = videojs(letSlide.DOM.thisVideoPlayer, { "techOrder": ["youtube"], "src": "" + letSlide.data.videosources + ""});
  } else {
    letSlide.thisPlayer = videojs(letSlide.DOM.thisVideoPlayer);
  }

  // get ads if available
  if (letSlide.data.youtube !== 'true' && !document.all && window.atob) {
    letSlide.ads();
  }

  // video player ready function
  letSlide.thisPlayer.ready(function() {


    console.log('player created');

    // fix for double play button on iphone
    if (navigator.userAgent.match(/iPhone/i)) {
      document.getElementsByClassName('vjs-big-play-button')[0].style.display = 'none';
    }

    if (letSlide.letSlideContainer.parentNode.offsetWidth >= 400 && letSlide.inarticle !== 'true') {
      letSlide.embed();
    }

    if (letSlide.letSlideContainer.parentNode.offsetWidth <= 900 && letSlide.data.videoslides || letSlide.letSlideContainer.parentNode.offsetWidth <= 900 && letSlide.data.slideshare) {
      letSlide.fullScreen();
    }

    if (letSlide.letSlideContainer.parentNode.offsetWidth <= 400) {
      document.getElementsByClassName('vjs-big-play-button')[0].style.top = '25%';
      document.getElementsByClassName('vjs-big-play-button')[0].style.left = '0';
    }

    if (document.getElementById('letSlide-h1') === null && letSlide.letSlideContainer.getAttribute('data-interview') !== 'true' && letSlide.data.youtube !== 'true' && letSlide.inarticle !== 'true') {
      var letSlideVjstitle = letSlide.thisPlayer.addChild('button');
      letSlideVjstitle.addClass('letSlide-vjs-title');
      document.getElementsByClassName('letSlide-vjs-title')[0].innerHTML = letSlide.data.title;
    }

    setTimeout(function(){
      letSlide.setSize();
      window.onresize = letSlide.throttle(letSlide.setSize, 200);
      document.addEventListener('orientationchange', function() {
        letSlide.setSize();
      });
      letSlide.videoready = true;
    }, 100);

  });

};
