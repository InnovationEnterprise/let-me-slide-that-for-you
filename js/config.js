document.addEventListener('DOMContentLoaded', function() {

  var checkAllSlideme = document.querySelectorAll('[data-slidemejs]');

  slideMe.startupSlideme = function (thiSlideme) {
    thiSlideme.classList.add('slideme-loaded');
    slideMe.slideMeContainer = thiSlideme;
    slideMe.addPreloader();
    slideMe.getSlideMeUrl = slideMe.slideMeContainer.getAttribute('data-slidemejs');
    if (/^http?:\/\//.test(slideMe.getSlideMeUrl)) {
      slideMe.getSlideMeUrl = slideMe.getSlideMeUrl.replace(/^https?:\/\//,'https://');
    }
    slideMe.loadJson(slideMe.getSlideMeUrl);
  };


  function startupLoop(){
   for (var i = 0; i < checkAllSlideme.length; i++) {
      if (!checkAllSlideme[i].classList.contains('slideme-loaded') && !checkAllSlideme[i].classList.contains('slideme-request')) {
        slideMe.startupSlideme(checkAllSlideme[i]);
        return false;
      }
    }
  }

  if (!slideMe.firstLoad) {
    slideMe.loadAssets('http://127.0.0.1:8080/build/slidemecss.min.css', 'css', function(){
      slideMe.firstLoad = true;
      startupLoop();
    });
  } else {
    startupLoop();
  }

});
