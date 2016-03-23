// For Wistia Integration

letSlide.setWistia = function() {

  letSlide.DOM.playListContainer = document.createElement('div');
  letSlide.addAttributes(letSlide.DOM.playListContainer, {
    'class': 'wistia_embed wistia_async_' + letSlide.data.wistia[0] + ' rewatch=true playlistLinks=auto autoPlay=true playerPreference=html5',
    'style': 'height:100%;width:100%'
  });

  letSlide.letSlideContainer.appendChild(letSlide.DOM.playListContainer);

  letSlide.DOM.wistiaVideo = {};
  for (var g = 0; g < letSlide.data.wistia.length; g++) {
    letSlide.DOM.wistiaVideo[g] = document.createElement('a');
    letSlide.DOM.wistiaVideo[g].setAttribute('href', '#wistia_' + letSlide.data.wistia[g]);
    letSlide.letSlideContainer.appendChild(letSlide.DOM.wistiaVideo[g]);
  }


  letSlide.loadAssets('//fast.wistia.com/assets/external/E-v1.js', 'script', function() {
    console.log('%cWistia Project, loaded JS', 'color: hotpink');
    letSlide.setSize();
    letSlide.setWistia.buttonRewind(true);
    setInterval(function(){
      letSlide.setWistia.checkPlaylist();
    }, 1000);
    letSlide.contentReady = true;
  });

};

letSlide.setWistia.playlistIndex = 0;

letSlide.setWistia.checkPlaylist = function() {
  if (letSlide.setWistia.playlistIndex !== Wistia.api()._playlistIndex) {
    if (letSlide.setWistia.skipButton) {
      letSlide.setWistia.skipButton.remove();
    }
    if (Wistia.api()._playlistIndex === 0) {
      letSlide.setWistia.playlistIndex = Wistia.api()._playlistIndex;
      letSlide.setWistia.buttonRewind(true);
    } else if (Wistia.api()._playlistIndex === letSlide.data.wistia.length - 1) {
      letSlide.setWistia.playlistIndex = Wistia.api()._playlistIndex;
      letSlide.setWistia.buttonRewind(false);
    }
  }
};

letSlide.setWistia.buttonRewind = function(skip) {
  letSlide.setWistia.skipButton = document.createElement('div');
  letSlide.setWistia.skipButton.setAttribute('class', 'letSlide-skipbutton');
  if (skip === true) {
    letSlide.setWistia.skipButton.innerHTML = 'Skip Intro';
  } else {
    letSlide.setWistia.skipButton.innerHTML = 'Play Again';
  }

  letSlide.letSlideContainer.appendChild(letSlide.setWistia.skipButton);
  letSlide.setWistia.skipButton.addEventListener('click', function() {
    if (skip === true) {
      letSlide.DOM.wistiaVideo[1].click();
    } else {
      letSlide.DOM.wistiaVideo[0].click();
    }
    this.remove();
  });
};
