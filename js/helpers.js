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
          if (slideMe.data.videoslides !== 'images' && (slideMe.data.videosourcesmobile || slideMe.data.videosources)) {
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
