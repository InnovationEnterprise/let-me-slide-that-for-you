letSlide.loadJson = function (jsonUrl) {

  var request = new XMLHttpRequest();

  request.open('GET', jsonUrl);

  request.onload = function() {

    letSlide.checkifready();

    if (request.readyState == 4 && request.status == 200) {

      letSlide.data = JSON.parse(request.responseText);

      if (letSlide.data.videosourcesmobile || letSlide.data.videosources) {
        var videojsurl = '//vjs.zencdn.net/4.12.11/video.js';
        letSlide.loadAssets(videojsurl, 'script', function() {
          console.log("videojsurl");
          letSlide.createDOM();
        });
      }

      if (letSlide.data.videoslides || letSlide.data.slideshare) {
        letSlide.getSlides();
      }

      if (letSlide.data.playlist) {
        letSlide.playList();
      }

      console.log('json fetched');

    } else {
      letSlide.errorThat('cannot connect', letSlide.letSlideContainer);
    }

  };

  request.onerror = function() {

    letSlide.errorThat('cannot connect', letSlide.letSlideContainer);
  };

  request.send();

};
