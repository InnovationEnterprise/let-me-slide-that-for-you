slideMe.setContent = function (isImg) {

  var videoSlides = slideMe.data.videoslides;
  var contentNumber = 0;
  var createSlideNode;

  if (!slideMe.data.slideshare) {

    for (var i = 0; i < videoSlides.length; i++) {

      var thisContent = videoSlides[i].slidecontent;

      if (videoSlides[i].timemin === '') {
        videoSlides[i].timesec = '0';
      }
      if (videoSlides[i].timesec === '') {
        videoSlides[i].timesec = '0';
      }

      var thisContentTime = 60 * videoSlides[i].timemin + parseInt(videoSlides[i].timesec);

      if (isImg) {
        createSlideNode = document.createElement('img');
        slideMe.addAttributes(createSlideNode, {
          'src': thisContent,
          'data-slideme-time': thisContentTime
        });
        slideMe.DOM.createImgContainer.style.width = 100 * slideMe.data.videoslides.length + 'px';
      } else {
        createSlideNode = document.createElement('div');
        createSlideNode.innerHTML = '<div class="slideme-list-content">' + thisContent + '</div>';
        createSlideNode.setAttribute('data-slideme-time', thisContentTime);
      }

      slideMe.timeList.push(thisContentTime);
      slideMe.DOM.createImgContainer.appendChild(createSlideNode);
      contentNumber = contentNumber + 1;

      if (contentNumber === videoSlides.length) {
        slideMe.contentReady = true;
      }

    }

  }

  // set first slide

  if (isImg) {
    slideMe.firstImage = new Image();
    slideMe.firstImage.src = videoSlides[0].slidecontent;
    slideMe.DOM.presentationNode.appendChild(slideMe.firstImage);
    slideMe.slideMeContainer.style.overflow = 'visible';
  }

  console.log('slider content set');

  if (slideMe.data.videoslidestype === 'html') {

    var setSlideMeNav = true;


    document.getElementById('slideme-html-nav-left').addEventListener('click', function() {
      var slideMeAllSlides = document.querySelectorAll('[data-slideme-time]');
      for (var i = 0; i < slideMeAllSlides.length; i++) {
        if (slideMeAllSlides[i].classList.contains('slideme-img-active') && i !== 0) {
          slideMeAllSlides[i].classList.remove('slideme-img-active');
          i = i - 1;
          slideMeAllSlides[i].classList.add('slideme-img-active');
          slideMe.thisPlayer.currentTime(slideMeAllSlides[i].getAttribute('data-slideme-time'));
          slideMe.thisPlayer.play();
        }
      }
    });

    document.getElementById('slideme-html-nav-right').addEventListener('click', function() {
      var slideMeAllSlides = document.querySelectorAll('[data-slideme-time]');
      for (var i = 0; i < slideMeAllSlides.length; i++) {
        if (slideMeAllSlides[i].classList.contains('slideme-img-active') && i < slideMeAllSlides.length - 1) {
          slideMeAllSlides[i].classList.remove('slideme-img-active');
          i = i + 1;
          slideMeAllSlides[i].classList.add('slideme-img-active');
          slideMe.thisPlayer.currentTime(slideMeAllSlides[i].getAttribute('data-slideme-time'));
          slideMe.thisPlayer.play();
        }
      }
    });

  }

  if (!slideMe.data.videosourcesmobile && !slideMe.data.videosources && slideMe.data.videoslidestype !== 'html') {
    slideMe.sliderClickEvent(slideMe.firstImage, false);
  } else if (!slideMe.data.videosourcesmobile && !slideMe.data.videosources && slideMe.data.videoslidestype !== 'images') {
    slideMe.sliderClickEvent(slideMe.firstImage, false);
  }

  slideMe.contentReady = true;

};
