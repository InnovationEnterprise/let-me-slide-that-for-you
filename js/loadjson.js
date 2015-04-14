slideMe.loadJson = function (jsonUrl) {

  var request;
  if (document.all && !window.atob) {
    request = new XDomainRequest();
  } else {
    request = new XMLHttpRequest();
  }

  request.open('GET', jsonUrl);
  request.onload = function() {

    if (request.readyState == 4 && request.status == 200) {

      slideMe.data = JSON.parse(request.responseText); 
      
    
      if (slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined) {
        
        var videojsurl;
        if (slideMe.data.youtube === 'true') {
          videojsurl = '//vjs.zencdn.net/4.5/video.js';
        } else {
          videojsurl = '//vjs.zencdn.net/4.12.5/video.js';
        }

        slideMe.loadAssets(videojsurl, 'script', function() {
          console.log("videojsurl");
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

    var readyPlayer = setInterval(function() {

      if (document.getElementById('slideme-preloader') !== null) {

        if (slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined){
          if (slideMe.thisPlayer !== undefined && slideMe.contentReady === true){
            document.getElementById('slideme-preloader').style.display = 'none';
            clearInterval(readyPlayer);
          }
        } else {
          if (slideMe.contentReady === true) {
            document.getElementById('slideme-preloader').style.display = 'none';
            clearInterval(readyPlayer);
          }
        }

      } else {
        clearInterval(readyPlayer);
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