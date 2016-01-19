var insertSpiner = document.createElement('style');
insertSpiner.innerHTML = '[data-letSlidejs] {font-family: Helvetica, Arial, sans-serif;position:relative;height:500px}#letSlide-preloader{position:absolute;top:0;bottom:0;left:0;right:0;padding:15% 0 0;background:#fff;z-index:50;color:#000;text-align:center}#letSlide-preloader:after{content:"Loading, please wait...";font-size:12px;font-weight:100;display:block}@keyframes letSlideSpinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@-webkit-keyframes letSlideSpinner{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}.icon-spinner{-webkit-animation:letSlideSpinner .75s linear infinite;animation:letSlideSpinner 2s linear infinite;font-size:20px;line-height:50px;width:50px;height:50px;cursor:default;text-align:center;color:#000}';
letSlide.getHead.appendChild(insertSpiner);

letSlide.addPreloader = function () {

  var preloaderDom = '<i class="icon-spinner">.</i>';
  letSlide.DOM.preloaderWrapper = document.createElement('div');
  letSlide.DOM.preloaderWrapper.setAttribute('id', 'letSlide-preloader');
  letSlide.DOM.preloaderWrapper.innerHTML = preloaderDom;
  letSlide.letSlideContainer.appendChild(letSlide.DOM.preloaderWrapper);

};
