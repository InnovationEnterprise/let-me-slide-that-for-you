slideMe.setSize = function() {

    var sW = slideMe.slideMeContainer.parentNode.offsetWidth;

    var isThisFixed = slideMe.slideMeContainer.classList.contains('this-fixed');

    if (isThisFixed) {
      sW = window.innerWidth;
    }

    var sH;
    var vW = sW;

    var vH;

    if (!slideMe.data.videosourcesmobile && !slideMe.data.videosources) {

      sH = 480;

    } else {

      sW = sW / 2;
      sH = sW / 1.78;

      vW = sW;
      vH = sH;

      sW = sH * 1.33;

    }


    if (!slideMe.data.videoslides && !slideMe.data.slideshare) {

      vH = vW  / 1.78;

    } else {

      var adsContainer = document.getElementById('ima-ad-container');

      if (adsContainer !== null) {

        adsContainer.style.width = vW + 'px';
        adsContainer.style.height = vH + 'px';

        document.getElementById('ima-seek-bar-div').style.width = vW + 'px';

        adsContainer.getElementsByTagName('iframe')[0].style.width = vW + 'px';
        adsContainer.getElementsByTagName('iframe')[0].style.height = vH + 'px';

      }

      slideMe.presentationNode.style.width = sW + 'px';
      slideMe.presentationNode.style.height = sH + 'px';

      slideMe.slideMeContainer.style.height = vH + 75 + 'px';

    }
    
    slideMe.slideMeContainer.style.width = vW + sW + 'px';

    var slideMeHeaderOne = document.getElementById('slideme-h1');

    if (!slideMe.data.videoslides && !slideMe.data.slideshare && slideMe.slideMeContainer.parentNode.offsetWidth >= 900) {

      vW = vW * 1.2;
      vH = vW / 1.78;
      if (slideMeHeaderOne !== null) {
        slideMeHeaderOne.style.maxWidth = vW + 'px';
      }
      
    } else {
      if (slideMeHeaderOne !== null) {
        slideMeHeaderOne.style.maxWidth = vW + sW + 'px';
      }
    }

    if (slideMe.slideMeContainer.parentNode.offsetWidth <= 770) {
      
      if (!isThisFixed) {
        if (slideMe.presentationNode) {
          slideMe.presentationNode.style.display = 'none';
          if (!slideMe.data.slideshare) {
            document.getElementById('slideme-list-wrapper').style.display = 'none';
          }
        }
        vW = slideMe.slideMeContainer.offsetWidth;
        vH = vW / 1.78;
      }

      slideMe.slideMeContainer.style.height = vH + 'px';

    } else {

      if (slideMe.presentationNode) {
        slideMe.presentationNode.style.display = 'block';
        if (!slideMe.data.slideshare) {
          document.getElementById('slideme-list-wrapper').style.display = 'block';
          document.getElementById('slideme-list-wrapper').style.bottom = '0px';
        }
      }

    }

    if (!slideMe.data.videoslides && !slideMe.data.slideshare) {
      slideMe.slideMeContainer.style.height = vH + 'px';
    }
    slideMe.thisPlayer.dimensions(vW, vH);


};
