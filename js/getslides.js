slideMe.getSlides = function () {

  slideMe.presentationNode = document.createElement('div');
  slideMe.presentationNode.setAttribute('id', 'slideme-container');
  slideMe.slideMeContainer.appendChild(slideMe.presentationNode);
  var createImgContainerWrapper;
  if (!slideMe.data.slideshare) {
    slideMe.createImgContainer = document.createElement('div');
    slideMe.createImgContainer.setAttribute('id', 'slideme-list');
    createImgContainerWrapper = document.createElement('div');
    createImgContainerWrapper.setAttribute('id', 'slideme-list-wrapper');
    slideMe.slideMeContainer.appendChild(createImgContainerWrapper);
  }

  if (slideMe.data.videoslidestype === 'images' || slideMe.data.slideshare) {

    if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {
      slideMe.slideMeContainer.classList.add('slideme-images');
    } else {
      slideMe.slideMeContainer.classList.add('slideme-images-only');
    }

    if (!slideMe.data.slideshare) {
      var createButtons = '<div id="slideme-btn-prev"><i class="icon-prevslide"><</i></div><div id="slideme-btn-next"><i class="icon-nextslide">></i></div>';
      createImgContainerWrapper.innerHTML = createButtons;
      slideMe.loadImages();
    }
    

  } else {

    createImgContainerWrapper.appendChild('slideme-text');

    var createHtmlPresentationNav = document.createElement('div');
    createHtmlPresentationNav.setAttribute('id', 'slideme-html-nav');
    createHtmlPresentationNav.innerHTML = '<div id="slideme-html-nav-left"><</div><div id="slideme-html-nav-right">></div>';
    createImgContainerWrapper.appendChild(createHtmlPresentationNav);

    slideMe.slideMeContainer.classList.add('slideme-html');

  }

  if (!slideMe.data.slideshare) {
    createImgContainerWrapper.appendChild(slideMe.createImgContainer);
  }

  if (slideMe.data.slideshare) {
    slideMe.presentationNode.innerHTML = slideMe.data.slideshare;
    var getSlideShareIframe = slideMe.presentationNode.getElementsByTagName('iframe')[0];
    getSlideShareIframe.style.width = '100%';
    getSlideShareIframe.style.height = '100%';
    slideMe.presentationNode.style.overflow = 'hidden';
  }

};