slideMe.fullscreen = function() {

  slidemefullscreen = thisPlayer.controlBar.addChild('button', {
    text: 'Full screen'
  });
  slidemefullscreen.addClass('slideme-fullscreen-btn');
  slidemefullscreen.on('click', function() {

    document.querySelectorAll('[data-slidemejs]')[0].classList.add('this-fixed');



    var fullScreen = document.createElement('div');
    fullScreen.setAttribute('id', 'slideme-fullscreen');
    fullScreen.innerHTML = '<div id="slideme-close-popup">x</div>';
    document.querySelectorAll('[data-slidemejs]')[0].appendChild(fullScreen);

    document.getElementById('slideme-container').style.display = 'block';
    document.getElementById('slideme-list-wrapper').style.display = 'block';
    slideMe.setSize();

    var thatH = parseFloat(document.querySelectorAll('[data-slidemejs]')[0].style.height);
    var thatW = parseFloat(document.querySelectorAll('[data-slidemejs]')[0].style.width);

    var sHeight =  (window.innerHeight - thatH) / 2;
    var sWidth = (window.innerWidth - thatW) / 2;
    document.querySelectorAll('[data-slidemejs]')[0].style.marginTop = sHeight + 'px';
    document.querySelectorAll('[data-slidemejs]')[0].style.marginLeft = sWidth + 'px';

    function removeFullScr() {
      fullScreen.remove();
      document.querySelectorAll('[data-slidemejs]')[0].classList.remove('this-fixed');

      document.querySelectorAll('[data-slidemejs]')[0].style.marginTop = 0 + 'px';
      document.querySelectorAll('[data-slidemejs]')[0].style.marginLeft = 'auto';

      document.getElementById('slideme-fakediv').remove();

      if (slideMeContainer.classList.contains('full-mobile')) {
        slideMeContainer.classList.remove('full-mobile');
      }

      slideMe.setSize();
    }

    document.getElementById('slideme-close-popup').addEventListener('click', removeFullScr, false);
    document.getElementById('slideme-fullscreen').addEventListener('click', removeFullScr, false);

  });

};