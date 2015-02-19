var slideMe = slideMe || {};
var slideMeContainer;
var getHead = document.getElementsByTagName('head')[0];
var isMobile = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i);
var thisVideoPlayer;
slideMe.timeList = [];


// var thisPlayerEl;
// var isVideoSlide;
// var haveSource;
// var timeList = [];
// var addClicks;
// var createImgContainer;
// var firstImage;
// var preloaderWrapper;
// var playListData;
// var createImgContainerWrapper;