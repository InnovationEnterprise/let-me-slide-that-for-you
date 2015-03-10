slideMe.loadJson = function (jsonUrl) {

  var request = new XMLHttpRequest();
  request.open('GET', jsonUrl, true);

  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {

      slideMe.data = JSON.parse(request.responseText); 

      if (slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined) {
        slideMe.loadAssets('//vjs.zencdn.net/4.12/video.js', 'script', function(){
          slideMe.createDOM();
        });
      }

      if (slideMe.data.videoslides !== undefined) {
        slideMe.getSlides();
      }

      console.log('json fetched');
      
    } else {

      slideMe.errorThat('cannot connect', slideMe.slideMeContainer);

    }

    var readyPlayer = setInterval(function(){

      if (slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined){
        if (slideMe.thisPlayer !== undefined && slideMe.contentReady === true){
          slideMe.preloaderWrapper.remove();
          clearInterval(readyPlayer);
        }
      } else {
        if (slideMe.contentReady === true) {
          slideMe.preloaderWrapper.remove();
          clearInterval(readyPlayer);
        }
      }

    }, 50);


  };

  request.onerror = function() {
    slideMe.errorThat('cannot connect', slideMe.slideMeContainer);
  };

  request.send();

};

slideMe.reload = function (jsonUrl) {

    videojs.dispose();

    while(slideMe.slideMeContainer.firstChild) {
      slideMe.slideMeContainer.removeChild(slideMe.slideMeContainer.firstChild);
    }

    addPreloader();
    loadJson(jsonUrl);

};