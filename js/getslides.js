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

    if (letSlide.data.videosourcesmobile || letSlide.data.videosources || letSlide.data.wistia) {
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
