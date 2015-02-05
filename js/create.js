slideMe.createDOM = function () {

  isVideoSlide = slideMe.data.videoslides !== undefined;
  haveSource = slideMe.data.videosourcesmobile !== undefined || slideMe.data.videosources !== undefined;

  // create video dom

    var createVideoPlayer = document.createElement('div');
    createVideoPlayer.setAttribute('id', 'slideme-wrapper');   

    if (haveSource) {

      slideMe.thisVideoPlayer = document.createElement('video');

      
      slideMe.addAttributes(slideMe.thisVideoPlayer, {'id': 'videojs', 'controls': ''});

      var videoSources;

      if (isMobile !== null) {
        videoSources = slideMe.data.videosourcesmobile;
      } else {
        videoSources = slideMe.data.videosources;
      }
    
      slideMeContainer.appendChild(slideMe.thisVideoPlayer);

      for (var value in videoSources) {
        if (videoSources.hasOwnProperty(value)) {
          var createVideoSource = document.createElement("source");
          slideMe.addAttributes(createVideoSource, {
            "src": videoSources[value],
            "type": value
          });
          slideMe.thisVideoPlayer.appendChild(createVideoSource);
        }
      }
      
      if (slideMe.data.subtitles !== undefined) {

        for (var i = 0; i < slideMe.data.subtitles.length; i++) {

          var createSubtitleNode = document.createElement('track');

          slideMe.addAttributes(createSubtitleNode, {
            'src' : slideMe.data.subtitles[i].src, 
            'srclang' : slideMe.data.subtitles[i].srclang,
            'label' : slideMe.data.subtitles[i].label
          });          

          if (slideMe.data.subtitles[i].default === 'true') {
            createSubtitleNode.setAttribute('default', '');
          }

          slideMe.thisVideoPlayer.appendChild(createSubtitleNode);

        }

      }

      slideMe.fireVideJs();

    }


};
