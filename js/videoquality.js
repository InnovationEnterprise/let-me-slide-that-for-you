var slideMeHD = slideMe.thisPlayer.controlBar.addChild('button', {
  text: 'HD'
});

slideMeHD.addClass('slideme-hd-btn');

var vidoQualityChanged = false;
var videoOriginal = slideMe.thisPlayer.src();

var slideMeGetQuality = function () {

  var src;
  
  if (vidoQualityChanged === false) {

    vidoQualityChanged = true;

    var thisTypeUrl = slideMe.thisPlayer.src();
    var findThatType = slideMe.slideMeContainer.getElementsByTagName('video')[0];
    findThatType = findThatType.querySelectorAll('[ src="' + thisTypeUrl + '"]')[0];
    findThatType = findThatType.getAttribute('type');
    
    var videoHigh;

    for (var sourceType in slideMe.data.videosources) {
      if (sourceType === findThatType) {
        videoHigh = slideMe.data.videosources[sourceType];
      }
    }

    src = videoHigh;
    document.getElementsByClassName('slideme-hd-btn')[0].style.opacity = '1';

  } else {
    vidoQualityChanged = false;
    src = videoOriginal;
    document.getElementsByClassName('slideme-hd-btn')[0].style.opacity = '0.5';
  }

  var thisTime = slideMe.thisPlayer.currentTime();
  slideMe.thisPlayer.src(src);
  slideMe.thisPlayer.currentTime(thisTime);
  slideMe.thisPlayer.play();

};

slideMeHD.on('click', slideMeGetQuality);