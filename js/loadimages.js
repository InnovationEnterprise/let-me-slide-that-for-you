slideMe.loadImages = function () {

  var ajaxImgCount = 0;
  var videoSlidesLength =  slideMe.data.videoslides.length;

  function getAllImages(i) {

    var thisImg = slideMe.data.videoslides[i].slidecontent;
    var reqImg = new Image();
    reqImg.src = thisImg;

    reqImg.onload = function() {
      ajaxImgCount = ajaxImgCount + 1;
      if (ajaxImgCount === videoSlidesLength) {
        slideMe.setContent(true);
      }
    };

    reqImg.onerror = function() {
      slideMe.errorThat('cannot load image', slideMe.slideMeContainer);
    };

  }

  for (var i = 0; i < videoSlidesLength; i++) {
    getAllImages(i);
  }

};