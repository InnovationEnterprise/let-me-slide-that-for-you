slideMe.createDOM = function () {

  // create video dom

    var createVideoPlayer = document.createElement('div');
    createVideoPlayer.setAttribute('id', 'slideme-wrapper');

    if (slideMe.data.videosourcesmobile || slideMe.data.videosources) {

      slideMe.DOM.thisVideoPlayer = document.createElement('video');

      slideMe.inarticle = slideMe.slideMeContainer.getAttribute('data-inarticle');

      if (slideMe.inarticle === 'true') {
        slideMe.addAttributes(slideMe.DOM.thisVideoPlayer, {'id': 'videojs'});
      } else {
        slideMe.addAttributes(slideMe.DOM.thisVideoPlayer, {'id': 'videojs', 'controls': ''});
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

          if (slideMe.data.subtitles[i].default === true) {
            createSubtitleNode.setAttribute('default', '');
          }

          slideMe.DOM.thisVideoPlayer.appendChild(createSubtitleNode);

        }

      }


      slideMe.slideMeContainer.appendChild(slideMe.DOM.thisVideoPlayer);

      if (slideMe.data.youtube !== 'true') {
        for (var value in videoSources) {
          if (videoSources.hasOwnProperty(value)) {
            var createVideoSource = document.createElement("source");
            slideMe.addAttributes(createVideoSource, {
              "src": videoSources[value],
              "type": value
            });
            slideMe.DOM.thisVideoPlayer.appendChild(createVideoSource);
          }
        }

      slideMe.fireVideJs();

      } else {

          slideMe.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.1/slidemeyt.js', 'script', function() {
            slideMe.fireVideJs();
          });


      }

    }

};
