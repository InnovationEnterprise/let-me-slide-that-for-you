letSlide.embed = function() {
  var embedNode = document.createElement('div');
  embedNode.setAttribute('id', 'letSlide-share');
  var embedCode = document.createTextNode('<div data-letSlidejs="' + letSlide.getletSlideUrl + '"></div> <script src="//d3gr29hczmiozh.cloudfront.net/0.1.5/letSlide.min.js" async></script>');
  embedNode.innerHTML = '<div id="letSlide-embed-close">x</div><div id="letSlide-title">Embed<p>Copy and paste the code below into your website</p></div><textarea id="letSlide-code"></textarea>';
  letSlide.letSlideContainer.appendChild(embedNode);
  document.getElementById('letSlide-code').appendChild(embedCode);

  document.getElementById('letSlide-embed-close').addEventListener('click', function() {
    embedNode.style.display = "none";
  });

  document.getElementsByTagName('html')[0].addEventListener('click', function() {
    embedNode.style.display = "none";
  });

  var button = letSlide.thisPlayer.addChild('button', {
    text: 'Embed'
  });
  document.getElementById('letSlide-code').addEventListener('click', function(e){
    e.stopPropagation();
  });
  button.addClass('letSlide-emebed-btn');
  button.on('click', function(e) {
    e.stopPropagation();
    embedNode.style.display = "block";
  });

};
