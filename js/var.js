var slideMe = slideMe || {};
var getHead = document.getElementsByTagName('head')[0];
var isMobile = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i);
slideMe.timeList = [];
slideMe.currentArrayNr = '00';
slideMe.imagesReady = false;
slideMe.contentReady = false;