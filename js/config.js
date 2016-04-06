document.addEventListener('DOMContentLoaded', function() {

  var checkAllletSlide = document.querySelectorAll('[data-letSlidejs]');

  letSlide.startupletSlide = function (thiletSlide) {
    thiletSlide.classList.add('letSlide-loaded');
    letSlide.letSlideContainer = thiletSlide;
    letSlide.addPreloader();
    letSlide.getletSlideUrl = letSlide.letSlideContainer.getAttribute('data-letSlidejs');
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
    letSlide.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.6/letSlidecss.min.css', 'css', function(){
      letSlide.firstLoad = true;
      startupLoop();
    });
  } else {
    startupLoop();
  }

});
