slideMe.sliderClickEvent = function (firstImage, ready) {

  slideMe.addClicks = document.querySelectorAll('[data-slideme-time]');
  slideMe.addClicks[0].setAttribute('class', 'slideme-img-active');

  function addClicksFn() {

    if (ready === true) {
      var duration = thisPlayer.duration();
      if (slideMe.data.videosourcesmobile && duration > 10 || slideMe.data.videosources && duration > 10) {
        var thisTime = this.getAttribute('data-slideme-time');
        thisPlayer.currentTime(thisTime);
        thisPlayer.play();
      }
    }

    if (slideMe.data.videoslidestype === 'images' && this !== slideMe.addClicks[0]) {
      slideMe.createImgContainer.style.left = 150 - this.offsetLeft + 'px';
    }

    if (slideMe.data.videoslidestype === 'images') {
      firstImage.setAttribute('src', this.getAttribute('src'));
    }

    document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
    this.setAttribute('class', 'slideme-img-active');

  }

  for (var g = 0; g < slideMe.addClicks.length; g++) {

    slideMe.addClicks[g].addEventListener('click', addClicksFn, false);

  }

};