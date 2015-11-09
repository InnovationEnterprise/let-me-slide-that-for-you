slideMe.createDOM = function () {

  // create video dom

    var createVideoPlayer = document.createElement('div');
    createVideoPlayer.setAttribute('id', 'slideme-wrapper');   

    if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {

      slideMe.thisVideoPlayer = document.createElement('video');

      slideMe.inarticle = slideMe.slideMeContainer.getAttribute('data-inarticle');

      if (slideMe.inarticle === 'true') {
        slideMe.addAttributes(slideMe.thisVideoPlayer, {'id': 'videojs'});
      } else {
        slideMe.addAttributes(slideMe.thisVideoPlayer, {'id': 'videojs', 'controls': ''});
      }

      var videoSources;

      if (slideMe.data.videosourcesmobile) {
        videoSources = slideMe.data.videosourcesmobile;
      } else {
        videoSources = slideMe.data.videosources;
      }

      if (slideMe.data.subtitles) {

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


      slideMe.slideMeContainer.appendChild(slideMe.thisVideoPlayer);

      if (slideMe.data.youtube !== 'true') {
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

      slideMe.fireVideJs();
        
      } else {

          slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/slidemeyt.js', 'script', function() {
            slideMe.fireVideJs();
          });


      }

    }

  if (slideMe.data.playlist) {
    slideMe.playList();
  }

};
