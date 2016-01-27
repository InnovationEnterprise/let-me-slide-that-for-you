var letSlide;var slideMe = letSlide;
(function(){
letSlide = letSlide || {};
letSlide.getHead = document.getElementsByTagName('head')[0];
letSlide.timeList = [];
letSlide.currentArrayNr = '00';
letSlide.contentReady = false;
letSlide.videoready = false;
letSlide.isreloading = false;
letSlide.DOM = {};
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

letSlide.errorThat = function (thisError, thisContainer) {
  var errorDiv = 'Player error:<br>' + thisError + '';
  thisContainer.classList.add('letSlide-error');
  thisContainer.innerHTML = errorDiv;
  letSlide.checkifready = null;
  letSlide.error = true;
};

// Helper for adding elements attributes

letSlide.addAttributes = function (element, attribute) {
  for (var value in attribute) {
    if (attribute.hasOwnProperty(value)) {
     element.setAttribute(value, attribute[value]);
    }
  }
};

// Remove letSlide

letSlide.destroy = function() {

    letSlide.thisPlayer.dispose();
    letSlide.letSlideContainer.remove();
    letSlide = undefined;

};

// Remy throttle fn

letSlide.throttle = function (fn, threshhold, scope) {
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

letSlide.loadAssets = function (url, type, fn) {

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

// Reload letSlide with new config json

letSlide.reload = function (jsonUrl) {

  letSlide.isreloading = true;

  if (letSlide.thisPlayer) {
    letSlide.thisPlayer.pause();
    letSlide.thisPlayer.dispose();
    videojs = null;
    letSlide.thisPlayer = null;
  }

  while(letSlide.letSlideContainer.firstChild) {
    letSlide.letSlideContainer.removeChild(letSlide.letSlideContainer.firstChild);
  }


  letSlide.contentReady = false;
  letSlide.videoready = false;

  letSlide.DOM = [];

  letSlide.letSlideContainer.className = '';
  letSlide.letSlideContainer.style.overflow = 'hidden';

  letSlide.checkifready();

  letSlide.addPreloader();
  letSlide.loadJson(jsonUrl);

};


// Check if letSlide is ready

letSlide.checkifready = function(){
 var letSlideInterval =  setInterval(function(){
    if (letSlide.error === true || typeof letSlide === 'undefined') {
      clearInterval(letSlideInterval);
    } else {
      if (letSlide.data.videosourcesmobile || letSlide.data.videosources) {
        if (!letSlide.data.videoslides) {
          letSlide.contentReady = true;
        }
        if (letSlide.contentReady && letSlide.videoready) {
          if (letSlide.data.videoslides && !letSlide.data.syncoff && !letSlide.data.slideshare){
            letSlide.thisPlayer.on('timeupdate', letSlide.throttle(letSlide.setNewSlide, 500));
          }
          if (letSlide.data.videoslides === 'images' && (letSlide.data.videosourcesmobile || letSlide.data.videosources)) {
            letSlide.letSlideContainer.style.overflow = 'hidden';
          } else {
            letSlide.letSlideContainer.style.overflow = 'visible';
          }

          if (letSlide.data.videoslides) {
            letSlide.sliderClickEvent(letSlide.firstImage, true);
          }
          if (letSlide.DOM.preloaderWrapper) {
            letSlide.DOM.preloaderWrapper.remove();
          }
          clearInterval(letSlideInterval);
          letSlide.isreloading = false;
        }
      } else {
        if (letSlide.contentReady) {
          if (letSlide.DOM.preloaderWrapper) {
            letSlide.DOM.preloaderWrapper.remove();
          }
          letSlide.isreloading = false;
        }
      }

    }

  }, 100);
};

var insertSpiner = document.createElement('style');
insertSpiner.innerHTML = '[data-letSlidejs] {font-family: Helvetica, Arial, sans-serif;position:relative;height:500px}#letSlide-preloader{position:absolute;top:0;bottom:0;left:0;right:0;padding:15% 0 0;background:#fff;z-index:50;color:#000;text-align:center}#letSlide-preloader:after{content:"Loading, please wait...";font-size:12px;font-weight:100;display:block}@keyframes letSlideSpinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@-webkit-keyframes letSlideSpinner{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}.icon-spinner{-webkit-animation:letSlideSpinner .75s linear infinite;animation:letSlideSpinner 2s linear infinite;font-size:20px;line-height:50px;width:50px;height:50px;cursor:default;text-align:center;color:#000}';
letSlide.getHead.appendChild(insertSpiner);

letSlide.addPreloader = function () {

  var preloaderDom = '<i class="icon-spinner">.</i>';
  letSlide.DOM.preloaderWrapper = document.createElement('div');
  letSlide.DOM.preloaderWrapper.setAttribute('id', 'letSlide-preloader');
  letSlide.DOM.preloaderWrapper.innerHTML = preloaderDom;
  letSlide.letSlideContainer.appendChild(letSlide.DOM.preloaderWrapper);

};

letSlide.createDOM = function () {

  // create video dom

    var createVideoPlayer = document.createElement('div');
    createVideoPlayer.setAttribute('id', 'letSlide-wrapper');

    if (letSlide.data.videosourcesmobile || letSlide.data.videosources) {

      letSlide.DOM.thisVideoPlayer = document.createElement('video');

      letSlide.inarticle = letSlide.letSlideContainer.getAttribute('data-inarticle');

      if (letSlide.inarticle === 'true') {
        letSlide.addAttributes(letSlide.DOM.thisVideoPlayer, {'id': 'videojs'});
      } else {
        letSlide.addAttributes(letSlide.DOM.thisVideoPlayer, {'id': 'videojs', 'controls': ''});
      }

      var videoSources;

      if (letSlide.data.videosourcesmobile) {
        videoSources = letSlide.data.videosourcesmobile;
      } else {
        videoSources = letSlide.data.videosources;
      }

      if (letSlide.data.subtitles) {

        for (var i = 0; i < letSlide.data.subtitles.length; i++) {

          var createSubtitleNode = document.createElement('track');

          letSlide.addAttributes(createSubtitleNode, {
            'src' : letSlide.data.subtitles[i].src,
            'srclang' : letSlide.data.subtitles[i].srclang,
            'label' : letSlide.data.subtitles[i].label
          });

          if (letSlide.data.subtitles[i].default === true) {
            createSubtitleNode.setAttribute('default', '');
          }

          letSlide.DOM.thisVideoPlayer.appendChild(createSubtitleNode);

        }

      }


      letSlide.letSlideContainer.appendChild(letSlide.DOM.thisVideoPlayer);

      if (letSlide.data.youtube !== 'true') {
        for (var value in videoSources) {
          if (videoSources.hasOwnProperty(value)) {
            var createVideoSource = document.createElement("source");
            letSlide.addAttributes(createVideoSource, {
              "src": videoSources[value],
              "type": value
            });
            letSlide.DOM.thisVideoPlayer.appendChild(createVideoSource);
          }
        }

      letSlide.fireVideJs();

      } else {

          letSlide.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.5/letSlideyt.js', 'script', function() {
            letSlide.fireVideJs();
          });


      }

    }

};

letSlide.loadJson = function (jsonUrl) {

  var request = new XMLHttpRequest();

  request.open('GET', jsonUrl);

  request.onload = function() {

    letSlide.checkifready();

    if (request.readyState == 4 && request.status == 200) {

      letSlide.data = JSON.parse(request.responseText);

      if (letSlide.data.videosourcesmobile || letSlide.data.videosources) {
        var videojsurl = '//vjs.zencdn.net/4.12.11/video.js';
        letSlide.loadAssets(videojsurl, 'script', function() {
          console.log("videojsurl");
          letSlide.createDOM();
        });
      }

      if (letSlide.data.videoslides || letSlide.data.slideshare) {
        letSlide.getSlides();
      }

      if (letSlide.data.playlist) {
        letSlide.playList();
      }

      console.log('json fetched');

    } else {
      letSlide.errorThat('cannot connect', letSlide.letSlideContainer);
    }

  };

  request.onerror = function() {

    letSlide.errorThat('cannot connect', letSlide.letSlideContainer);
  };

  request.send();

};


letSlide.playList = function () {

  if (document.getElementById('letSlide-playlist') !== null) {
    letSlide.DOM.createPlaylist = document.getElementById('letSlide-playlist');
  } else {
    letSlide.DOM.createPlaylist = document.createElement('div');
    letSlide.DOM.createPlaylist.setAttribute('id', 'letSlide-playlist');
    letSlide.letSlideContainer.appendChild(letSlide.DOM.createPlaylist);
  }

  letSlide.DOM.createPlaylist.innerHTML = '<div id="letSlide-playlist-title">Playlist<div id="letSlide-playlist-drop">></div></div><div id="letSlide-playlist-list"></div>';

  var playListTitle = document.getElementById('letSlide-playlist-title');
  var playListList = document.getElementById('letSlide-playlist-list');

  if (letSlide.data.playlist) {
    playListData = letSlide.data.playlist;
  }

  function playlistReloadClick() {
    letSlide.reload(this.getAttribute('data-json'));
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
      playListTitle.classList.add('letSlide-drop-active');
    } else {
      open = false;
      playListList.style.display = 'none';
      playListTitle.classList.remove('letSlide-drop-active');
    }

  });

};


letSlide.destroyPlaylist = function() {
  letSlide.DOM.createPlaylist.remove();
  return false;
};

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

    letSlide.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.5/letSlideads.css', 'css');

    letSlide.loadAssets('//imasdk.googleapis.com/js/sdkloader/ima3.js', 'script', function (){
      letSlide.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.5/letSlideads.js', 'script', function() {

        letSlide.thisPlayer.ima(options);
        letSlide.thisPlayer.ima.initializeAdDisplayContainer();
        letSlide.thisPlayer.ima.requestAds();
        console.log('ad script loaded');

        if (letSlide.inarticle === 'true') {

          letSlide.DOM.closeAds = document.createElement('div');
          letSlide.DOM.closeAds.setAttribute('class', 'letsSlide-closeads');
          letSlide.DOM.closeAds.innerHTML = 'Close this ad';
          letSlide.letSlideContainer.appendChild(letSlide.DOM.closeAds);
          letSlide.DOM.closeAds.addEventListener('click', function(){
            letSlide.destroy();
          });

          letSlide.thisPlayer.play();
          letSlide.thisPlayer.on("ended", function(){
            letSlide.reload(letSlide.getletSlideUrl);
          });
        }
      });
    });

  }
};

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

    letSlide.setSize();

    window.onresize = letSlide.throttle(letSlide.setSize, 200);

    document.addEventListener('orientationchange', function() {
      letSlide.setSize();
    });

    console.log('player created');

    // fix for double play button on iphone
    if (navigator.userAgent.match(/iPhone/i)) {
      document.getElementsByClassName('vjs-big-play-button')[0].style.display = 'none';
    }

    if (letSlide.data.autoplay) {
      letSlide.thisPlayer.play();
    }

    if (letSlide.letSlideContainer.parentNode.offsetWidth >= 400 && letSlide.inarticle !== 'true') {
      letSlide.embed();
    }

    if (letSlide.letSlideContainer.parentNode.offsetWidth <= 900 && letSlide.data.videoslides || letSlide.letSlideContainer.parentNode.offsetWidth <= 900 && letSlide.data.slideshare) {
      letSlide.fullscreen();
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

    letSlide.videoready = true;

  });

};

letSlide.getSlides = function () {

  if (letSlide.data.videoslidestype === 'images' || letSlide.data.slideshare) {
    letSlide.DOM.presentationNode = document.createElement('div');
    letSlide.DOM.presentationNode.setAttribute('id', 'letSlide-container');
    letSlide.letSlideContainer.appendChild(letSlide.DOM.presentationNode);
  }

  if (!letSlide.data.slideshare) {
    letSlide.DOM.createImgContainer = document.createElement('div');
    letSlide.DOM.createImgContainer.setAttribute('id', 'letSlide-list');
    letSlide.DOM.createImgContainerWrapper = document.createElement('div');
    letSlide.DOM.createImgContainerWrapper.setAttribute('id', 'letSlide-list-wrapper');
    letSlide.letSlideContainer.appendChild(letSlide.DOM.createImgContainerWrapper);
  }

  if (letSlide.data.videoslidestype === 'images' || letSlide.data.slideshare) {

    if (letSlide.data.videosourcesmobile || letSlide.data.videosources) {
      letSlide.letSlideContainer.classList.add('letSlide-images');
    } else {
      letSlide.letSlideContainer.classList.add('letSlide-images-only');
    }

    if (!letSlide.data.slideshare) {
      var createButtons = '<div id="letSlide-btn-prev"><i class="icon-prevslide"><</i></div><div id="letSlide-btn-next"><i class="icon-nextslide">></i></div>';
      letSlide.DOM.createImgContainerWrapper.innerHTML = createButtons;
      letSlide.loadImages();
    } else {
      if (!letSlide.data.videosources || !letSlide.data.videosourcesmobile) {
        letSlide.contentReady = true;
      }
    }

  } else {

    var createHtmlPresentationNav = document.createElement('div');
    createHtmlPresentationNav.setAttribute('id', 'letSlide-html-nav');
    createHtmlPresentationNav.innerHTML = '<div id="letSlide-html-nav-left"><</div><div id="letSlide-html-nav-right">></div>';
    letSlide.DOM.createImgContainerWrapper.appendChild(createHtmlPresentationNav);

    letSlide.letSlideContainer.classList.add('letSlide-html');
    letSlide.DOM.presentationNode = letSlide.DOM.createImgContainerWrapper;
    letSlide.setContent(false);

  }

  if (!letSlide.data.slideshare) {
    letSlide.DOM.createImgContainerWrapper.appendChild(letSlide.DOM.createImgContainer);
  }

  if (letSlide.data.slideshare) {
    letSlide.DOM.presentationNode.innerHTML = letSlide.data.slideshare;
    var getSlideShareIframe = letSlide.DOM.presentationNode.getElementsByTagName('iframe')[0];
    getSlideShareIframe.style.width = '100%';
    getSlideShareIframe.style.height = '100%';
    letSlide.DOM.presentationNode.style.overflow = 'hidden';
    letSlide.contentReady = true;
  }

};

letSlide.setNewSlide = function() {
  if (letSlide.isreloading) {
    return false;
  }
  var getCurrentTime = Math.round(letSlide.thisPlayer.currentTime());
  var arrayNr;

  for (var i = 0; i < letSlide.timeList.length; i++) {   

    if (getCurrentTime >= letSlide.timeList[i]) {
      arrayNr = letSlide.timeList[i];
    }

  }
  if (letSlide.currentArrayNr !== arrayNr) {

    letSlide.currentArrayNr = arrayNr;

    var getSlideFromDom = document.querySelectorAll('[data-letSlide-time="' + arrayNr + '"]')[0];

    if (letSlide.data.videoslidestype === 'images') {
      if (getSlideFromDom !== getSlideFromDom) {
        letSlide.DOM.createImgContainer.style.left =  150 - getSlideFromDom.offsetLeft + 'px';
      } else { 
        letSlide.DOM.createImgContainer.style.left =  50 - getSlideFromDom.offsetLeft + 'px' ;
      }
      letSlide.firstImage.setAttribute('src', getSlideFromDom.getAttribute('src'));
    } else {
      var letSlideAllSlides = document.querySelectorAll('[data-letSlide-time]');
      for (var i = 0; i < letSlideAllSlides.length; i++) {
        if (letSlideAllSlides[i].classList.contains('letSlide-img-active')) {
          letSlideAllSlides[i].classList.remove('letSlide-img-active');
        }
      }
      getSlideFromDom.classList.add('letSlide-img-active');
    }

  }

};

letSlide.setSize = function() {

    var sW = letSlide.letSlideContainer.parentNode.offsetWidth;

    var isThisFixed = letSlide.letSlideContainer.classList.contains('this-fixed');

    if (isThisFixed) {
      sW = window.innerWidth;
    }

    var sH;
    var vW = sW;

    var vH;

    var letSlideParent = letSlide.letSlideContainer.parentNode;
    var letSlideParentWidth = letSlideParent.offsetWidth;

    if (!letSlide.data.videosourcesmobile && !letSlide.data.videosources) {

      sH = 480;

    } else {

      if (letSlide.letSlideContainer.getAttribute('data-wide') === 'true') {

        sW = letSlideParentWidth / 2;
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


    if (!letSlide.data.videoslides && !letSlide.data.slideshare) {

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

      letSlide.DOM.presentationNode.style.width = sW + 'px';
      letSlide.DOM.presentationNode.style.height = sH + 'px';

      if (letSlide.data.videoslidestype === 'images') {
        letSlide.letSlideContainer.style.height = vH + 75 + 'px';
      } else {
        letSlide.letSlideContainer.style.height = vH + 'px';
      }

    }
    
    letSlide.letSlideContainer.style.width = vW + sW + 'px';

    var letSlideHeaderOne = document.getElementById('letSlide-h1');

    if (!letSlide.data.videoslides && !letSlide.data.slideshare && letSlide.letSlideContainer.parentNode.offsetWidth >= 900) {

      vW = vW * 1.2;
      vH = vW / 1.78;
      if (letSlideHeaderOne !== null) {
        letSlideHeaderOne.style.maxWidth = vW + 'px';
      }
      
    } else {
      if (letSlideHeaderOne !== null) {
        letSlideHeaderOne.style.maxWidth = vW + sW + 'px';
      }
    }

    if (letSlide.letSlideContainer.parentNode.offsetWidth <= 770) {
      
      if (!isThisFixed) {
        if (letSlide.DOM.presentationNode) {
          letSlide.DOM.presentationNode.style.display = 'none';
          if (!letSlide.data.slideshare) {
            document.getElementById('letSlide-list-wrapper').style.display = 'none';
          }
        }
        vW = letSlide.letSlideContainer.offsetWidth;
        vH = vW / 1.78;
      }

      letSlide.letSlideContainer.style.height = vH + 'px';

    } else {

      if (letSlide.DOM.presentationNode) {
        letSlide.DOM.presentationNode.style.display = 'block';
        if (!letSlide.data.slideshare) {
          document.getElementById('letSlide-list-wrapper').style.display = 'block';
          document.getElementById('letSlide-list-wrapper').style.bottom = '0px';
        }
      }

    }

    if (!letSlide.data.videoslides && !letSlide.data.slideshare) {
      letSlide.letSlideContainer.style.height = vH + 'px';
    }

    if (letSlide.thisPlayer) {
      letSlide.thisPlayer.dimensions(vW, vH);
    }


};

letSlide.loadImages = function () {

  var ajaxImgCount = 0;
  var videoSlidesLength =  letSlide.data.videoslides.length;

  function getAllImages(i) {

    var thisImg = letSlide.data.videoslides[i].slidecontent;
    var reqImg = new Image();
    reqImg.src = thisImg;

    reqImg.onload = function() {
      ajaxImgCount = ajaxImgCount + 1;
      if (ajaxImgCount === videoSlidesLength) {
        letSlide.setContent(true);
      }
    };

    reqImg.onerror = function() {
      letSlide.errorThat('cannot load image', letSlide.letSlideContainer);
    };

  }

  for (var i = 0; i < videoSlidesLength; i++) {
    getAllImages(i);
  }

};
letSlide.sliderClickEvent = function (firstImage, ready) {

  letSlide.addClicks = document.querySelectorAll('[data-letSlide-time]');
  letSlide.addClicks[0].classList.add('letSlide-img-active');

  function addClicksFn() {

    if (ready && !letSlide.data.syncoff) {
      var duration = letSlide.thisPlayer.duration();
      if (letSlide.data.videosourcesmobile && duration > 10 || letSlide.data.videosources && duration > 10) {
        var thisTime = this.getAttribute('data-letSlide-time');
        letSlide.thisPlayer.currentTime(thisTime);
        letSlide.thisPlayer.play();
      }
    }

    if (letSlide.data.videoslidestype === 'images' && this !== letSlide.addClicks[0]) {
      letSlide.DOM.createImgContainer.style.left = 150 - this.offsetLeft + 'px';
    }

    if (letSlide.data.videoslidestype === 'images') {
      firstImage.setAttribute('src', this.getAttribute('src'));
    }

    document.getElementsByClassName('letSlide-img-active')[0].classList.remove('letSlide-img-active');
    this.classList.add('letSlide-img-active');

  }

  for (var g = 0; g < letSlide.addClicks.length; g++) {
    letSlide.addClicks[g].addEventListener('click', addClicksFn, false);
  }

  if (letSlide.data.videoslidestype === 'images') {
    var animated = false;
    var imgContainerWidth = 100 * letSlide.data.videoslides.length;

    document.getElementById('letSlide-btn-next').addEventListener('click', function() {
      var imgContainerPosition = letSlide.DOM.createImgContainer.offsetLeft;
      if (animated === false && imgContainerPosition > - imgContainerWidth + 500) {
        animated = true;
        letSlide.DOM.createImgContainer.style.left = imgContainerPosition - 200 + 'px';
        setTimeout(function(){
          animated = false;
        }, 325);
      }
    }, false);

    document.getElementById('letSlide-btn-prev').addEventListener('click', function() {
      var imgContainerPosition = letSlide.DOM.createImgContainer.offsetLeft;
      if (!animated && imgContainerPosition < 50) {
        animated = true;
        var slideThatMuch;
        if (imgContainerPosition < -50) {
          slideThatMuch = 200;
        } else {
          slideThatMuch = 100;
        }
        letSlide.DOM.createImgContainer.style.left = imgContainerPosition + slideThatMuch + 'px';
        setTimeout(function(){
          animated = false;
        }, 325);
      }
    }, false);

  }

};

letSlide.embed = function() {
  var embedNode = document.createElement('div');
  embedNode.setAttribute('id', 'letSlide-share');
  var embedCode = document.createTextNode('<div data-letSlidejs="' + letSlide.getletSlideUrl + '"></div> <script src="//d3gr29hczmiozh.cloudfront.net/0.1.3/letSlide.min.js" async></script>');
  embedNode.innerHTML = '<div id="letSlide-embed-close">x</div><div id="letSlide-title">Embed<p>Copy and paste the code below into your website</p></div><textarea id="letSlide-code"></textarea>';
  letSlide.letSlideContainer.appendChild(embedNode);
  document.getElementById('letSlide-code').appendChild(embedCode);

  document.getElementById('letSlide-embed-close').addEventListener('click', function() {
    embedNode.style.display = "none";
  });

  document.getElementsByTagName('html')[0].addEventListener('click', function() {
    embedNode.style.display = "none";
  });

  var button = letSlide.thisPlayer.addChild('button', {
    text: 'Embed'
  });
  document.getElementById('letSlide-code').addEventListener('click', function(e){
    e.stopPropagation();
  });
  button.addClass('letSlide-emebed-btn');
  button.on('click', function(e) {
    e.stopPropagation();
    embedNode.style.display = "block";
  });

};

letSlide.setContent = function (isImg) {

  var videoSlides = letSlide.data.videoslides;
  var contentNumber = 0;
  var createSlideNode;

  if (!letSlide.data.slideshare) {

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
        letSlide.addAttributes(createSlideNode, {
          'src': thisContent,
          'data-letSlide-time': thisContentTime
        });
        letSlide.DOM.createImgContainer.style.width = 100 * letSlide.data.videoslides.length + 'px';
      } else {
        createSlideNode = document.createElement('div');
        createSlideNode.innerHTML = '<div class="letSlide-list-content">' + thisContent + '</div>';
        createSlideNode.setAttribute('data-letSlide-time', thisContentTime);
      }

      letSlide.timeList.push(thisContentTime);
      letSlide.DOM.createImgContainer.appendChild(createSlideNode);
      contentNumber = contentNumber + 1;

      if (contentNumber === videoSlides.length) {
        letSlide.contentReady = true;
      }

    }

  }

  // set first slide

  if (isImg) {
    letSlide.firstImage = new Image();
    letSlide.firstImage.src = videoSlides[0].slidecontent;
    letSlide.DOM.presentationNode.appendChild(letSlide.firstImage);
    letSlide.letSlideContainer.style.overflow = 'visible';
  }

  console.log('slider content set');

  if (letSlide.data.videoslidestype === 'html') {

    var setletSlideNav = true;


    document.getElementById('letSlide-html-nav-left').addEventListener('click', function() {
      var letSlideAllSlides = document.querySelectorAll('[data-letSlide-time]');
      for (var i = 0; i < letSlideAllSlides.length; i++) {
        if (letSlideAllSlides[i].classList.contains('letSlide-img-active') && i !== 0) {
          letSlideAllSlides[i].classList.remove('letSlide-img-active');
          i = i - 1;
          letSlideAllSlides[i].classList.add('letSlide-img-active');
          letSlide.thisPlayer.currentTime(letSlideAllSlides[i].getAttribute('data-letSlide-time'));
          letSlide.thisPlayer.play();
        }
      }
    });

    document.getElementById('letSlide-html-nav-right').addEventListener('click', function() {
      var letSlideAllSlides = document.querySelectorAll('[data-letSlide-time]');
      for (var i = 0; i < letSlideAllSlides.length; i++) {
        if (letSlideAllSlides[i].classList.contains('letSlide-img-active') && i < letSlideAllSlides.length - 1) {
          letSlideAllSlides[i].classList.remove('letSlide-img-active');
          i = i + 1;
          letSlideAllSlides[i].classList.add('letSlide-img-active');
          letSlide.thisPlayer.currentTime(letSlideAllSlides[i].getAttribute('data-letSlide-time'));
          letSlide.thisPlayer.play();
        }
      }
    });

  }

  if (!letSlide.data.videosourcesmobile && !letSlide.data.videosources && letSlide.data.videoslidestype !== 'html') {
    letSlide.sliderClickEvent(letSlide.firstImage, false);
  } else if (!letSlide.data.videosourcesmobile && !letSlide.data.videosources && letSlide.data.videoslidestype !== 'images') {
    letSlide.sliderClickEvent(letSlide.firstImage, false);
  }

  letSlide.contentReady = true;

};

letSlide.fullscreen = function() {

  var letSlidefullscreen = letSlide.thisPlayer.controlBar.addChild('button', {
    text: 'Full screen'
  });
  letSlidefullscreen.addClass('letSlide-fullscreen-btn');

  var fullscreenon = false;

  letSlidefullscreen.on('click', function() {

    if (!fullscreenon) {

      fullscreenon = true;

      letSlide.letSlideContainer.classList.add('this-fixed');
      letSlide.letSlideContainer.classList.add('full-mobile');

      var fullScreen = document.createElement('div');
      fullScreen.setAttribute('id', 'letSlide-fullscreen');
      var fullScreenClose = document.createElement('div');
      fullScreenClose.setAttribute('id', 'letSlide-close-popup');
      fullScreenClose.innerHTML = 'x';
      letSlide.letSlideContainer.appendChild(fullScreen);
      letSlide.letSlideContainer.appendChild(fullScreenClose);

      letSlide.DOM.presentationNode.style.display = 'block';

      if (!letSlide.data.slideshare) {
        document.getElementById('letSlide-list-wrapper').style.display = 'block';
        letSlide.DOM.presentationNode.style.height = parseFloat(letSlide.letSlideContainer.style.height) + 'px';
        document.getElementById('letSlide-list-wrapper').style.bottom = - 75 + 'px';
      } else {
        letSlide.DOM.presentationNode.style.height = '100%';
      }

      if (letSlide.DOM.presentationNode) {
        letSlide.DOM.presentationNode.style.display = 'block';
        if (!letSlide.data.slideshare) {
          document.getElementById('letSlide-list-wrapper').style.display = 'block';
        }
      }


      var removeFullScr = function() {
        fullScreen.remove();
        fullScreenClose.remove();
        letSlide.letSlideContainer.classList.remove('this-fixed');
        letSlide.letSlideContainer.classList.remove('full-mobile');
        if (!letSlide.data.slideshare) {
          if (letSlide.letSlideContainer.parentNode.offsetWidth <= 770) {
              document.getElementById('letSlide-list-wrapper').style.display = 'none';
            } else {
              document.getElementById('letSlide-list-wrapper').style.display = 'block';
            }
          }
        letSlide.letSlideContainer.style.marginTop = 0 + 'px';
        letSlide.letSlideContainer.style.marginLeft = 'auto';

        fullscreenon = false;
        letSlide.setSize();
      };



      document.getElementById('letSlide-close-popup').addEventListener('click', removeFullScr, false);
      document.getElementById('letSlide-fullscreen').addEventListener('click', removeFullScr, false);

    }

  });

};

document.addEventListener('DOMContentLoaded', function() {

  var checkAllletSlide = document.querySelectorAll('[data-letSlidejs]');

  letSlide.startupletSlide = function (thiletSlide) {
    thiletSlide.classList.add('letSlide-loaded');
    letSlide.letSlideContainer = thiletSlide;
    letSlide.addPreloader();
    letSlide.getletSlideUrl = letSlide.letSlideContainer.getAttribute('data-letSlidejs');
    letSlide.loadJson(letSlide.getletSlideUrl);
  };


  function startupLoop(){
   for (var i = 0; i < checkAllletSlide.length; i++) {
      if (!checkAllletSlide[i].classList.contains('letSlide-loaded') && !checkAllletSlide[i].classList.contains('letSlide-request')) {
        letSlide.startupletSlide(checkAllletSlide[i]);
        return false;
      }
    }
  }

  if (!letSlide.firstLoad) {
    letSlide.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.5/letSlidecss.min.css', 'css', function(){
      letSlide.firstLoad = true;
      startupLoop();
    });
  } else {
    startupLoop();
  }

});

})();