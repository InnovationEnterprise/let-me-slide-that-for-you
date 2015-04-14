document.addEventListener('DOMContentLoaded', function() {

  if (document.querySelectorAll('[data-slidemejs]')[0].getAttribute('data-interview') !== 'true') {
    slideMe.slideMeContainer = document.querySelectorAll('[data-slidemejs]')[0];
    slideMe.addPreloader();
  }
  
  slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/slidemecss.min.css', 'css', function(){
    if (slideMe.slideMeContainer !== undefined && slideMe.slideMeContainer.getAttribute('data-slidemejs') !== '' && slideMe.slideMeContainer.getAttribute('data-interview') !== 'true') {
      slideMe.loadJson(slideMe.slideMeContainer.getAttribute('data-slidemejs'));
    }

  });

});