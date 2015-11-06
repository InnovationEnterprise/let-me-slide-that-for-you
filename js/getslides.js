slideMe.getSlides = function () {

  if (slideMe.data.videoslidestype === 'images' || slideMe.data.slideshare) {
    slideMe.presentationNode = document.createElement('div');
    slideMe.presentationNode.setAttribute('id', 'slideme-container');
    slideMe.slideMeContainer.appendChild(slideMe.presentationNode);
  }

  slideMe.createImgContainerWrapper;
  if (!slideMe.data.slideshare) {
    slideMe.createImgContainer = document.createElement('div');
    slideMe.createImgContainer.setAttribute('id', 'slideme-list');
    slideMe.createImgContainerWrapper = document.createElement('div');
    slideMe.createImgContainerWrapper.setAttribute('id', 'slideme-list-wrapper');
    slideMe.slideMeContainer.appendChild(slideMe.createImgContainerWrapper);
  }

  if (slideMe.data.videoslidestype === 'images' || slideMe.data.slideshare) {

    if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {
      slideMe.slideMeContainer.classList.add('slideme-images');
    } else {
      slideMe.slideMeContainer.classList.add('slideme-images-only');
    }

    if (!slideMe.data.slideshare) {
      var createButtons = '<div id="slideme-btn-prev"><i class="icon-prevslide"><</i></div><div id="slideme-btn-next"><i class="icon-nextslide">></i></div>';
      slideMe.createImgContainerWrapper.innerHTML = createButtons;
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
    slideMe.createImgContainerWrapper.appendChild(createHtmlPresentationNav);

    slideMe.slideMeContainer.classList.add('slideme-html');
    slideMe.presentationNode = slideMe.createImgContainerWrapper;
    slideMe.setContent(false);

  }

  if (!slideMe.data.slideshare) {
    slideMe.createImgContainerWrapper.appendChild(slideMe.createImgContainer);
  }

  if (slideMe.data.slideshare) {
    slideMe.presentationNode.innerHTML = slideMe.data.slideshare;
    var getSlideShareIframe = slideMe.presentationNode.getElementsByTagName('iframe')[0];
    getSlideShareIframe.style.width = '100%';
    getSlideShareIframe.style.height = '100%';
    slideMe.presentationNode.style.overflow = 'hidden';
  }

};