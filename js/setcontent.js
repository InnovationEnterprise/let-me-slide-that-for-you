slideMe.setContent = function (isImg) {

  var firstImage;
  var videoSlides = slideMe.data.videoslides;

  for (var i = 0; i < videoSlides.length; i++) {

    var thisContent = videoSlides[i].slidecontent;
    var thisContentTime = 60 * videoSlides[i].timemin + parseInt(videoSlides[i].timesec);
    var createSlideNode;

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

  }

  // set first slide


  if (isImg) {

    var getFirstImg = videoSlides[0].slidecontent;
    firstImage = document.createElement('img');
    firstImage.setAttribute('src', getFirstImg);
    slideMe.presentationNode.appendChild(firstImage);

    preloaderWrapper.remove();
    slideMeContainer.style.overflow = 'visible';

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
    slideMe.sliderClickEvent(firstImage, false);
  } else {
    thisPlayer.ready(function() {
      slideMe.sliderClickEvent(firstImage, true);
      slideMe.setNewSlide(firstImage);
    });
  }
  

};