var slideMe;
(function(){
slideMe = slideMe || {};
slideMe.getHead = document.getElementsByTagName('head')[0];
slideMe.timeList = [];
slideMe.currentArrayNr = '00';
slideMe.contentReady = false;
slideMe.videoready = false;
slideMe.isreloading = false;
slideMe.DOM = {};
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
if (document.all && !window.atob) {
    "document"in self&&("classList"in document.createElement("_")?function(){var a=document.createElement("_");a.classList.add("c1","c2");if(!a.classList.contains("c2")){var c=function(a){var e=DOMTokenList.prototype[a];DOMTokenList.prototype[a]=function(a){var c,d=arguments.length;for(c=0;c<d;c++)a=arguments[c],e.call(this,a)}};c("add");c("remove")}a.classList.toggle("c3",!1);if(a.classList.contains("c3")){var k=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(a,c){return 1 in arguments&&
  !this.contains(a)===!c?c:k.call(this,a)}}a=null}():function(a){if("Element"in a){a=a.Element.prototype;var c=Object,k=String.prototype.trim||function(){return this.replace(/^\s+|\s+$/g,"")},n=Array.prototype.indexOf||function(f){for(var b=0,a=this.length;b<a;b++)if(b in this&&this[b]===f)return b;return-1},e=function(f,b){this.name=f;this.code=DOMException[f];this.message=b},g=function(f,b){if(""===b)throw new e("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(b))throw new e("INVALID_CHARACTER_ERR",
  "String contains an invalid character");return n.call(f,b)},l=function(f){for(var b=k.call(f.getAttribute("class")||""),b=b?b.split(/\s+/):[],a=0,c=b.length;a<c;a++)this.push(b[a]);this._updateClassName=function(){f.setAttribute("class",this.toString())}},d=l.prototype=[],m=function(){return new l(this)};e.prototype=Error.prototype;d.item=function(a){return this[a]||null};d.contains=function(a){return-1!==g(this,a+"")};d.add=function(){var a=arguments,b=0,c=a.length,d,e=!1;do d=a[b]+"",-1===g(this,
  d)&&(this.push(d),e=!0);while(++b<c);e&&this._updateClassName()};d.remove=function(){var a=arguments,b=0,c=a.length,d,e=!1,h;do for(d=a[b]+"",h=g(this,d);-1!==h;)this.splice(h,1),e=!0,h=g(this,d);while(++b<c);e&&this._updateClassName()};d.toggle=function(a,b){a+="";var c=this.contains(a),d=c?!0!==b&&"remove":!1!==b&&"add";if(d)this[d](a);return!0===b||!1===b?b:!c};d.toString=function(){return this.join(" ")};if(c.defineProperty){d={get:m,enumerable:!0,configurable:!0};try{c.defineProperty(a,"classList",
  d)}catch(p){-2146823252===p.number&&(d.enumerable=!1,c.defineProperty(a,"classList",d))}}else c.prototype.__defineGetter__&&a.__defineGetter__("classList",m)}}(self));
}

// Get Helpers here

// display errors

slideMe.errorThat = function (thisError, thisContainer) {
  var errorDiv = 'Player error:<br>' + thisError + '';
  thisContainer.classList.add('slideme-error');
  thisContainer.innerHTML = errorDiv;
  slideMe.checkifready = null;
  slideMe.error = true;
};

// Helper for adding elements attributes

slideMe.addAttributes = function (element, attribute) {
  for (var value in attribute) {
    if (attribute.hasOwnProperty(value)) {
     element.setAttribute(value, attribute[value]);
    }
  }
};

// Remove slideme

slideMe.destroy = function() {

    slideMe.thisPlayer.dispose();
    slideMe.slideMeContainer.remove();
    slideMe = undefined;

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


// function for loading assets

slideMe.loadAssets = function (url, type, fn) {

  var getBody = document.getElementsByTagName('body')[0];
  var getAssets;

  if (type === 'css') {
    getAssets = document.createElement('link');
    getAssets.href = url;
    getAssets.rel = 'stylesheet';
    getAssets.type = 'text/css';
    getBody.appendChild(getAssets);
    if (fn) {
      getAssets.onload = function(){
        fn();
      };
    }
  } else {

    if (navigator.appVersion.indexOf("MSIE 10") === -1) {

      getAssets = document.createElement('script');
      getAssets.src = url;
      getAssets.async = true;
      getAssets.type = 'text/javascript';
      getBody.appendChild(getAssets);

      if (fn) {
        getAssets.onload = function(){
          fn();
        };
      }

    } else {

      getAssets = new XMLHttpRequest();
      getAssets.open("GET", url);
      getAssets.onreadystatechange=function() {
        if (getAssets.readyState==4 && getAssets.status==200) {
          JSON.parse(getAssets.responseText);
          if (fn) {
            fn();
          }
        }
      };
      getAssets.send();

    }


  }

};

// Reload slideme with new config json

slideMe.reload = function (jsonUrl) {

  slideMe.isreloading = true;

  if (slideMe.thisPlayer) {
    slideMe.thisPlayer.pause();
    slideMe.thisPlayer.dispose();
    videojs = null;
    slideMe.thisPlayer = null;
  }

  while(slideMe.slideMeContainer.firstChild) {
    slideMe.slideMeContainer.removeChild(slideMe.slideMeContainer.firstChild);
  }


  slideMe.contentReady = false;
  slideMe.videoready = false;

  slideMe.DOM = [];

  slideMe.slideMeContainer.className = '';
  slideMe.slideMeContainer.style.overflow = 'hidden';

  slideMe.checkifready();

  slideMe.addPreloader();
  slideMe.loadJson(jsonUrl);

};


// Check if slideme is ready

slideMe.checkifready = function(){
 var slideMeInterval =  setInterval(function(){
    if (slideMe.error === true || typeof slideMe === 'undefined') {
      clearInterval(slideMeInterval);
    } else {
      if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {
        if (!slideMe.data.videoslides) {
          slideMe.contentReady = true;
        }
        if (slideMe.contentReady && slideMe.videoready) {
          if (slideMe.data.videoslides && !slideMe.data.syncoff && !slideMe.data.slideshare){
            slideMe.thisPlayer.on('timeupdate', slideMe.throttle(slideMe.setNewSlide, 500));
          }
          if (slideMe.data.videoslides === 'images' && (slideMe.data.videosourcesmobile || slideMe.data.videosources)) {
            slideMe.slideMeContainer.style.overflow = 'hidden';
          } else {
            slideMe.slideMeContainer.style.overflow = 'visible';
          }

          if (slideMe.data.videoslides) {
            slideMe.sliderClickEvent(slideMe.firstImage, true);
          }
          if (slideMe.DOM.preloaderWrapper) {
            slideMe.DOM.preloaderWrapper.remove();
          }
          clearInterval(slideMeInterval);
          slideMe.isreloading = false;
        }
      } else {
        if (slideMe.contentReady) {
          if (slideMe.DOM.preloaderWrapper) {
            slideMe.DOM.preloaderWrapper.remove();
          }
          slideMe.isreloading = false;
        }
      }

    }

  }, 100);
};

var insertSpiner = document.createElement('style');
insertSpiner.innerHTML = '[data-slidemejs] {font-family: Helvetica, Arial, sans-serif;position:relative;height:500px}#slideme-preloader{position:absolute;top:0;bottom:0;left:0;right:0;padding:15% 0 0;background:#fff;z-index:50;color:#000;text-align:center}#slideme-preloader:after{content:"Loading, please wait...";font-size:12px;font-weight:100;display:block}@keyframes slideMeSpinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@-webkit-keyframes slideMeSpinner{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}.icon-spinner{-webkit-animation:slideMeSpinner .75s linear infinite;animation:slideMeSpinner 2s linear infinite;font-size:20px;line-height:50px;width:50px;height:50px;cursor:default;text-align:center;color:#000}';
slideMe.getHead.appendChild(insertSpiner);

slideMe.addPreloader = function () {

  var preloaderDom = '<i class="icon-spinner">.</i>';
  slideMe.DOM.preloaderWrapper = document.createElement('div');
  slideMe.DOM.preloaderWrapper.setAttribute('id', 'slideme-preloader');
  slideMe.DOM.preloaderWrapper.innerHTML = preloaderDom;
  slideMe.slideMeContainer.appendChild(slideMe.DOM.preloaderWrapper);

};

slideMe.createDOM = function () {

  // create video dom

    var createVideoPlayer = document.createElement('div');
    createVideoPlayer.setAttribute('id', 'slideme-wrapper');

    if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {

      slideMe.DOM.thisVideoPlayer = document.createElement('video');

      slideMe.inarticle = slideMe.slideMeContainer.getAttribute('data-inarticle');

      if (slideMe.inarticle === 'true') {
        slideMe.addAttributes(slideMe.DOM.thisVideoPlayer, {'id': 'videojs'});
      } else {
        slideMe.addAttributes(slideMe.DOM.thisVideoPlayer, {'id': 'videojs', 'controls': ''});
      }

      var videoSources;

      if (slideMe.data.videosourcesmobile) {
        videoSources = slideMe.data.videosourcesmobile;
      } else {
        videoSources = slideMe.data.videosources;
      }

      if (slideMe.data.subtitles) {

        for (var i = 0; i < slideMe.data.subtitles.length; i++) {

          var createSubtitleNode = document.createElement('track');

          slideMe.addAttributes(createSubtitleNode, {
            'src' : slideMe.data.subtitles[i].src,
            'srclang' : slideMe.data.subtitles[i].srclang,
            'label' : slideMe.data.subtitles[i].label
          });

          if (slideMe.data.subtitles[i].default === true) {
            createSubtitleNode.setAttribute('default', '');
          }

          slideMe.DOM.thisVideoPlayer.appendChild(createSubtitleNode);

        }

      }


      slideMe.slideMeContainer.appendChild(slideMe.DOM.thisVideoPlayer);

      if (slideMe.data.youtube !== 'true') {
        for (var value in videoSources) {
          if (videoSources.hasOwnProperty(value)) {
            var createVideoSource = document.createElement("source");
            slideMe.addAttributes(createVideoSource, {
              "src": videoSources[value],
              "type": value
            });
            slideMe.DOM.thisVideoPlayer.appendChild(createVideoSource);
          }
        }

      slideMe.fireVideJs();

      } else {

          slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.3/slidemeyt.js', 'script', function() {
            slideMe.fireVideJs();
          });


      }

    }

};

slideMe.loadJson = function (jsonUrl) {

  var request = new XMLHttpRequest();

  request.open('GET', jsonUrl);

  request.onload = function() {

    slideMe.checkifready();

    if (request.readyState == 4 && request.status == 200) {

      slideMe.data = JSON.parse(request.responseText);

      if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {
        var videojsurl = '//vjs.zencdn.net/4.12.11/video.js';
        slideMe.loadAssets(videojsurl, 'script', function() {
          console.log("videojsurl");
          slideMe.createDOM();
        });
      }

      if (slideMe.data.videoslides || slideMe.data.slideshare) {
        slideMe.getSlides();
      }

      if (slideMe.data.playlist) {
        slideMe.playList();
      }

      console.log('json fetched');

    } else {
      slideMe.errorThat('cannot connect', slideMe.slideMeContainer);
    }

  };

  request.onerror = function() {

    slideMe.errorThat('cannot connect', slideMe.slideMeContainer);
  };

  request.send();

};


slideMe.playList = function () {

  if (document.getElementById('slideme-playlist') !== null) {
    slideMe.DOM.createPlaylist = document.getElementById('slideme-playlist');
  } else {
    slideMe.DOM.createPlaylist = document.createElement('div');
    slideMe.DOM.createPlaylist.setAttribute('id', 'slideme-playlist');
    slideMe.slideMeContainer.appendChild(slideMe.DOM.createPlaylist);
  }

  slideMe.DOM.createPlaylist.innerHTML = '<div id="slideme-playlist-title">Playlist<div id="slideme-playlist-drop">></div></div><div id="slideme-playlist-list"></div>';

  var playListTitle = document.getElementById('slideme-playlist-title');
  var playListList = document.getElementById('slideme-playlist-list');

  if (slideMe.data.playlist) {
    playListData = slideMe.data.playlist;
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
      newElemnt.setAttribute('target', '_blank');
      playListList.appendChild(newElemnt);
    }

  }

  var open = false;
  playListTitle.addEventListener('click', function() {

    if (!open) {
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
  slideMe.DOM.createPlaylist.remove();
  return false;
};

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

      slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.3/slidemeads.css', 'css');

      slideMe.loadAssets('//imasdk.googleapis.com/js/sdkloader/ima3.js', 'script', function (){
        slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.3/slidemeads.js', 'script', function() {

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

slideMe.getSlides = function () {

  if (slideMe.data.videoslidestype === 'images' || slideMe.data.slideshare) {
    slideMe.DOM.presentationNode = document.createElement('div');
    slideMe.DOM.presentationNode.setAttribute('id', 'slideme-container');
    slideMe.slideMeContainer.appendChild(slideMe.DOM.presentationNode);
  }

  if (!slideMe.data.slideshare) {
    slideMe.DOM.createImgContainer = document.createElement('div');
    slideMe.DOM.createImgContainer.setAttribute('id', 'slideme-list');
    slideMe.DOM.createImgContainerWrapper = document.createElement('div');
    slideMe.DOM.createImgContainerWrapper.setAttribute('id', 'slideme-list-wrapper');
    slideMe.slideMeContainer.appendChild(slideMe.DOM.createImgContainerWrapper);
  }

  if (slideMe.data.videoslidestype === 'images' || slideMe.data.slideshare) {

    if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {
      slideMe.slideMeContainer.classList.add('slideme-images');
    } else {
      slideMe.slideMeContainer.classList.add('slideme-images-only');
    }

    if (!slideMe.data.slideshare) {
      var createButtons = '<div id="slideme-btn-prev"><i class="icon-prevslide"><</i></div><div id="slideme-btn-next"><i class="icon-nextslide">></i></div>';
      slideMe.DOM.createImgContainerWrapper.innerHTML = createButtons;
      slideMe.loadImages();
    } else {
      if (!slideMe.data.videosources || !slideMe.data.videosourcesmobile) {
        slideMe.contentReady = true;
      }
    }

  } else {

    var createHtmlPresentationNav = document.createElement('div');
    createHtmlPresentationNav.setAttribute('id', 'slideme-html-nav');
    createHtmlPresentationNav.innerHTML = '<div id="slideme-html-nav-left"><</div><div id="slideme-html-nav-right">></div>';
    slideMe.DOM.createImgContainerWrapper.appendChild(createHtmlPresentationNav);

    slideMe.slideMeContainer.classList.add('slideme-html');
    slideMe.DOM.presentationNode = slideMe.DOM.createImgContainerWrapper;
    slideMe.setContent(false);

  }

  if (!slideMe.data.slideshare) {
    slideMe.DOM.createImgContainerWrapper.appendChild(slideMe.DOM.createImgContainer);
  }

  if (slideMe.data.slideshare) {
    slideMe.DOM.presentationNode.innerHTML = slideMe.data.slideshare;
    var getSlideShareIframe = slideMe.DOM.presentationNode.getElementsByTagName('iframe')[0];
    getSlideShareIframe.style.width = '100%';
    getSlideShareIframe.style.height = '100%';
    slideMe.DOM.presentationNode.style.overflow = 'hidden';
    slideMe.contentReady = true;
  }

};

slideMe.setNewSlide = function() {
  if (slideMe.isreloading) {
    return false;
  }
  var getCurrentTime = Math.round(slideMe.thisPlayer.currentTime());
  var arrayNr;

  for (var i = 0; i < slideMe.timeList.length; i++) {   

    if (getCurrentTime >= slideMe.timeList[i]) {
      arrayNr = slideMe.timeList[i];
    }

  }
  if (slideMe.currentArrayNr !== arrayNr) {

    slideMe.currentArrayNr = arrayNr;

    var getSlideFromDom = document.querySelectorAll('[data-slideme-time="' + arrayNr + '"]')[0];

    if (slideMe.data.videoslidestype === 'images') {
      if (getSlideFromDom !== getSlideFromDom) {
        slideMe.DOM.createImgContainer.style.left =  150 - getSlideFromDom.offsetLeft + 'px';
      } else { 
        slideMe.DOM.createImgContainer.style.left =  50 - getSlideFromDom.offsetLeft + 'px' ;
      }
      slideMe.firstImage.setAttribute('src', getSlideFromDom.getAttribute('src'));
    } else {
      var slideMeAllSlides = document.querySelectorAll('[data-slideme-time]');
      for (var i = 0; i < slideMeAllSlides.length; i++) {
        if (slideMeAllSlides[i].classList.contains('slideme-img-active')) {
          slideMeAllSlides[i].classList.remove('slideme-img-active');
        }
      }
      getSlideFromDom.classList.add('slideme-img-active');
    }

  }

};

slideMe.setSize = function() {

    var sW = slideMe.slideMeContainer.parentNode.offsetWidth;

    var isThisFixed = slideMe.slideMeContainer.classList.contains('this-fixed');

    if (isThisFixed) {
      sW = window.innerWidth;
    }

    var sH;
    var vW = sW;

    var vH;

    var slideMeParent = slideMe.slideMeContainer.parentNode;
    var slideMeParentWidth = slideMeParent.offsetWidth;

    if (!slideMe.data.videosourcesmobile && !slideMe.data.videosources) {

      sH = 480;

    } else {

      if (slideMe.slideMeContainer.getAttribute('data-wide') === 'true') {

        sW = slideMeParentWidth / 2;
        sH = sW * 0.67;

        vW = sW;
        vH = sW * 0.67;

      } else {

        sW = sW / 2;
        sH = sW / 1.78;

        vW = sW;
        vH = sH;

        sW = sH * 1.33;
      }


    }


    if (!slideMe.data.videoslides && !slideMe.data.slideshare) {

      vH = vW  / 1.78;

    } else {

      var adsContainer = document.getElementById('ima-ad-container');

      if (adsContainer !== null) {

        adsContainer.style.width = vW + 'px';
        adsContainer.style.height = vH + 'px';

        document.getElementById('ima-seek-bar-div').style.width = vW + 'px';

        adsContainer.getElementsByTagName('iframe')[0].style.width = vW + 'px';
        adsContainer.getElementsByTagName('iframe')[0].style.height = vH + 'px';

      }

      slideMe.DOM.presentationNode.style.width = sW + 'px';
      slideMe.DOM.presentationNode.style.height = sH + 'px';

      if (slideMe.data.videoslidestype === 'images') {
        slideMe.slideMeContainer.style.height = vH + 75 + 'px';
      } else {
        slideMe.slideMeContainer.style.height = vH + 'px';
      }

    }
    
    slideMe.slideMeContainer.style.width = vW + sW + 'px';

    var slideMeHeaderOne = document.getElementById('slideme-h1');

    if (!slideMe.data.videoslides && !slideMe.data.slideshare && slideMe.slideMeContainer.parentNode.offsetWidth >= 900) {

      vW = vW * 1.2;
      vH = vW / 1.78;
      if (slideMeHeaderOne !== null) {
        slideMeHeaderOne.style.maxWidth = vW + 'px';
      }
      
    } else {
      if (slideMeHeaderOne !== null) {
        slideMeHeaderOne.style.maxWidth = vW + sW + 'px';
      }
    }

    if (slideMe.slideMeContainer.parentNode.offsetWidth <= 770) {
      
      if (!isThisFixed) {
        if (slideMe.DOM.presentationNode) {
          slideMe.DOM.presentationNode.style.display = 'none';
          if (!slideMe.data.slideshare) {
            document.getElementById('slideme-list-wrapper').style.display = 'none';
          }
        }
        vW = slideMe.slideMeContainer.offsetWidth;
        vH = vW / 1.78;
      }

      slideMe.slideMeContainer.style.height = vH + 'px';

    } else {

      if (slideMe.DOM.presentationNode) {
        slideMe.DOM.presentationNode.style.display = 'block';
        if (!slideMe.data.slideshare) {
          document.getElementById('slideme-list-wrapper').style.display = 'block';
          document.getElementById('slideme-list-wrapper').style.bottom = '0px';
        }
      }

    }

    if (!slideMe.data.videoslides && !slideMe.data.slideshare) {
      slideMe.slideMeContainer.style.height = vH + 'px';
    }

    if (slideMe.thisPlayer) {
      slideMe.thisPlayer.dimensions(vW, vH);
    }


};

slideMe.loadImages = function () {

  var ajaxImgCount = 0;
  var videoSlidesLength =  slideMe.data.videoslides.length;

  function getAllImages(i) {

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
      slideMe.errorThat('cannot load image', slideMe.slideMeContainer);
    };

  }

  for (var i = 0; i < videoSlidesLength; i++) {
    getAllImages(i);
  }

};
slideMe.sliderClickEvent = function (firstImage, ready) {

  slideMe.addClicks = document.querySelectorAll('[data-slideme-time]');
  slideMe.addClicks[0].classList.add('slideme-img-active');

  function addClicksFn() {

    if (ready && !slideMe.data.syncoff) {
      var duration = slideMe.thisPlayer.duration();
      if (slideMe.data.videosourcesmobile && duration > 10 || slideMe.data.videosources && duration > 10) {
        var thisTime = this.getAttribute('data-slideme-time');
        slideMe.thisPlayer.currentTime(thisTime);
        slideMe.thisPlayer.play();
      }
    }

    if (slideMe.data.videoslidestype === 'images' && this !== slideMe.addClicks[0]) {
      slideMe.DOM.createImgContainer.style.left = 150 - this.offsetLeft + 'px';
    }

    if (slideMe.data.videoslidestype === 'images') {
      firstImage.setAttribute('src', this.getAttribute('src'));
    }

    document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
    this.classList.add('slideme-img-active');

  }

  for (var g = 0; g < slideMe.addClicks.length; g++) {
    slideMe.addClicks[g].addEventListener('click', addClicksFn, false);
  }

  if (slideMe.data.videoslidestype === 'images') {
    var animated = false;
    var imgContainerWidth = 100 * slideMe.data.videoslides.length;

    document.getElementById('slideme-btn-next').addEventListener('click', function() {
      var imgContainerPosition = slideMe.DOM.createImgContainer.offsetLeft;
      if (animated === false && imgContainerPosition > - imgContainerWidth + 500) {
        animated = true;
        slideMe.DOM.createImgContainer.style.left = imgContainerPosition - 200 + 'px';
        setTimeout(function(){
          animated = false;
        }, 325);
      }
    }, false);

    document.getElementById('slideme-btn-prev').addEventListener('click', function() {
      var imgContainerPosition = slideMe.DOM.createImgContainer.offsetLeft;
      if (!animated && imgContainerPosition < 50) {
        animated = true;
        var slideThatMuch;
        if (imgContainerPosition < -50) {
          slideThatMuch = 200;
        } else {
          slideThatMuch = 100;
        }
        slideMe.DOM.createImgContainer.style.left = imgContainerPosition + slideThatMuch + 'px';
        setTimeout(function(){
          animated = false;
        }, 325);
      }
    }, false);

  }

};

slideMe.embed = function() {
  var embedNode = document.createElement('div');
  embedNode.setAttribute('id', 'slideme-share');
  var embedCode = document.createTextNode('<div data-slidemejs="' + slideMe.getSlideMeUrl + '"></div> <script src="//d3gr29hczmiozh.cloudfront.net/0.1.3/slideme.min.js" async></script>');
  embedNode.innerHTML = '<div id="slideme-embed-close">x</div><div id="slideme-title">Embed<p>Copy and paste the code below into your website</p></div><textarea id="slideme-code"></textarea>';
  slideMe.slideMeContainer.appendChild(embedNode);
  document.getElementById('slideme-code').appendChild(embedCode);

  document.getElementById('slideme-embed-close').addEventListener('click', function() {
    embedNode.style.display = "none";
  });

  document.getElementsByTagName('html')[0].addEventListener('click', function() {
    embedNode.style.display = "none";
  });

  var button = slideMe.thisPlayer.addChild('button', {
    text: 'Embed'
  });
  document.getElementById('slideme-code').addEventListener('click', function(e){
    e.stopPropagation();
  });
  button.addClass('slideme-emebed-btn');
  button.on('click', function(e) {
    e.stopPropagation();
    embedNode.style.display = "block";
  });

};

slideMe.setContent = function (isImg) {

  var videoSlides = slideMe.data.videoslides;
  var contentNumber = 0;
  var createSlideNode;

  if (!slideMe.data.slideshare) {

    for (var i = 0; i < videoSlides.length; i++) {

      var thisContent = videoSlides[i].slidecontent;

      if (videoSlides[i].timemin === '') {
        videoSlides[i].timesec = '0';
      }
      if (videoSlides[i].timesec === '') {
        videoSlides[i].timesec = '0';
      }

      var thisContentTime = 60 * videoSlides[i].timemin + parseInt(videoSlides[i].timesec);

      if (isImg) {
        createSlideNode = document.createElement('img');
        slideMe.addAttributes(createSlideNode, {
          'src': thisContent,
          'data-slideme-time': thisContentTime
        });
        slideMe.DOM.createImgContainer.style.width = 100 * slideMe.data.videoslides.length + 'px';
      } else {
        createSlideNode = document.createElement('div');
        createSlideNode.innerHTML = '<div class="slideme-list-content">' + thisContent + '</div>';
        createSlideNode.setAttribute('data-slideme-time', thisContentTime);
      }

      slideMe.timeList.push(thisContentTime);
      slideMe.DOM.createImgContainer.appendChild(createSlideNode);
      contentNumber = contentNumber + 1;

      if (contentNumber === videoSlides.length) {
        slideMe.contentReady = true;
      }

    }

  }

  // set first slide

  if (isImg) {
    slideMe.firstImage = new Image();
    slideMe.firstImage.src = videoSlides[0].slidecontent;
    slideMe.DOM.presentationNode.appendChild(slideMe.firstImage);
    slideMe.slideMeContainer.style.overflow = 'visible';
  }

  console.log('slider content set');

  if (slideMe.data.videoslidestype === 'html') {

    var setSlideMeNav = true;


    document.getElementById('slideme-html-nav-left').addEventListener('click', function() {
      var slideMeAllSlides = document.querySelectorAll('[data-slideme-time]');
      for (var i = 0; i < slideMeAllSlides.length; i++) {
        if (slideMeAllSlides[i].classList.contains('slideme-img-active') && i !== 0) {
          slideMeAllSlides[i].classList.remove('slideme-img-active');
          i = i - 1;
          slideMeAllSlides[i].classList.add('slideme-img-active');
          slideMe.thisPlayer.currentTime(slideMeAllSlides[i].getAttribute('data-slideme-time'));
          slideMe.thisPlayer.play();
        }
      }
    });

    document.getElementById('slideme-html-nav-right').addEventListener('click', function() {
      var slideMeAllSlides = document.querySelectorAll('[data-slideme-time]');
      for (var i = 0; i < slideMeAllSlides.length; i++) {
        if (slideMeAllSlides[i].classList.contains('slideme-img-active') && i < slideMeAllSlides.length - 1) {
          slideMeAllSlides[i].classList.remove('slideme-img-active');
          i = i + 1;
          slideMeAllSlides[i].classList.add('slideme-img-active');
          slideMe.thisPlayer.currentTime(slideMeAllSlides[i].getAttribute('data-slideme-time'));
          slideMe.thisPlayer.play();
        }
      }
    });

  }

  if (!slideMe.data.videosourcesmobile && !slideMe.data.videosources && slideMe.data.videoslidestype !== 'html') {
    slideMe.sliderClickEvent(slideMe.firstImage, false);
  } else if (!slideMe.data.videosourcesmobile && !slideMe.data.videosources && slideMe.data.videoslidestype !== 'images') {
    slideMe.sliderClickEvent(slideMe.firstImage, false);
  }

  slideMe.contentReady = true;

};

slideMe.fullscreen = function() {

  var slidemefullscreen = slideMe.thisPlayer.controlBar.addChild('button', {
    text: 'Full screen'
  });
  slidemefullscreen.addClass('slideme-fullscreen-btn');

  var fullscreenon = false;

  slidemefullscreen.on('click', function() {

    if (!fullscreenon) {

      fullscreenon = true;

      slideMe.slideMeContainer.classList.add('this-fixed');
      slideMe.slideMeContainer.classList.add('full-mobile');

      var fullScreen = document.createElement('div');
      fullScreen.setAttribute('id', 'slideme-fullscreen');
      var fullScreenClose = document.createElement('div');
      fullScreenClose.setAttribute('id', 'slideme-close-popup');
      fullScreenClose.innerHTML = 'x';
      slideMe.slideMeContainer.appendChild(fullScreen);
      slideMe.slideMeContainer.appendChild(fullScreenClose);

      slideMe.DOM.presentationNode.style.display = 'block';

      if (!slideMe.data.slideshare) {
        document.getElementById('slideme-list-wrapper').style.display = 'block';
        slideMe.DOM.presentationNode.style.height = parseFloat(slideMe.slideMeContainer.style.height) + 'px';
        document.getElementById('slideme-list-wrapper').style.bottom = - 75 + 'px';
      } else {
        slideMe.DOM.presentationNode.style.height = '100%';
      }

      if (slideMe.DOM.presentationNode) {
        slideMe.DOM.presentationNode.style.display = 'block';
        if (!slideMe.data.slideshare) {
          document.getElementById('slideme-list-wrapper').style.display = 'block';
        }
      }


      var removeFullScr = function() {
        fullScreen.remove();
        fullScreenClose.remove();
        slideMe.slideMeContainer.classList.remove('this-fixed');
        slideMe.slideMeContainer.classList.remove('full-mobile');
        if (!slideMe.data.slideshare) {
          if (slideMe.slideMeContainer.parentNode.offsetWidth <= 770) {
              document.getElementById('slideme-list-wrapper').style.display = 'none';
            } else {
              document.getElementById('slideme-list-wrapper').style.display = 'block';
            }
          }
        slideMe.slideMeContainer.style.marginTop = 0 + 'px';
        slideMe.slideMeContainer.style.marginLeft = 'auto';

        fullscreenon = false;
        slideMe.setSize();
      };



      document.getElementById('slideme-close-popup').addEventListener('click', removeFullScr, false);
      document.getElementById('slideme-fullscreen').addEventListener('click', removeFullScr, false);

    }

  });

};

document.addEventListener('DOMContentLoaded', function() {

  var checkAllSlideme = document.querySelectorAll('[data-slidemejs]');

  slideMe.startupSlideme = function (thiSlideme) {
    thiSlideme.classList.add('slideme-loaded');
    slideMe.slideMeContainer = thiSlideme;
    slideMe.addPreloader();
    slideMe.getSlideMeUrl = slideMe.slideMeContainer.getAttribute('data-slidemejs');
    if (/^http?:\/\//.test(slideMe.getSlideMeUrl)) {
      slideMe.getSlideMeUrl = slideMe.getSlideMeUrl.replace(/^https?:\/\//,'https://');
    }
    slideMe.loadJson(slideMe.getSlideMeUrl);
  };


  function startupLoop(){
   for (var i = 0; i < checkAllSlideme.length; i++) {
      if (!checkAllSlideme[i].classList.contains('slideme-loaded') && !checkAllSlideme[i].classList.contains('slideme-request')) {
        slideMe.startupSlideme(checkAllSlideme[i]);
        return false;
      }
    }
  }

  if (!slideMe.firstLoad) {
    slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.3/slidemecss.min.css', 'css', function(){
      slideMe.firstLoad = true;
      startupLoop();
    });
  } else {
    startupLoop();
  }

});

})();