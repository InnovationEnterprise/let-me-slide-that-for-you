slideMe.fullscreen = function() {

  slidemefullscreen = slideMe.thisPlayer.controlBar.addChild('button', {
    text: 'Full screen'
  });
  slidemefullscreen.addClass('slideme-fullscreen-btn');

  var fullscreenon = false;

  slidemefullscreen.on('click', function() {

    if (fullscreenon === false) {

      fullscreenon = true;

      slideMe.slideMeContainer.classList.add('this-fixed');
      slideMe.slideMeContainer.classList.add('full-mobile');

      var fullScreen = document.createElement('div');
      fullScreen.setAttribute('id', 'slideme-fullscreen');
      fullScreen.innerHTML = '<div id="slideme-close-popup">x</div>';
      slideMe.slideMeContainer.appendChild(fullScreen);

      slideMe.presentationNode.style.display = 'block';
      document.getElementById('slideme-list-wrapper').style.display = 'block';

      slideMe.presentationNode.style.height = parseFloat(slideMe.slideMeContainer.style.height) + 'px';
      document.getElementById('slideme-list-wrapper').style.bottom = - 75 + 'px';

      var removeFullScr = function() {
        fullScreen.remove();
        slideMe.slideMeContainer.classList.remove('this-fixed');
        slideMe.slideMeContainer.classList.remove('full-mobile');
        if (slideMe.slideMeContainer.parentNode.offsetWidth <= 900) {
          document.getElementById('slideme-list-wrapper').style.display = 'none';
        } else {
          document.getElementById('slideme-list-wrapper').style.display = 'block';
        }
        slideMe.slideMeContainer.style.marginTop = 0 + 'px';
        slideMe.slideMeContainer.style.marginLeft = 'auto';

        fullscreenon = false;
      };


      if (slideMe.presentationNode) {
        slideMe.presentationNode.style.display = 'block';
        document.getElementById('slideme-list-wrapper').style.display = 'block';
      }





      document.getElementById('slideme-close-popup').addEventListener('click', removeFullScr, false);
      document.getElementById('slideme-fullscreen').addEventListener('click', removeFullScr, false);

    }

  });

};
