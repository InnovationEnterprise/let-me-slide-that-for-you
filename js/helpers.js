slideMe.errorThat = function (thisError, thisContainer) {
  var errorDiv = 'Player error:<br>' + thisError + '';
  thisContainer.classList.add('slideme-error');
  thisContainer.innerHTML = errorDiv;
  slideMe.checkifready = null;
  slideMe.error = true;
};


slideMe.addAttributes = function (element, attribute) {
  for (var value in attribute) {
    if (attribute.hasOwnProperty(value)) {
     element.setAttribute(value, attribute[value]);
    }
  }
};

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


slideMe.checkifready = function(){
 var slideMeInterval =  setInterval(function(){
    if (slideMe.error === true || typeof slideMe === 'undefined') {
      clearInterval(slideMeInterval);
      if (slideMe.error === true) {
        console.log(slideMe);
      }
    } else {
      if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {
        if (slideMe.contentReady && slideMe.videoready) {
          if (slideMe.data.videoslides && !slideMe.data.syncoff){
            document.getElementsByTagName('video')[0].addEventListener('timeupdate', slideMe.throttle(slideMe.setNewSlide, 500));
          }
          slideMe.sliderClickEvent(slideMe.firstImage, true);
          clearInterval(slideMeInterval);
        }
      } else {
        if (slideMe.contentReady) {
          slideMe.preloaderWrapper.remove()
        }
      }
    }

  }, 100);
};