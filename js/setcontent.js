letSlide.setContent = function (isImg) {

  var videoSlides = letSlide.data.videoslides;
  var contentNumber = 0;
  var createSlideNode;

  if (!letSlide.data.slideshare) {

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
        letSlide.addAttributes(createSlideNode, {
          'src': thisContent,
          'data-letSlide-time': thisContentTime
        });
        letSlide.DOM.createImgContainer.style.width = 100 * letSlide.data.videoslides.length + 'px';
      } else {
        createSlideNode = document.createElement('div');
        createSlideNode.innerHTML = '<div class="letSlide-list-content">' + thisContent + '</div>';
        createSlideNode.setAttribute('data-letSlide-time', thisContentTime);
      }

      letSlide.timeList.push(thisContentTime);
      letSlide.DOM.createImgContainer.appendChild(createSlideNode);
      contentNumber = contentNumber + 1;

      if (contentNumber === videoSlides.length) {
        letSlide.contentReady = true;
      }

    }

  }

  // set first slide

  if (isImg) {
    letSlide.firstImage = new Image();
    letSlide.firstImage.src = videoSlides[0].slidecontent;
    letSlide.DOM.presentationNode.appendChild(letSlide.firstImage);
  }

  console.log('slider content set');

  if (letSlide.data.videoslidestype === 'html') {

    var setletSlideNav = true;


    document.getElementById('letSlide-html-nav-left').addEventListener('click', function() {
      var letSlideAllSlides = document.querySelectorAll('[data-letSlide-time]');
      for (var i = 0; i < letSlideAllSlides.length; i++) {
        if (letSlideAllSlides[i].classList.contains('letSlide-img-active') && i !== 0) {
          letSlideAllSlides[i].classList.remove('letSlide-img-active');
          i = i - 1;
          letSlideAllSlides[i].classList.add('letSlide-img-active');
          letSlide.thisPlayer.currentTime(letSlideAllSlides[i].getAttribute('data-letSlide-time'));
          letSlide.thisPlayer.play();
        }
      }
    });

    document.getElementById('letSlide-html-nav-right').addEventListener('click', function() {
      var letSlideAllSlides = document.querySelectorAll('[data-letSlide-time]');
      for (var i = 0; i < letSlideAllSlides.length; i++) {
        if (letSlideAllSlides[i].classList.contains('letSlide-img-active') && i < letSlideAllSlides.length - 1) {
          letSlideAllSlides[i].classList.remove('letSlide-img-active');
          i = i + 1;
          letSlideAllSlides[i].classList.add('letSlide-img-active');
          letSlide.thisPlayer.currentTime(letSlideAllSlides[i].getAttribute('data-letSlide-time'));
          letSlide.thisPlayer.play();
        }
      }
    });

  }

  if (!letSlide.data.videosourcesmobile && !letSlide.data.videosources && letSlide.data.videoslidestype !== 'html') {
    letSlide.sliderClickEvent(letSlide.firstImage, false);
  } else if (!letSlide.data.videosourcesmobile && !letSlide.data.videosources && letSlide.data.videoslidestype !== 'images') {
    letSlide.sliderClickEvent(letSlide.firstImage, false);
  }

  letSlide.contentReady = true;

};
