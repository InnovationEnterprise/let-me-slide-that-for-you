letSlide.sliderClickEvent = function (firstImage, ready) {

  letSlide.addClicks = document.querySelectorAll('[data-letSlide-time]');
  letSlide.addClicks[0].classList.add('letSlide-img-active');

  function addClicksFn() {

    if (ready && !letSlide.data.syncoff) {
      var duration = letSlide.thisPlayer.duration();
      if (letSlide.data.videosourcesmobile && duration > 10 || letSlide.data.videosources && duration > 10) {
        var thisTime = this.getAttribute('data-letSlide-time');
        letSlide.thisPlayer.currentTime(thisTime);
        letSlide.thisPlayer.play();
      }
    }

    if (letSlide.data.videoslidestype === 'images' && this !== letSlide.addClicks[0]) {
      letSlide.DOM.createImgContainer.style.left = 150 - this.offsetLeft + 'px';
    }

    if (letSlide.data.videoslidestype === 'images') {
      firstImage.setAttribute('src', this.getAttribute('src'));
    }

    document.getElementsByClassName('letSlide-img-active')[0].classList.remove('letSlide-img-active');
    this.classList.add('letSlide-img-active');

  }

  for (var g = 0; g < letSlide.addClicks.length; g++) {
    letSlide.addClicks[g].addEventListener('click', addClicksFn, false);
  }

  if (letSlide.data.videoslidestype === 'images') {
    var animated = false;
    var imgContainerWidth = 100 * letSlide.data.videoslides.length;

    document.getElementById('letSlide-btn-next').addEventListener('click', function() {
      var imgContainerPosition = letSlide.DOM.createImgContainer.offsetLeft;
      if (animated === false && imgContainerPosition > - imgContainerWidth + 500) {
        animated = true;
        letSlide.DOM.createImgContainer.style.left = imgContainerPosition - 200 + 'px';
        setTimeout(function(){
          animated = false;
        }, 325);
      }
    }, false);

    document.getElementById('letSlide-btn-prev').addEventListener('click', function() {
      var imgContainerPosition = letSlide.DOM.createImgContainer.offsetLeft;
      if (!animated && imgContainerPosition < 50) {
        animated = true;
        var slideThatMuch;
        if (imgContainerPosition < -50) {
          slideThatMuch = 200;
        } else {
          slideThatMuch = 100;
        }
        letSlide.DOM.createImgContainer.style.left = imgContainerPosition + slideThatMuch + 'px';
        setTimeout(function(){
          animated = false;
        }, 325);
      }
    }, false);

  }

};
