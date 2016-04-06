// For Wistia Integration

letSlide.setWistia = function() {

  letSlide.setWistia.playlistIndex = 0;
  letSlide.DOM.wistiaContainer = document.createElement('div');
  letSlide.addAttributes(letSlide.DOM.wistiaContainer, {
    'class': 'wistia_embed wistia_async_' + letSlide.data.wistia[0] + ' rewatch=true playlistLinks=auto playerPreference=html5',
    'id' : letSlide.data.wistia[0]
  });

  letSlide.letSlideContainer.appendChild(letSlide.DOM.wistiaContainer);

  letSlide.DOM.wistiaVideo = {};
  for (var g = 0; g < letSlide.data.wistia.length; g++) {
    letSlide.DOM.wistiaVideo[g] = document.createElement('a');
    letSlide.DOM.wistiaVideo[g].setAttribute('href', '#wistia_' + letSlide.data.wistia[g]);
    letSlide.DOM.wistiaVideo[g].setAttribute('style', 'display: none;');
    letSlide.letSlideContainer.appendChild(letSlide.DOM.wistiaVideo[g]);
  }

  letSlide.setWistia.callWistia = function() {
    letSlide.wistiaVideo = Wistia.api(letSlide.data.wistia[0]);
    letSlide.setSize();
    window.onresize = letSlide.throttle(letSlide.setSize, 200);
    document.addEventListener('orientationchange', function() {
      letSlide.setSize();
    });

    if (letSlide.data.wistia.length >= 2) {
      letSlide.setWistia.buttonRewind(true);
    }
    letSlide.setWistia.checkIfChanged();
    setTimeout(function(){
      letSlide.wistiaVideo.play();
      letSlide.videoready = true;
    }, 50);
  };

  if (!letSlide.wistiaJsLoaded) {
    letSlide.loadAssets('//fast.wistia.com/assets/external/E-v1.js', 'script', function() {
      console.log('%cWistia Project, loaded JS', 'color: hotpink');
      letSlide.wistiaJsLoaded = true;
    });
  }

  letSlide.setWistia.checkIfWistiaReady = setInterval(function(){
    if (typeof Wistia !== 'undefined' && Wistia) {
      clearInterval(letSlide.setWistia.checkIfWistiaReady);
      setTimeout(function(){
        letSlide.setWistia.callWistia();
      }, 100);
    }
  }, 100);


  letSlide.setWistia.checkIfChanged = function(){
    var wistiaInterval = setInterval(function(){
      if (letSlide.data.wistia && letSlide.data.wistia.length >= 2) {
        if (Wistia.api(letSlide.data.wistia[0])._playlistIndex !== letSlide.setWistia.playlistIndex) {
          letSlide.setWistia.playlistIndex = Wistia.api(letSlide.data.wistia[0])._playlistIndex;
          letSlide.wistiaVideo = Wistia.api(letSlide.data.wistia[letSlide.setWistia.playlistIndex]);
          letSlide.setSize();
          if (letSlide.setWistia.skipButton) {
            letSlide.setWistia.skipButton.remove();
            letSlide.setWistia.skipButton = null;
          }
          if (letSlide.setWistia.playlistIndex === letSlide.data.wistia.length - 1 && !letSlide.setWistia.skipButton) {
            letSlide.setWistia.buttonRewind(false);
          }
          if (letSlide.setWistia.playlistIndex === 0 && !letSlide.setWistia.skipButton) {
            letSlide.setWistia.buttonRewind(true);
          }
        }
      } else {
        clearInterval(wistiaInterval);
      }
    }, 100);
  };


  letSlide.setWistia.buttonRewind = function(skip) {
    letSlide.setWistia.skipButton = document.createElement('div');
    letSlide.setWistia.skipButton.setAttribute('class', 'letSlide-skipbutton');
    if (skip === true) {
      letSlide.setWistia.skipButton.innerHTML = 'Skip Intro';
    } else {
      letSlide.setWistia.skipButton.innerHTML = 'Play Again';
    }
    letSlide.DOM.wistiaContainer.appendChild(letSlide.setWistia.skipButton);
    letSlide.setWistia.skipButton.addEventListener('click', function() {
      if (letSlide.setWistia.skipButton) {
        letSlide.setWistia.skipButton.remove();
        letSlide.setWistia.skipButton = null;
      }
      if (skip === true) {
        letSlide.DOM.wistiaVideo[1].click();
      } else {
        letSlide.DOM.wistiaVideo[0].click();
        letSlide.setWistia.buttonRewind(true);
        letSlide.setSize();
      }
    });
  };


};
