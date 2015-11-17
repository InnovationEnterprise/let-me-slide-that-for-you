var insertSpiner = document.createElement('style');
insertSpiner.innerHTML = '[data-slidemejs] {font-family: Helvetica, Arial, sans-serif;position:relative;height:500px}#slideme-preloader{position:absolute;top:0;bottom:0;left:0;right:0;padding:15% 0 0;background:#fff;z-index:50;color:#000;text-align:center}#slideme-preloader:after{content:"Loading, please wait...";font-size:12px;font-weight:100;display:block}@keyframes slideMeSpinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@-webkit-keyframes slideMeSpinner{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}.icon-spinner{-webkit-animation:slideMeSpinner .75s linear infinite;animation:slideMeSpinner 2s linear infinite;font-size:20px;line-height:50px;width:50px;height:50px;cursor:default;text-align:center;color:#000}';
slideMe.getHead.appendChild(insertSpiner);

slideMe.addPreloader = function () {

  var preloaderDom = '<i class="icon-spinner">.</i>';
  slideMe.DOM.preloaderWrapper = document.createElement('div');
  slideMe.DOM.preloaderWrapper.setAttribute('id', 'slideme-preloader');
  slideMe.DOM.preloaderWrapper.innerHTML = preloaderDom;
  slideMe.slideMeContainer.appendChild(slideMe.DOM.preloaderWrapper);

};
