var slideMe = slideMe || {};
var slideMeContainer;
var getHead = document.getElementsByTagName('head')[0];
var isMobile = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i);
var thisVideoPlayer;
slideMe.timeList = [];


// var thisPlayerEl;
// var isVideoSlide;
// var haveSource;
// var timeList = [];
// var addClicks;
// var createImgContainer;
// var firstImage;
// var preloaderWrapper;
// var playListData;
// var createImgContainerWrapper;
slideMe.errorThat = function (thisError, thisContainer) {
  var errorDiv = 'Player error:<br>' + thisError + '';
  thisContainer.setAttribute('class', 'slideme-error');
  thisContainer.innerHTML = errorDiv;
  slideMe = null;
};


slideMe.addAttributes = function (element, attribute) {
  for (var value in attribute) {
    if (attribute.hasOwnProperty(value)) {
     element.setAttribute(value, attribute[value]);
    }
  }
};

// Remy throttle fn

slideMe.throttle = function (fn, threshhold, scope) {
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date(),
        args = arguments;
    if (last && now < last + threshhold) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};


slideMe.loadAssets = function (url, type, fn) {

  var getBody = document.getElementsByTagName('body')[0];
  var getAssets;

  if (type === 'css') {
    getAssets = document.createElement('link');
    getAssets.href = url;
    getAssets.rel = 'stylesheet';
    getAssets.type = 'text/css';
  } else {
    getAssets = document.createElement('script');
    getAssets.src = url;
    getAssets.async = true;
    getAssets.type = 'text/javascript';
  }

  getBody.appendChild(getAssets);

  if (fn !== undefined) {
    getAssets.onload = function(){
      fn();
    };
  }

};
slideMe.createDOM = function () {

  // create video dom

    var createVideoPlayer = document.createElement('div');
    createVideoPlayer.setAttribute('id', 'slideme-wrapper');   

    if (slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined) {

      slideMe.thisVideoPlayer = document.createElement('video');

      
      slideMe.addAttributes(slideMe.thisVideoPlayer, {'id': 'videojs', 'controls': ''});

      var videoSources;

      if (isMobile !== null) {
        videoSources = slideMe.data.videosourcesmobile;
      } else {
        videoSources = slideMe.data.videosources;
      }
    
      slideMeContainer.appendChild(slideMe.thisVideoPlayer);

      for (var value in videoSources) {
        if (videoSources.hasOwnProperty(value)) {
          var createVideoSource = document.createElement("source");
          slideMe.addAttributes(createVideoSource, {
            "src": videoSources[value],
            "type": value
          });
          slideMe.thisVideoPlayer.appendChild(createVideoSource);
        }
      }
      
      if (slideMe.data.subtitles !== undefined) {

        for (var i = 0; i < slideMe.data.subtitles.length; i++) {

          var createSubtitleNode = document.createElement('track');

          slideMe.addAttributes(createSubtitleNode, {
            'src' : slideMe.data.subtitles[i].src, 
            'srclang' : slideMe.data.subtitles[i].srclang,
            'label' : slideMe.data.subtitles[i].label
          });          

          if (slideMe.data.subtitles[i].default === 'true') {
            createSubtitleNode.setAttribute('default', '');
          }

          slideMe.thisVideoPlayer.appendChild(createSubtitleNode);

        }

      }

      slideMe.fireVideJs();

    }


};

slideMe.loadJson = function (jsonUrl) {

  var request = new XMLHttpRequest();
  request.open('GET', jsonUrl, true);

  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {

      slideMe.data = JSON.parse(request.responseText); 

      if (slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined) {
        slideMe.loadAssets('//vjs.zencdn.net/4.11.2/video.js', 'script', function(){
          slideMe.createDOM();
        });
      }

      if (slideMe.data.videoslides !== undefined) {
        slideMe.getSlides();
      }

      console.log('json fetched');
      
    } else {

      slideMe.errorThat('cannot connect', slideMeContainer);

    }

  };

  request.onerror = function() {
    slideMe.errorThat('cannot connect', slideMeContainer);
  };

  request.send();

};

slideMe.reload = function (jsonUrl) {

    videojs.dispose();

    while(slideMeContainer.firstChild) {
      slideMeContainer.removeChild(slideMeContainer.firstChild);
    }

    addPreloader();
    loadJson(jsonUrl);

};
var insertSpiner = document.createElement('style');
insertSpiner.innerHTML = '[data-slidemejs] {font-family: Helvetica, Arial, sans-serif;position:relative;height:500px}#slideme-preloader{position:absolute;top:0;bottom:0;left:0;right:0;padding:15% 0 0;background:#fff;z-index:100;color:#000;text-align:center}#slideme-preloader:after{content:"Loading, please wait...";font-size:12px;font-weight:100;display:block}@keyframes slideMeSpinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@-webkit-keyframes slideMeSpinner{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}.icon-spinner{-webkit-animation:slideMeSpinner .75s linear infinite;animation:slideMeSpinner 2s linear infinite;font-size:20px;line-height:50px;width:50px;height:50px;cursor:default;text-align:center;color:#000}';
getHead.appendChild(insertSpiner);

slideMe.addPreloader = function () {

  var preloaderDom = '<i class="icon-spinner">.</i>';
  slideMe.preloaderWrapper = document.createElement('div');
  slideMe.preloaderWrapper.setAttribute('id', 'slideme-preloader');
  slideMe.preloaderWrapper.innerHTML = preloaderDom;
  slideMeContainer.appendChild(slideMe.preloaderWrapper);

};


slideMe.playList = function () {

  var createPlaylist;

  if (document.getElementById('slideme-playlist') !== null) {

    createPlaylist = document.getElementById('slideme-playlist');

  } else {

    createPlaylist = document.createElement('div');
    createPlaylist.setAttribute('id', 'slideme-playlist');

  }

  createPlaylist.innerHTML = '<div id="slideme-playlist-title">Playlist<div id="slideme-playlist-drop">></div></div><div id="slideme-playlist-list"></div>';
  slideMeContainer.appendChild(createPlaylist);

  slideMeContainer.style.margin = '0 auto 50px auto';


  var playListTitle = document.getElementById('slideme-playlist-title');
  var playListList = document.getElementById('slideme-playlist-list');

  if (data.playlist !== undefined) {
    playListData = data.playlist;
  }

  function playlistReloadClick() {

    slideMe.reload(this.getAttribute('data-json'));
    return false;

  }

  for (var i = 0; i < playListData.length; i++) {

    var newElemnt;

    if (playListData[i].type === 'json') {

      newElemnt = document.createElement('p');
      newElemnt.innerHTML = playListData[i].title;
      newElemnt.setAttribute('data-json', playListData[i].link);

      playListList.appendChild(newElemnt);

      newElemnt.addEventListener('click', playlistReloadClick);

    } else {

      newElemnt = document.createElement('a');
      newElemnt.innerHTML = playListData[i].title;
      newElemnt.setAttribute('href', playListData[i].link);

      playListList.appendChild(newElemnt);

    }

  }

  var open = false;
  playListTitle.addEventListener('click', function() {

    if (open === false) {

      open = true;
      playListList.style.display = 'block';
      playListTitle.classList.add('slideme-drop-active');

    } else {

      open = false;
      playListList.style.display = 'none';
      playListTitle.classList.remove('slideme-drop-active');

    }

  });

};


slideMe.destroyPlaylist = function() {

  document.getElementById('slideme-playlist').remove();

};

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
      slideMe.preloaderWrapper.remove();
      slideMeContainer.style.overflow = 'visible';
    }

    if (slideMe.data.videoslides === undefined) {
      slideMe.preloaderWrapper.remove();
    } else {
      document.getElementsByTagName('video')[0].addEventListener('timeupdate', slideMe.throttle(slideMe.setNewSlide, 500));
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
slideMe.getSlides = function () {

  slideMe.presentationNode = document.createElement('div');
  slideMe.presentationNode.setAttribute('id', 'slideme-container');
  slideMeContainer.appendChild(slideMe.presentationNode);

  slideMe.createImgContainer = document.createElement('div');
  slideMe.createImgContainer.setAttribute('id', 'slideme-list');


  var createImgContainerWrapper = document.createElement('div');
  createImgContainerWrapper.setAttribute('id', 'slideme-list-wrapper');

  slideMeContainer.appendChild(createImgContainerWrapper);

  if (slideMe.data.videoslidestype === 'images') {

    var createButtons = '<div id="slideme-btn-prev"><i class="icon-prevslide"><</i></div><div id="slideme-btn-next"><i class="icon-nextslide">></i></div>';
    createImgContainerWrapper.innerHTML = createButtons;

    if (slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined) {
      slideMeContainer.setAttribute('class', 'slideme-images');
    } else {
      slideMeContainer.setAttribute('class', 'slideme-images-only');
    }
    

    slideMe.loadImages();

  } else {

    createImgContainerWrapper.setAttribute('class', 'slideme-text');

    var createHtmlPresentationNav = document.createElement('div');
    createHtmlPresentationNav.setAttribute('id', 'slideme-html-nav');
    createHtmlPresentationNav.innerHTML = '<div id="slideme-html-nav-left"><</div><div id="slideme-html-nav-right">></div>';
    createImgContainerWrapper.appendChild(createHtmlPresentationNav);

    slideMeContainer.setAttribute('class', 'slideme-html');

  }

  createImgContainerWrapper.appendChild(slideMe.createImgContainer);

};
slideMe.setNewSlide = function() {

  var currentArrayNr = '00';

  var getCurrentTime = Math.round(thisPlayer.currentTime());
  var arrayNr;

  for (var i = 0; i < slideMe.timeList.length; i++) {   

    if (getCurrentTime >= slideMe.timeList[i]) {
      arrayNr = slideMe.timeList[i];
    }

  }



  if (currentArrayNr !== arrayNr) {

    currentArrayNr = arrayNr;

    var getSlideFromDom = document.querySelectorAll('[data-slideme-time="' + arrayNr + '"]')[0];

    if (slideMe.data.videoslidestype === 'images') {
      
      if (getSlideFromDom !== slideMe.addClicks[0]) {

        slideMe.createImgContainer.style.left =  150 - getSlideFromDom.offsetLeft + 'px';

      } else { 

        slideMe.createImgContainer.style.left =  50 - getSlideFromDom.offsetLeft + 'px' ;

      }

      slideMe.firstImage.setAttribute('src', getSlideFromDom.getAttribute('src'));

    } else {

      slideMe.createImgContainer.style.top = - getSlideFromDom.offsetTop + 'px';

    }

    document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
    getSlideFromDom.setAttribute('class', 'slideme-img-active');

  }

};

slideMe.setSize = function() {

    var sW = slideMeContainer.parentNode.offsetWidth;
    var sH;

    var vW = sW;
    var vH;

    if (slideMe.data.videosourcesmobile === undefined && slideMe.data.videosources === undefined) {

      sH = 480;

    } else {

      sW = sW / 2;
      sH = sW / 1.78;

      vW = sW;
      vH = sH;

      sW = sH * 1.33;

    }


    if (slideMe.data.videoslides === undefined) {

      vH = vW / 1.78;

    } else {

      slideMe.presentationNode.style.width = sW + 'px';
      slideMe.presentationNode.style.height = sH + 'px';

      slideMeContainer.style.height = vH + 75 + 'px';

    }

    slideMe.thisPlayer.dimensions(vW, vH);
    
    slideMeContainer.style.width = vW + sW + 'px';

};

slideMe.loadImages = function () {

  var ajaxImgCount = 0;
  var videoSlidesLength =  slideMe.data.videoslides.length;

  for (var i = 0; i < videoSlidesLength; i++) {

    (function() {

      var thisImg = slideMe.data.videoslides[i].slidecontent;

      var reqImg = new Image();

      reqImg.src = thisImg;

      reqImg.onload = function() {

        ajaxImgCount = ajaxImgCount + 1;

        if (ajaxImgCount === videoSlidesLength) {

          slideMe.setContent(true);

        }

      };

      reqImg.onerror = function() {

        errorThat('cannot load image', slideMeContainer);

      };

    })();

  }

};
slideMe.sliderClickEvent = function (firstImage, ready) {

  slideMe.addClicks = document.querySelectorAll('[data-slideme-time]');
  slideMe.addClicks[0].setAttribute('class', 'slideme-img-active');

  function addClicksFn() {

    if (ready === true) {
      var duration = thisPlayer.duration();
      if (slideMe.data.videosourcesmobile && duration > 10 || slideMe.data.videosources && duration > 10) {
        var thisTime = this.getAttribute('data-slideme-time');
        thisPlayer.currentTime(thisTime);
        thisPlayer.play();
      }
    }

    if (slideMe.data.videoslidestype === 'images' && this !== slideMe.addClicks[0]) {
      slideMe.createImgContainer.style.left = 150 - this.offsetLeft + 'px';
    }

    if (slideMe.data.videoslidestype === 'images') {
      firstImage.setAttribute('src', this.getAttribute('src'));
    }

    document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
    this.setAttribute('class', 'slideme-img-active');

  }

  for (var g = 0; g < slideMe.addClicks.length; g++) {

    slideMe.addClicks[g].addEventListener('click', addClicksFn, false);

  }

};
slideMe.setContent = function (isImg) {

  var videoSlides = slideMe.data.videoslides;

  for (var i = 0; i < videoSlides.length; i++) {

    var thisContent = videoSlides[i].slidecontent;

    if (videoSlides[i].timemin === '') {
      videoSlides[i].timesec = '0';
    }
    if (videoSlides[i].timesec === '') {
      videoSlides[i].timesec = '0';
    }

    var thisContentTime = 60 * videoSlides[i].timemin + parseInt(videoSlides[i].timesec);
    var createSlideNode;
    
    if (isImg) {

      createSlideNode = document.createElement('img');
      slideMe.addAttributes(createSlideNode, {
        'src': thisContent,
        'data-slideme-time': thisContentTime
      });
      imgContainerWidth = 100 * videoSlides.length;
      slideMe.createImgContainer.style.width = imgContainerWidth + 'px';


    } else {

      createSlideNode = document.createElement('div');
      createSlideNode.innerHTML = '<div class="slideme-list-content">' + thisContent + '</div>';
      createSlideNode.setAttribute('data-slideme-time', thisContentTime);

    }

    slideMe.timeList.push(thisContentTime);

    slideMe.createImgContainer.appendChild(createSlideNode);

  }

  // set first slide


  if (isImg) {

    var getFirstImg = videoSlides[0].slidecontent;
    slideMe.firstImage = document.createElement('img');
    slideMe.firstImage.setAttribute('src', getFirstImg);
    slideMe.presentationNode.appendChild(slideMe.firstImage);

    slideMe.preloaderWrapper.remove();
    slideMeContainer.style.overflow = 'visible';

  }

  console.log('slider content set');

  if (slideMe.data.videoslidestype === 'html') {

    var setSlideMeNav = true;

    document.getElementById('slideme-html-nav-left').addEventListener('click', function() {

      var top = slideMe.createImgContainer.offsetTop;

      if (top < 0 && setSlideMeNav === true) {

        slideMe.createImgContainer.style.top = slideMe.createImgContainer.offsetTop + 360 + 'px';

        setSlideMeNav = false;

        setTimeout(function() {
          setSlideMeNav = true;
        }, 350);

      }

    });

    document.getElementById('slideme-html-nav-right').addEventListener('click', function() {

      var top = slideMe.createImgContainer.offsetTop;
      var height = slideMe.createImgContainer.offsetHeight;

      if (top > -height + 360 && setSlideMeNav === true) {

        slideMe.createImgContainer.style.top = slideMe.createImgContainer.offsetTop - 360 + 'px';

        setSlideMeNav = false;

        setTimeout(function() {
          setSlideMeNav = true;
        }, 350);

      }

    });

  }

  if (!slideMe.data.videosourcesmobile && !slideMe.data.videosources) {
    slideMe.sliderClickEvent(slideMe.firstImage, false);
  } else {
    thisPlayer.ready(function() {
      slideMe.sliderClickEvent(slideMe.firstImage, true);
    });
  }
  

};
document.addEventListener('DOMContentLoaded', function() {

  slideMeContainer = document.querySelectorAll('[data-slidemejs]')[0];

  slideMe.addPreloader();

  slideMe.loadAssets('../build/slidemecss.min.css', 'css', function(){
  
    if (slideMeContainer !== undefined && slideMeContainer.getAttribute('data-slidemejs') !== '') {
      slideMe.loadJson(slideMeContainer.getAttribute('data-slidemejs'));
    }

  });

});