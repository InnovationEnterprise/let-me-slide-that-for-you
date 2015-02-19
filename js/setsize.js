slideMe.setSize = function() {

    var sW = slideMeContainer.parentNode.offsetWidth;
    var sH;

    var vW = sW;
    var vH;

    if (slideMe.data.videosourcesmobile === undefined && slideMe.data.videosources === undefined) {

      sH = 480;

    } else {

      sW = sW / 2;
      sH = sW / 1.78;

      vW = sW;
      vH = sH;

      sW = sH * 1.33;

    }


    if (slideMe.data.videoslides === undefined) {

      vH = vW / 1.78;

    } else {

      slideMe.presentationNode.style.width = sW + 'px';
      slideMe.presentationNode.style.height = sH + 'px';

      slideMeContainer.style.height = vH + 75 + 'px';

    }

    slideMe.thisPlayer.dimensions(vW, vH);
    
    slideMeContainer.style.width = vW + sW + 'px';

};
