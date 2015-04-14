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
    if (fn !== undefined) {
      getAssets.onload = function(){
        fn();
      };
    }
  } else {

    if (document.all && !window.atob) {
      getAssets = document.createElement('script');
      getAssets.src = url;
      getAssets.async = true;
      getAssets.type = 'text/javascript';
      getBody.appendChild(getAssets);

      if (fn !== undefined) {
        getAssets.onload = function(){
          fn();
        };
      }
      
    } else {
      var getAssets = new XMLHttpRequest();

      getAssets.open("GET", url);
      getAssets.onreadystatechange=function() {
        if (getAssets.readyState==4 && getAssets.status==200) {
          eval(getAssets.responseText);
          if (fn !== undefined) {
            fn();

          }
        }
      };
      getAssets.send();

    }


  }

};