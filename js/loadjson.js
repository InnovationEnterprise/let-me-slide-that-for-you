slideMe.loadJson = function (jsonUrl) {

  var request = new XMLHttpRequest();
  request.open('GET', jsonUrl, true);

  request.onload = function() {

    if (request.status >= 200 && request.status < 400) {

      slideMe.data = JSON.parse(request.responseText); 

      if (slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined) {
        slideMe.loadAssets('//vjs.zencdn.net/4.11.2/video.js', 'script', function(){
          slideMe.createDOM();
        });
      }

      if (slideMe.data.videoslides !== undefined) {
        slideMe.getSlides();
      }

      console.log('json fetched');
      
    } else {

      slideMe.errorThat('cannot connect', slideMeContainer);

    }

  };

  request.onerror = function() {
    slideMe.errorThat('cannot connect', slideMeContainer);
  };

  request.send();

};

slideMe.reload = function (jsonUrl) {

    videojs.dispose();

    while(slideMeContainer.firstChild) {
      slideMeContainer.removeChild(slideMeContainer.firstChild);
    }

    addPreloader();
    loadJson(jsonUrl);

};