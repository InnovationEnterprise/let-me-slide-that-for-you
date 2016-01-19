document.addEventListener('DOMContentLoaded', function() {

  var checkAllletSlide = document.querySelectorAll('[data-letSlidejs]');

  letSlide.startupletSlide = function (thiletSlide) {
    thiletSlide.classList.add('letSlide-loaded');
    letSlide.letSlideContainer = thiletSlide;
    letSlide.addPreloader();
    letSlide.getletSlideUrl = letSlide.letSlideContainer.getAttribute('data-letSlidejs');
    if (/^http?:\/\//.test(letSlide.getletSlideUrl)) {
      letSlide.getletSlideUrl = letSlide.getletSlideUrl.replace(/^https?:\/\//,'https://');
    }
    letSlide.loadJson(letSlide.getletSlideUrl);
  };


  function startupLoop(){
   for (var i = 0; i < checkAllletSlide.length; i++) {
      if (!checkAllletSlide[i].classList.contains('letSlide-loaded') && !checkAllletSlide[i].classList.contains('letSlide-request')) {
        letSlide.startupletSlide(checkAllletSlide[i]);
        return false;
      }
    }
  }

  if (!letSlide.firstLoad) {
    letSlide.loadAssets('http://127.0.0.1:8080/build/letSlidecss.min.css', 'css', function(){
      letSlide.firstLoad = true;
      startupLoop();
    });
  } else {
    startupLoop();
  }

});
