letSlide.setSize = function() {

  var sW = letSlide.letSlideContainer.parentNode.offsetWidth;

  var isThisFixed = letSlide.letSlideContainer.classList.contains('this-fixed');

  if (isThisFixed) {
    sW = window.innerWidth;
  }

  var sH;
  var vW = sW;

  var vH;

  if (letSlide.letSlideContainer.getAttribute('data-wide') === 'true') {

    sW = sW / 2;
    sH = sW * 0.67;

    vW = sW;
    vH = sW * 0.67;

  } else {

    sW = sW / 2;
    sH = sW / 1.78;

    vW = sW;
    vH = sH;

    sW = sH * 1.33;
  }


  if (!letSlide.data.videoslides && !letSlide.data.slideshare) {

    vH = vW  / 1.78;

  } else {

    var adsContainer = document.getElementById('ima-ad-container');

    if (adsContainer !== null) {

      adsContainer.style.width = vW + 'px';
      adsContainer.style.height = vH + 'px';

      document.getElementById('ima-seek-bar-div').style.width = vW + 'px';

      adsContainer.getElementsByTagName('iframe')[0].style.width = vW + 'px';
      adsContainer.getElementsByTagName('iframe')[0].style.height = vH + 'px';

    }

    if (letSlide.DOM.presentationNode) {
      letSlide.DOM.presentationNode.style.width = sW + 'px';
      letSlide.DOM.presentationNode.style.height = sH + 'px';
    }

    if (letSlide.data.videoslidestype === 'images') {
      letSlide.letSlideContainer.style.height = vH + 75 + 'px';
    } else {
      letSlide.letSlideContainer.style.height = vH + 'px';
    }

  }

  if (!letSlide.data.wistia) {
    letSlide.letSlideContainer.style.width = vW + sW + 'px';
  } else {
    letSlide.letSlideContainer.style.width = letSlide.letSlideContainer.parentNode.offsetWidth;
  }

  var letSlideHeaderOne = document.getElementById('letSlide-h1');

  if (!letSlide.data.videoslides && !letSlide.data.slideshare && letSlide.letSlideContainer.parentNode.offsetWidth >= 900) {

    vW = vW * 1.2;
    vH = vW / 1.78;
    if (letSlideHeaderOne !== null) {
      letSlideHeaderOne.style.maxWidth = vW + 'px';
    }

  } else {
    if (letSlideHeaderOne !== null) {
      letSlideHeaderOne.style.maxWidth = vW + sW + 'px';
    }
  }

  if (letSlide.letSlideContainer.parentNode.offsetWidth <= 770) {

    if (!isThisFixed) {
      if (letSlide.DOM.presentationNode) {
        letSlide.DOM.presentationNode.style.display = 'none';
        if (!letSlide.data.slideshare) {
          document.getElementById('letSlide-list-wrapper').style.display = 'none';
        }
      }
      vW = letSlide.letSlideContainer.offsetWidth;
      vH = vW / 1.78;
    }

    letSlide.letSlideContainer.style.height = vH + 'px';

  } else {

    if (letSlide.DOM.presentationNode) {
      letSlide.DOM.presentationNode.style.display = 'block';
      if (!letSlide.data.slideshare) {
        document.getElementById('letSlide-list-wrapper').style.display = 'block';
        document.getElementById('letSlide-list-wrapper').style.bottom = '0px';
      }
    }

  }

  if (!letSlide.data.videoslides && !letSlide.data.slideshare && !letSlide.data.wistia) {
    letSlide.letSlideContainer.style.height = vH + 'px';
  } else if (!letSlide.data.videoslides && !letSlide.data.slideshare && letSlide.data.wistia) {
    letSlide.letSlideContainer.style.height = vH + 'px';
    letSlide.letSlideContainer.style.width = vW + 'px';
  }

  if (letSlide.thisPlayer) {
    letSlide.thisPlayer.dimensions(vW, vH);
  }

};
