slideMe.setNewSlide = function() {

  var currentArrayNr = '00';

  var getCurrentTime = Math.round(thisPlayer.currentTime());
  var arrayNr;

  for (var i = 0; i < slideMe.timeList.length; i++) {   

    if (getCurrentTime >= slideMe.timeList[i]) {
      arrayNr = slideMe.timeList[i];
    }

  }



  if (currentArrayNr !== arrayNr) {

    currentArrayNr = arrayNr;

    var getSlideFromDom = document.querySelectorAll('[data-slideme-time="' + arrayNr + '"]')[0];

    if (slideMe.data.videoslidestype === 'images') {
      
      if (getSlideFromDom !== slideMe.addClicks[0]) {

        slideMe.createImgContainer.style.left =  150 - getSlideFromDom.offsetLeft + 'px';

      } else { 

        slideMe.createImgContainer.style.left =  50 - getSlideFromDom.offsetLeft + 'px' ;

      }

      slideMe.firstImage.setAttribute('src', getSlideFromDom.getAttribute('src'));

    } else {

      slideMe.createImgContainer.style.top = - getSlideFromDom.offsetTop + 'px';

    }

    document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
    getSlideFromDom.setAttribute('class', 'slideme-img-active');

  }

};
