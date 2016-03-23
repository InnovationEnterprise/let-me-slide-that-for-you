var letSlideHD = letSlide.thisPlayer.controlBar.addChild('button', {
  text: 'HD'
});

letSlideHD.addClass('letSlide-hd-btn');

var vidoQualityChanged = false;
var videoOriginal = letSlide.thisPlayer.src();

var letSlideGetQuality = function () {

  var src;
  
  if (vidoQualityChanged === false) {

    vidoQualityChanged = true;

    var thisTypeUrl = letSlide.thisPlayer.src();
    var findThatType = letSlide.letSlideContainer.getElementsByTagName('video')[0];
    findThatType = findThatType.querySelectorAll('[ src="' + thisTypeUrl + '"]')[0];
    findThatType = findThatType.getAttribute('type');
    
    var videoHigh;

    for (var sourceType in letSlide.data.videosources) {
      if (sourceType === findThatType) {
        videoHigh = letSlide.data.videosources[sourceType];
      }
    }

    src = videoHigh;
    document.getElementsByClassName('letSlide-hd-btn')[0].style.opacity = '1';

  } else {
    vidoQualityChanged = false;
    src = videoOriginal;
    document.getElementsByClassName('letSlide-hd-btn')[0].style.opacity = '0.5';
  }

  var thisTime = letSlide.thisPlayer.currentTime();
  letSlide.thisPlayer.src(src);
  letSlide.thisPlayer.currentTime(thisTime);
  letSlide.thisPlayer.play();

};

letSlideHD.on('click', letSlideGetQuality);