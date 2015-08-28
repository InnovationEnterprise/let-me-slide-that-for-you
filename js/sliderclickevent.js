slideMe.sliderClickEvent = function (firstImage, ready) {

  slideMe.addClicks = document.querySelectorAll('[data-slideme-time]');
  slideMe.addClicks[0].classList.add('slideme-img-active');

  function addClicksFn() {

    if (ready) {
      var duration = slideMe.thisPlayer.duration();
      if (slideMe.data.videosourcesmobile && duration > 10 || slideMe.data.videosources && duration > 10) {
        var thisTime = this.getAttribute('data-slideme-time');
        slideMe.thisPlayer.currentTime(thisTime);
        slideMe.thisPlayer.play();
      }
    }

    if (slideMe.data.videoslidestype === 'images' && this !== slideMe.addClicks[0]) {
      slideMe.createImgContainer.style.left = 150 - this.offsetLeft + 'px';
    }

    if (slideMe.data.videoslidestype === 'images') {
      firstImage.setAttribute('src', this.getAttribute('src'));
    }

    document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
    this.classList.add('slideme-img-active');

  }

  for (var g = 0; g < slideMe.addClicks.length; g++) {

    slideMe.addClicks[g].addEventListener('click', addClicksFn, false);

  }

  var animated = false;
  var imgContainerWidth = 100 * slideMe.data.videoslides.length;

  document.getElementById('slideme-btn-next').addEventListener('click', function() {

    var imgContainerPosition = slideMe.createImgContainer.offsetLeft;

    if (animated === false && imgContainerPosition > - imgContainerWidth + 500) {

      animated = true;        
      slideMe.createImgContainer.style.left = imgContainerPosition - 200 + 'px';

      setTimeout(function(){
        animated = false;
      }, 325);

    }

  }, false);

  document.getElementById('slideme-btn-prev').addEventListener('click', function() {
    
    var imgContainerPosition = slideMe.createImgContainer.offsetLeft;

    if (!animated && imgContainerPosition < 50) {

      animated = true; 
      var slideThatMuch;

      if (imgContainerPosition < -50) {
        slideThatMuch = 200;
      } else {
        slideThatMuch = 100;
      }
      slideMe.createImgContainer.style.left = imgContainerPosition + slideThatMuch + 'px';
      setTimeout(function(){
        animated = false;
      }, 325);

    }

  }, false);   

};