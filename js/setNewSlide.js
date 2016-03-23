letSlide.setNewSlide = function() {
  if (letSlide.isreloading) {
    return false;
  }
  var getCurrentTime = Math.round(letSlide.thisPlayer.currentTime());
  var arrayNr;

  for (var i = 0; i < letSlide.timeList.length; i++) {

    if (getCurrentTime >= letSlide.timeList[i]) {
      arrayNr = letSlide.timeList[i];
    }

  }
  if (letSlide.currentArrayNr !== arrayNr) {

    letSlide.currentArrayNr = arrayNr;

    var getSlideFromDom = document.querySelectorAll('[data-letSlide-time="' + arrayNr + '"]')[0];

    if (letSlide.data.videoslidestype === 'images') {
      if (getSlideFromDom !== getSlideFromDom) {
        letSlide.DOM.createImgContainer.style.left =  150 - getSlideFromDom.offsetLeft + 'px';
      } else {
        letSlide.DOM.createImgContainer.style.left =  50 - getSlideFromDom.offsetLeft + 'px' ;
      }
      letSlide.firstImage.setAttribute('src', getSlideFromDom.getAttribute('src'));
    } else {
      var letSlideAllSlides = document.querySelectorAll('[data-letSlide-time]');
      for (var i = 0; i < letSlideAllSlides.length; i++) {
        if (letSlideAllSlides[i].classList.contains('letSlide-img-active')) {
          letSlideAllSlides[i].classList.remove('letSlide-img-active');
        }
      }
      getSlideFromDom.classList.add('letSlide-img-active');
    }

  }

};
