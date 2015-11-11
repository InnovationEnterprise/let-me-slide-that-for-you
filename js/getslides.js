slideMe.getSlides = function () {

  if (slideMe.data.videoslidestype === 'images' || slideMe.data.slideshare) {
    slideMe.DOM.presentationNode = document.createElement('div');
    slideMe.DOM.presentationNode.setAttribute('id', 'slideme-container');
    slideMe.slideMeContainer.appendChild(slideMe.DOM.presentationNode);
  }

  slideMe.DOM.createImgContainerWrapper;
  if (!slideMe.data.slideshare) {
    slideMe.DOM.createImgContainer = document.createElement('div');
    slideMe.DOM.createImgContainer.setAttribute('id', 'slideme-list');
    slideMe.DOM.createImgContainerWrapper = document.createElement('div');
    slideMe.DOM.createImgContainerWrapper.setAttribute('id', 'slideme-list-wrapper');
    slideMe.slideMeContainer.appendChild(slideMe.DOM.createImgContainerWrapper);
  }

  if (slideMe.data.videoslidestype === 'images' || slideMe.data.slideshare) {

    if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {
      slideMe.slideMeContainer.classList.add('slideme-images');
    } else {
      slideMe.slideMeContainer.classList.add('slideme-images-only');
    }

    if (!slideMe.data.slideshare) {
      var createButtons = '<div id="slideme-btn-prev"><i class="icon-prevslide"><</i></div><div id="slideme-btn-next"><i class="icon-nextslide">></i></div>';
      slideMe.DOM.createImgContainerWrapper.innerHTML = createButtons;
      slideMe.loadImages();
    } else {
      if (!slideMe.data.videosources || !slideMe.data.videosourcesmobile) {
        slideMe.contentReady = true;
      }
    }

  } else {

    var createHtmlPresentationNav = document.createElement('div');
    createHtmlPresentationNav.setAttribute('id', 'slideme-html-nav');
    createHtmlPresentationNav.innerHTML = '<div id="slideme-html-nav-left"><</div><div id="slideme-html-nav-right">></div>';
    slideMe.DOM.createImgContainerWrapper.appendChild(createHtmlPresentationNav);

    slideMe.slideMeContainer.classList.add('slideme-html');
    slideMe.DOM.presentationNode = slideMe.DOM.createImgContainerWrapper;
    slideMe.setContent(false);

  }

  if (!slideMe.data.slideshare) {
    slideMe.DOM.createImgContainerWrapper.appendChild(slideMe.DOM.createImgContainer);
  }

  if (slideMe.data.slideshare) {
    slideMe.DOM.presentationNode.innerHTML = slideMe.data.slideshare;
    var getSlideShareIframe = slideMe.DOM.presentationNode.getElementsByTagName('iframe')[0];
    getSlideShareIframe.style.width = '100%';
    getSlideShareIframe.style.height = '100%';
    slideMe.DOM.presentationNode.style.overflow = 'hidden';
    slideMe.contentReady = true;
  }

};