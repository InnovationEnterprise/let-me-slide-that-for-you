letSlide.ads = function() {
  var thisChannel = letSlide.letSlideContainer.getAttribute('data-adtag');

  if (letSlide.data.adTagUrl !== undefined || thisChannel) {

    var options;
    if (thisChannel === null || thisChannel === '') {
      options = {
        id: 'videojs',
        adTagUrl: letSlide.data.adTagUrl
      };
    } else {
      options = {
        id: 'videojs',
        adTagUrl: thisChannel
      };
    }

    letSlide.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.7/letSlideads.css', 'css');

    letSlide.loadAssets('//imasdk.googleapis.com/js/sdkloader/ima3.js', 'script', function (){
      letSlide.loadAssets('//d3gr29hczmiozh.cloudfront.net/0.1.7/letSlideads.js', 'script', function() {

        letSlide.thisPlayer.ima(options);
        letSlide.thisPlayer.ima.initializeAdDisplayContainer();
        letSlide.thisPlayer.ima.requestAds();
        console.log('ad script loaded');

        if (letSlide.inarticle === 'true') {

          letSlide.DOM.closeAds = document.createElement('div');
          letSlide.DOM.closeAds.setAttribute('class', 'letsSlide-closeads');
          letSlide.DOM.closeAds.innerHTML = 'Close this ad';
          letSlide.letSlideContainer.appendChild(letSlide.DOM.closeAds);
          letSlide.DOM.closeAds.addEventListener('click', function(){
            letSlide.destroy();
          });

          letSlide.thisPlayer.play();
          letSlide.thisPlayer.on("ended", function(){
            letSlide.reload(letSlide.getletSlideUrl);
          });
        }
      });
    });

  }
};
