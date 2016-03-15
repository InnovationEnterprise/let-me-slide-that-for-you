// For Wistia Integration

letSlide.setWistia = function() {
  letSlide.DOM.wistiaContainer = document.createElement('div');
  letSlide.DOM.wistiaContainer.setAttribute('class', 'wistiaContainer');

  letSlide.DOM.playListContainer = document.createElement('div');
  letSlide.addAttributes(letSlide.DOM.playListContainer, {
    'class': 'wistia_embed wistia_async_' + letSlide.data.wistia[0] + ' playlistLinks=auto autoPlay=true',
    'style': 'height:360px;width:640px'
  });

  letSlide.letSlideContainer.appendChild(letSlide.DOM.wistiaContainer);
  letSlide.DOM.wistiaContainer.appendChild(letSlide.DOM.playListContainer);

  letSlide.DOM.wistiaVideo = {};
  for (var g = 0; g < letSlide.data.wistia.length; g++) {
    letSlide.DOM.wistiaVideo[g] = document.createElement('a');
    letSlide.DOM.wistiaVideo[g].setAttribute('href', '#wistia_' + letSlide.DOM.wistiaVideo[g]);
    letSlide.DOM.wistiaContainer.appendChild(letSlide.DOM.wistiaVideo[g]);
  }


  letSlide.loadAssets('//fast.wistia.com/assets/external/E-v1.js', 'script', function() {
    console.log('%cWistia Project, loaded JS', 'color: hotpink');
    letSlide.contentReady = true;
  });

};
