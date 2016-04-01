// For Wistia Integration

letSlide.setWistia = function() {

  letSlide.setWistia.playlistIndex = 0;
  letSlide.DOM.wistiaContainer = document.createElement('div');
  letSlide.addAttributes(letSlide.DOM.wistiaContainer, {
    'class': 'wistia_embed wistia_async_' + letSlide.data.wistia[0] + ' rewatch=true playlistLinks=auto autoPlay=true playerPreference=html5',
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

  letSlide.loadAssets('//fast.wistia.com/assets/external/E-v1.js', 'script', function() {
    setTimeout(function(){
      console.log('%cWistia Project, loaded JS', 'color: hotpink');
      letSlide.wistiaVideo = Wistia.api(letSlide.data.wistia[0]);
      letSlide.setSize();
      letSlide.setWistia.buttonRewind(true);
      letSlide.setWistia.videoEnd();
      letSlide.contentReady = true;
    }, 500);
  });


  letSlide.setWistia.checkIfChanged = function(){
    if (Wistia) {
      var wistiaInterval = setInterval(function(){
        console.log(Wistia.api(letSlide.data.wistia[0])._playlistIndex);
        console.log(letSlide.setWistia.playlistIndex);
        if (Wistia.api(letSlide.data.wistia[0])._playlistIndex !== letSlide.setWistia.playlistIndex) {
          console.log('dupa zmieonony');
          clearInterval(wistiaInterval);
          letSlide.setWistia.playlistIndex = letSlide.setWistia.playlistIndex + 1;
          letSlide.wistiaVideo = Wistia.api(letSlide.data.wistia[letSlide.setWistia.playlistIndex]);
          setTimeout(function(){
            console.log("koniec " + letSlide.setWistia.playlistIndex + " "+ (letSlide.data.wistia.length - 1));
            if (letSlide.setWistia.playlistIndex === letSlide.data.wistia.length - 1) {
              letSlide.setWistia.buttonRewind(false);
            } else if (letSlide.setWistia.playlistIndex === 0 ) {
              etSlide.setWistia.buttonRewind(true);
            } else {
              if (letSlide.setWistia.skipButton) {
                letSlide.setWistia.skipButton.remove();
              }
            }
            letSlide.setWistia.videoEnd();
          }, 500);
        }
      }, 500);
    }
  };

  letSlide.setWistia.videoEnd = function() {
    letSlide.wistiaVideo.bind("end", function() {
      letSlide.setWistia.checkIfChanged();
    });
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
      if (skip === true) {
        letSlide.setWistia.playlistIndex = 1;
        letSlide.DOM.wistiaVideo[1].click();
      } else {
        letSlide.setWistia.videoEnd();
        letSlide.setWistia.playlistIndex = 0;
        letSlide.DOM.wistiaVideo[0].click();
        letSlide.setWistia.buttonRewind(true);
      }
      this.remove();
      letSlide.setWistia.checkIfChanged();
    });
  };


};
