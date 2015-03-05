slideMe.setSize = function() {

    var sW = slideMeContainer.parentNode.offsetWidth;


    if (slideMeContainer.classList.contains('this-fixed')) {
      sW = window.innerWidth;
    }

    var sH;
    var vW = sW;

    var vH;

    if (slideMe.data.videosourcesmobile === undefined && slideMe.data.videosources === undefined) {

      sH = 480;

    } else {

      sW = sW / 2;
      sH = sW / 1.78;

      vW = sW;
      vH = sH;

      sW = sH * 1.33;

    }


    if (slideMe.data.videoslides === undefined) {

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

      slideMeContainer.style.height = vH + 75 + 'px';

    }
    
    slideMeContainer.style.width = vW + sW + 'px';

    if (slideMe.data.videoslides === undefined && slideMeContainer.parentNode.offsetWidth >= 900) {

      vW = vW * 1.2;
      vH = vW / 1.78;
      if (document.getElementById('slideme-h1') !== null) {
        document.getElementById('slideme-h1').style.maxWidth = vW + 'px';
      }
      
    } else {
      if (document.getElementById('slideme-h1') !== null) {
        document.getElementById('slideme-h1').style.maxWidth = vW + sW + 'px';
      }
    }
    if (slideMeContainer.parentNode.offsetWidth <= 900) {
      
      if (!slideMeContainer.classList.contains('this-fixed')) {
        if (document.getElementById('slideme-container') !== null) {
          document.getElementById('slideme-container').style.display = 'none';
          document.getElementById('slideme-list-wrapper').style.display = 'none';
        }
        vW = slideMeContainer.offsetWidth;
        vH = vW / 1.78;
        slideMeContainer.style.height = vH + 'px';
        slideMeContainer.classList.remove('full-mobile');
      } else {

        if (document.getElementById('slideme-container') !== null) {
          document.getElementById('slideme-container').style.display = 'block';
          document.getElementById('slideme-list-wrapper').style.display = 'block';
        }

        slideMeContainer.style.height = vH + 75 + 'px';
        if (window.innerWidth <= 900) {
         slideMeContainer.classList.add('full-mobile');
        }

        if (document.getElementById('slideme-fakediv') === null && !slideMeContainer.classList.contains('full-mobile')) {

          var slideMeFakeDiv = document.createElement('div');
          slideMeFakeDiv.setAttribute('id', 'slideme-fakediv');
          slideMeContainer.parentNode.insertBefore(slideMeFakeDiv, slideMeContainer.nextSibling);
          if (slideMeContainer.parentNode.offsetWidth <= 415) {
            slideMeFakeDiv.style.height = vH + 105 + 'px';
          } else {
            slideMeFakeDiv.style.height = vH + 75 + 'px';
          }
          

        }

      }

    } else {
      if (document.getElementById('slideme-container') !== null) {
        document.getElementById('slideme-container').style.display = 'block';
        document.getElementById('slideme-list-wrapper').style.display = 'block';
      }
    }

    if (!slideMeContainer.classList.contains('full-mobile')) {
      slideMe.thisPlayer.dimensions(vW, vH);
    }
   


};
