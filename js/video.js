slideMe.fireVideJs = function () {


  // player settings

  if (slideMe.data.preload === undefined || '') {

    slideMe.data.preload = 'metadata';

  }

  if (slideMe.data.poster === undefined || '') {

    slideMe.data.poster = '';

  }

  slideMe.addAttributes(slideMe.thisVideoPlayer, {

    'class': 'video-js vjs-default-skin',
    'poster': slideMe.data.poster,
    'preload': slideMe.data.preload

  });


  if (slideMe.data.youtube === 'true') {
    slideMe.thisPlayer = videojs(slideMe.thisVideoPlayer, { "techOrder": ["youtube"], "src": "" + slideMe.data.videosources + ""});
  } else {
    slideMe.thisPlayer = videojs(slideMe.thisVideoPlayer);
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

      slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/slidemeads.css', 'css');
  
      slideMe.loadAssets('//imasdk.googleapis.com/js/sdkloader/ima3.js', 'script', function (){
  
        slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/slidemeads.js', 'script', function() {
  
          slideMe.thisPlayer.ima(options);
          slideMe.thisPlayer.ima.initializeAdDisplayContainer();
          slideMe.thisPlayer.ima.requestAds();
          console.log('ad script loaded');
  
        });
        
      });
  
    }
  }
  slideMe.thisPlayer.ready(function() {

    slideMe.setSize();

    window.onresize = slideMe.throttle(slideMe.setSize, 200);

    document.addEventListener('orientationchange', function() {
      slideMe.setSize();
    });

    console.log('player created');

    if (slideMe.data.videoslidestype === 'html' && slideMe.slideMeContainer.getAttribute('data-interview') !== 'true') {
      document.getElementById('slideme-preloader').style.display = 'none';
      slideMe.slideMeContainer.style.overflow = 'visible';
    }

    if (slideMe.data.videoslides === undefined && slideMe.slideMeContainer.getAttribute('data-interview') !== 'true') {
      document.getElementById('slideme-preloader').style.display = 'none';
    }

    if (slideMe.data.videoslides !== undefined){
        document.getElementsByTagName('video')[0].addEventListener('timeupdate', slideMe.throttle(slideMe.setNewSlide, 500));
    }

    if (slideMe.data.autoplay !== undefined && slideMe.data.autoplay !== 'false') {
      slideMe.thisPlayer.play();
    }

    var checkifready = setInterval(function(){
      if (typeof slideMe === 'undefined') {
        clearInterval(checkifready);
      } else {
        if (slideMe.contentReady === true) {
          slideMe.sliderClickEvent(slideMe.firstImage, true);
          clearInterval(checkifready);
        }
      }
    }, 100);

    if (slideMe.data.autoplay !== 'false' && slideMe.slideMeContainer.parentNode.offsetWidth >= 400) {
      slideMe.embed();
    }

    if (slideMe.slideMeContainer.parentNode.offsetWidth <= 900 && slideMe.data.videoslides !== undefined) {
      slideMe.fullscreen();
    }

    if (slideMe.slideMeContainer.parentNode.offsetWidth <= 400) {
      document.getElementsByClassName('vjs-big-play-button')[0].style.top = '25%';
      document.getElementsByClassName('vjs-big-play-button')[0].style.left = '0';
    }

    if (document.getElementById('slideme-h1') === null && slideMe.slideMeContainer.getAttribute('data-interview') !== 'true' && slideMe.data.youtube !== 'true') {

      slidemeVjstitle = slideMe.thisPlayer.addChild('button');
      slidemeVjstitle.addClass('slideme-vjs-title');
      document.getElementsByClassName('slideme-vjs-title')[0].innerHTML = slideMe.data.title;

    }


    // if (slideMe.data.videosources && slideMe.data.videosourcesmobile !== undefined) {

    //   var createQualityNode = document.createElement('div');
    //   createQualityNode.setAttribute('id', 'slideme-quality');
    //   var thisTypeUrl = thisPlayer.src();
    //   var findThatType = slideMe.thisPlayer.querySelectorAll('[src="' + thisTypeUrl + '"]')[0];
    //   findThatType = findThatType.getAttribute('type');

    //   var videoHigh;
    //   var videoLow;

    //   for (var sourceType in slideMe.data.videosources) {
    //     if (sourceType === findThatType) {
    //       videoHigh = slideMe.data.videosources[sourceType];
    //     }
    //   }
    //   for (var sourceTypeMobile in slideMe.data.videosourcesmobile) {
    //     if (sourceTypeMobile === findThatType) {
    //       videoLow = slideMe.data.videosourcesmobile[sourceTypeMobile];
    //     }
    //   }

    //   createQualityNode.innerHTML = '<div id="slideme-change-quality">Auto</div><div id="slideme-change-quality-list"><p data-quality="' + videoHigh + '">High</p><p data-quality="' + videoLow + '">Low</p></div>';
    //   document.getElementsByClassName('vjs-control-bar')[0].appendChild(createQualityNode);

    //   var showHide = false;
    //   var showHideQualityNode = document.getElementById('slideme-change-quality-list');

    //   var getNewSource = function() {

    //     var thisTime = thisPlayer.currentTime();
    //     var src = this.getAttribute('data-quality');
    //     document.getElementById('slideme-change-quality').innerHTML = this.innerHTML;
    //     thisPlayer.src(src);
    //     thisPlayer.currentTime(thisTime);
    //     thisPlayer.play();

    //     showHide = false;
    //     showHideQualityNode.style.display = 'none';

    //   };

    //   document.querySelectorAll('[data-quality]')[0].addEventListener('click', getNewSource);

    //   document.querySelectorAll('[data-quality]')[1].addEventListener('click', getNewSource);

    //   document.getElementById('slideme-change-quality').addEventListener('click', function() {

    //     if (showHide === false) {
    //       showHide = true;
    //       showHideQualityNode.style.display = 'block';
    //     } else {
    //       showHide = false;
    //       showHideQualityNode.style.display = 'none';
    //     }

    //   });

    //   slideMe.thisPlayer.addEventListener('click', function() {

    //     showHide = false;
    //     showHideQualityNode.style.display = 'none';

    //   });

    // }


  });

};