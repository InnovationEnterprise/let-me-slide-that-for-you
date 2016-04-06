var insertSpiner = document.createElement('style');
insertSpiner.innerHTML = '[data-letSlidejs] {font-family: Helvetica, Arial, sans-serif;position:relative;height:500px}[data-letSlidejs] .letSlide-preloader{position:absolute;top:0;bottom:0;left:0;right:0;padding:15% 0 0;background:#fff;z-index:50;color:#000;text-align:center}[data-letSlidejs] .letSlide-preloader:after{content:"Loading, please wait...";font-size:12px;font-weight:100;display:block}@keyframes letSlideSpinner{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}@-webkit-keyframes letSlideSpinner{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}} [data-letSlidejs] .letSlide-icon-spinner{-webkit-animation:letSlideSpinner 2s linear infinite;animation:letSlideSpinner 2s linear infinite;font-size:20px;display: inline-block; line-height:70px;width:50px;height:50px;cursor:default;text-align:center;color:#000}';
letSlide.getHead.appendChild(insertSpiner);

letSlide.addPreloader = function () {

  var preloaderDom = '<i class="letSlide-icon-spinner">.</i>';
  letSlide.DOM.preloaderWrapper = document.createElement('div');
  letSlide.DOM.preloaderWrapper.setAttribute('class', 'letSlide-preloader');
  letSlide.DOM.preloaderWrapper.innerHTML = preloaderDom;
  letSlide.letSlideContainer.appendChild(letSlide.DOM.preloaderWrapper);

};
