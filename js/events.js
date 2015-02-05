

// click events on slides

var currentArrayNr = '00';

function setNewSlide() {

  var getCurrentTime = Math.round(thisPlayer.currentTime());

  var arrayNr;

  for (var i = 0; i < timeList.length; i++) {

    if (getCurrentTime >= timeList[i]) {
      arrayNr = timeList[i];
    }

  }

  if (currentArrayNr !== arrayNr) {

    currentArrayNr = arrayNr;

    var getSlideFromDom = document.querySelectorAll('[data-slideme-time="' + arrayNr + '"]')[0];

    if (data.videoslidestype === 'images') {

      if (getSlideFromDom !== addClicks[0]) {

        createImgContainer.style.left = 150 - getSlideFromDom.offsetLeft + 'px';

      } else {

        createImgContainer.style.left = 50 - getSlideFromDom.offsetLeft + 'px';

      }

      firstImage.setAttribute('src', getSlideFromDom.getAttribute('src'));

    } else {

      createImgContainer.style.top = -getSlideFromDom.offsetTop + 'px';

    }

    document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
    getSlideFromDom.setAttribute('class', 'slideme-img-active');

  }

}