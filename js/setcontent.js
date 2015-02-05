slideMe.setContent = function (isImg) {
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
      createImgContainer.style.width = imgContainerWidth + 'px';


    } else {

      createSlideNode = document.createElement('div');
      createSlideNode.innerHTML = '<div class="slideme-list-content">' + thisContent + '</div>';
      createSlideNode.setAttribute('data-slideme-time', thisContentTime);

    }

    timeList.push(thisContentTime);

    createImgContainer.appendChild(createSlideNode);

  }

  // set first slide


  if (isImg) {

    var getFirstImg = videoSlides[0].slidecontent;
    firstImage = document.createElement('img');
    firstImage.setAttribute('src', getFirstImg);
    createPresentationContainer.appendChild(firstImage);

    preloaderWrapper.remove();
    slideMeContainer.style.overflow = 'visible';

  }

  console.log('slider content set');

  if (data.videoslidestype === 'html') {

    var setSlideMeNav = true;

    document.getElementById('slideme-html-nav-left').addEventListener('click', function() {

      var top = createImgContainer.offsetTop;

      if (top < 0 && setSlideMeNav === true) {

        createImgContainer.style.top = createImgContainer.offsetTop + 360 + 'px';

        setSlideMeNav = false;

        setTimeout(function() {
          setSlideMeNav = true;
        }, 350);

      }

    });

    document.getElementById('slideme-html-nav-right').addEventListener('click', function() {

      var top = createImgContainer.offsetTop;
      var height = createImgContainer.offsetHeight;

      if (top > -height + 360 && setSlideMeNav === true) {

        createImgContainer.style.top = createImgContainer.offsetTop - 360 + 'px';

        setSlideMeNav = false;

        setTimeout(function() {
          setSlideMeNav = true;
        }, 350);

      }

    });

  }

  // add click to slides

  addClicks = document.querySelectorAll('[data-slideme-time]');
  addClicks[0].setAttribute('class', 'slideme-img-active');

  function addClicksFn() {

    if (haveSource) {

      var thisTime = this.getAttribute('data-slideme-time');
      thisPlayer.currentTime(thisTime);
      thisPlayer.play();

    } else {

      firstImage.setAttribute('src', this.getAttribute('src'));

    }

    if (data.videoslidestype === 'images' && this !== addClicks[0]) {

      createImgContainer.style.left = 150 - this.offsetLeft + 'px';

    }

    document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
    this.setAttribute('class', 'slideme-img-active');

  }

  for (var g = 0; i < addClicks.length; g++) {

    addClicks[g].addEventListener('click', addClicksFn, false);

  }

};