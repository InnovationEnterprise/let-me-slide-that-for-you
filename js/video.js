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

  thisPlayer = videojs(slideMe.thisVideoPlayer);

  // get ads if available

  if (slideMe.data.adTagUrl !== undefined) {

    var options = {

      id: 'videojs',
      adTagUrl: slideMe.data.adTagUrl

    };

    slideMe.loadAssets('../build/slidemeads.css', 'css');

    slideMe.loadAssets('//imasdk.googleapis.com/js/sdkloader/ima3.js', 'script', function (){

      slideMe.loadAssets('../build/slidemeads.js', 'script', function() {

        thisPlayer.ima(options);
        thisPlayer.ima.initializeAdDisplayContainer();
        thisPlayer.ima.requestAds();
        console.log('ad script loaded');

      });
      
    });



  }

  thisPlayer.ready(function() {

    slideMe.thisPlayer = this;

    slideMe.setSize();

    window.onresize = slideMe.throttle(slideMe.setSize, 200);

    console.log('player created');

    if (slideMe.data.videoslidestype === 'html') {

      preloaderWrapper.remove();
      slideMeContainer.style.overflow = 'visible';

    }

    if (slideMe.data.autoplay !== undefined && slideMe.data.autoplay !== 'false') {
      thisPlayer.play();

    }

    // if (slideMe.data.videoslides !== undefined) {

    //   document.getElementsByTagName('video')[0].addEventListener('timeupdate', slideMe.throttle(setNewSlide, 1000));

    // }

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