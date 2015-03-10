document.addEventListener('DOMContentLoaded', function() {

  slideMe.slideMeContainer = document.querySelectorAll('[data-slidemejs]')[0];

  slideMe.addPreloader();

  slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/slidemecss.min.css', 'css', function(){
  
    if (slideMe.slideMeContainer !== undefined && slideMe.slideMeContainer.getAttribute('data-slidemejs') !== '' && slideMe.slideMeContainer.getAttribute('data-autoconfig') !== 'false') {
      slideMe.loadJson(slideMe.slideMeContainer.getAttribute('data-slidemejs'));
    }

  });

});