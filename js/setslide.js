slideMe.setNewSlide = function() {

  if (slideMe.imagesReady) {
    
    var getCurrentTime = Math.round(slideMe.thisPlayer.currentTime());
    var arrayNr;
  
    for (var i = 0; i < slideMe.timeList.length; i++) {   
  
      if (getCurrentTime >= slideMe.timeList[i]) {
        arrayNr = slideMe.timeList[i];
      }
  
    }
  
    if (slideMe.currentArrayNr !== arrayNr) {
  
      slideMe.currentArrayNr = arrayNr;
  
      var getSlideFromDom = document.querySelectorAll('[data-slideme-time="' + arrayNr + '"]')[0];
  
      if (slideMe.data.videoslidestype === 'images') {
        
        if (getSlideFromDom !== getSlideFromDom) {
  
          slideMe.createImgContainer.style.left =  150 - getSlideFromDom.offsetLeft + 'px';
  
        } else { 
  
          slideMe.createImgContainer.style.left =  50 - getSlideFromDom.offsetLeft + 'px' ;
  
        }
  
        slideMe.firstImage.setAttribute('src', getSlideFromDom.getAttribute('src'));
  
      } else {
  
        slideMe.createImgContainer.style.top = - getSlideFromDom.offsetTop + 'px';
  
      }
  
      document.getElementsByClassName('slideme-img-active')[0].classList.remove('slideme-img-active');
      getSlideFromDom.classList.add('slideme-img-active');
  
    }

  }

};
