document.addEventListener('DOMContentLoaded', function() {

  slideMeContainer = document.querySelectorAll('[data-slidemejs]')[0];

  slideMe.addPreloader();

  slideMe.loadAssets('../build/slidemecss.min.css', 'css', function(){
  
    if (slideMeContainer !== undefined && slideMeContainer.getAttribute('data-slidemejs') !== '') {
      slideMe.loadJson(slideMeContainer.getAttribute('data-slidemejs'));
    }

  });

});