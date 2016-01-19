letSlide.loadImages = function () {

  var ajaxImgCount = 0;
  var videoSlidesLength =  letSlide.data.videoslides.length;

  function getAllImages(i) {

    var thisImg = letSlide.data.videoslides[i].slidecontent;
    var reqImg = new Image();
    reqImg.src = thisImg;

    reqImg.onload = function() {
      ajaxImgCount = ajaxImgCount + 1;
      if (ajaxImgCount === videoSlidesLength) {
        letSlide.setContent(true);
      }
    };

    reqImg.onerror = function() {
      letSlide.errorThat('cannot load image', letSlide.letSlideContainer);
    };

  }

  for (var i = 0; i < videoSlidesLength; i++) {
    getAllImages(i);
  }

};