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
        imgContainerWidth = 100 * videoSlides.length;
        slideMe.createImgContainer.style.width = imgContainerWidth + 'px';
  
  
      } else {
  
  
        createSlideNode = document.createElement('div');
        createSlideNode.innerHTML = '<div class="slideme-list-content">' + thisContent + '</div>';
        createSlideNode.setAttribute('data-slideme-time', thisContentTime);
  
      }
  
      slideMe.timeList.push(thisContentTime);
  
      slideMe.createImgContainer.appendChild(createSlideNode);
  
      contentNumber = contentNumber + 1;
      if (contentNumber === videoSlides.length) {
        slideMe.imagesReady = true;
      }
  
    }
  } else {
    createSlideNode = document.createElement('div');
    createSlideNode.innerHTML = '<div class="slideme-list-content">' + slideshare + '</div>';
    slideMe.createImgContainer.appendChild(createSlideNode);
  }

  // set first slide


  if (isImg) {

    var getFirstImg = videoSlides[0].slidecontent;
    slideMe.firstImage = document.createElement('img');
    slideMe.firstImage.setAttribute('src', getFirstImg);
    slideMe.presentationNode.appendChild(slideMe.firstImage);

    slideMe.slideMeContainer.style.overflow = 'visible';

  }

  console.log('slider content set');

  if (slideMe.data.videoslidestype === 'html') {

    var setSlideMeNav = true;

    document.getElementById('slideme-html-nav-left').addEventListener('click', function() {

      var top = slideMe.createImgContainer.offsetTop;

      if (top < 0 && setSlideMeNav === true) {

        slideMe.createImgContainer.style.top = slideMe.createImgContainer.offsetTop + 360 + 'px';

        setSlideMeNav = false;

        setTimeout(function() {
          setSlideMeNav = true;
        }, 350);

      }

    });

    document.getElementById('slideme-html-nav-right').addEventListener('click', function() {
      
      var top = slideMe.createImgContainer.offsetTop;
      var height = slideMe.createImgContainer.offsetHeight;

      if (top > -height + 360 && setSlideMeNav === true) {

        slideMe.createImgContainer.style.top = slideMe.createImgContainer.offsetTop - 360 + 'px';

        setSlideMeNav = false;

        setTimeout(function() {
          setSlideMeNav = true;
        }, 350);

      }

    });

  }

  if (!slideMe.data.videosourcesmobile && !slideMe.data.videosources) {
    slideMe.sliderClickEvent(slideMe.firstImage, false);
    slideMe.contentReady = true;
  } else {
    slideMe.contentReady = true;
  }
  

};