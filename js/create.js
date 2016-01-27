letSlide.createDOM = function () {

  // create video dom

    var createVideoPlayer = document.createElement('div');
    createVideoPlayer.setAttribute('id', 'letSlide-wrapper');

    if (letSlide.data.videosourcesmobile || letSlide.data.videosources) {

      letSlide.DOM.thisVideoPlayer = document.createElement('video');

      letSlide.inarticle = letSlide.letSlideContainer.getAttribute('data-inarticle');

      if (letSlide.inarticle === 'true') {
        letSlide.addAttributes(letSlide.DOM.thisVideoPlayer, {'id': 'videojs'});
      } else {
        letSlide.addAttributes(letSlide.DOM.thisVideoPlayer, {'id': 'videojs', 'controls': ''});
      }

      var videoSources;

      if (letSlide.data.videosourcesmobile) {
        videoSources = letSlide.data.videosourcesmobile;
      } else {
        videoSources = letSlide.data.videosources;
      }

      if (letSlide.data.subtitles) {

        for (var i = 0; i < letSlide.data.subtitles.length; i++) {

          var createSubtitleNode = document.createElement('track');

          letSlide.addAttributes(createSubtitleNode, {
            'src' : letSlide.data.subtitles[i].src,
            'srclang' : letSlide.data.subtitles[i].srclang,
            'label' : letSlide.data.subtitles[i].label
          });

          if (letSlide.data.subtitles[i].default === true) {
            createSubtitleNode.setAttribute('default', '');
          }

          letSlide.DOM.thisVideoPlayer.appendChild(createSubtitleNode);

        }

      }


      letSlide.letSlideContainer.appendChild(letSlide.DOM.thisVideoPlayer);

      if (letSlide.data.youtube !== 'true') {
        for (var value in videoSources) {
          if (videoSources.hasOwnProperty(value)) {
            var createVideoSource = document.createElement("source");
            letSlide.addAttributes(createVideoSource, {
              "src": videoSources[value],
              "type": value
            });
            letSlide.DOM.thisVideoPlayer.appendChild(createVideoSource);
          }
        }

      letSlide.fireVideJs();

      } else {

          letSlide.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.5/letSlideyt.js', 'script', function() {
            letSlide.fireVideJs();
          });


      }

    }

};
