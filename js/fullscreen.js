slideMe.fullscreen = function() {

  var slidemefullscreen = slideMe.thisPlayer.controlBar.addChild('button', {
    text: 'Full screen'
  });
  slidemefullscreen.addClass('slideme-fullscreen-btn');

  var fullscreenon = false;

  slidemefullscreen.on('click', function() {

    if (!fullscreenon) {

      fullscreenon = true;

      slideMe.slideMeContainer.classList.add('this-fixed');
      slideMe.slideMeContainer.classList.add('full-mobile');

      var fullScreen = document.createElement('div');
      fullScreen.setAttribute('id', 'slideme-fullscreen');
      var fullScreenClose = document.createElement('div');
      fullScreenClose.setAttribute('id', 'slideme-close-popup');
      fullScreenClose.innerHTML = 'x';
      slideMe.slideMeContainer.appendChild(fullScreen);
      slideMe.slideMeContainer.appendChild(fullScreenClose);

      slideMe.DOM.presentationNode.style.display = 'block';

      if (!slideMe.data.slideshare) {
        document.getElementById('slideme-list-wrapper').style.display = 'block';
        slideMe.DOM.presentationNode.style.height = parseFloat(slideMe.slideMeContainer.style.height) + 'px';
        document.getElementById('slideme-list-wrapper').style.bottom = - 75 + 'px';
      } else {
        slideMe.DOM.presentationNode.style.height = '100%';
      }

      if (slideMe.DOM.presentationNode) {
        slideMe.DOM.presentationNode.style.display = 'block';
        if (!slideMe.data.slideshare) {
          document.getElementById('slideme-list-wrapper').style.display = 'block';
        }
      }


      var removeFullScr = function() {
        fullScreen.remove();
        fullScreenClose.remove();
        slideMe.slideMeContainer.classList.remove('this-fixed');
        slideMe.slideMeContainer.classList.remove('full-mobile');
        if (!slideMe.data.slideshare) {
          if (slideMe.slideMeContainer.parentNode.offsetWidth <= 770) {
              document.getElementById('slideme-list-wrapper').style.display = 'none';
            } else {
              document.getElementById('slideme-list-wrapper').style.display = 'block';
            }
          }
        slideMe.slideMeContainer.style.marginTop = 0 + 'px';
        slideMe.slideMeContainer.style.marginLeft = 'auto';

        fullscreenon = false;
        slideMe.setSize();
      };



      document.getElementById('slideme-close-popup').addEventListener('click', removeFullScr, false);
      document.getElementById('slideme-fullscreen').addEventListener('click', removeFullScr, false);

    }

  });

};
