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
