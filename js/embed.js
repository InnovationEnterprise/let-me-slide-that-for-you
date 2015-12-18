slideMe.embed = function() {
  var embedNode = document.createElement('div');
  embedNode.setAttribute('id', 'slideme-share');
  var embedCode = document.createTextNode('<div data-slidemejs="' + slideMe.getSlideMeUrl + '"></div> <script src="//d3gr29hczmiozh.cloudfront.net/0.1.3/slideme.min.js" async></script>');
  embedNode.innerHTML = '<div id="slideme-embed-close">x</div><div id="slideme-title">Embed<p>Copy and paste the code below into your website</p></div><textarea id="slideme-code"></textarea>';
  slideMe.slideMeContainer.appendChild(embedNode);
  document.getElementById('slideme-code').appendChild(embedCode);

  document.getElementById('slideme-embed-close').addEventListener('click', function() {
    embedNode.style.display = "none";
  });

  document.getElementsByTagName('html')[0].addEventListener('click', function() {
    embedNode.style.display = "none";
  });

  var button = slideMe.thisPlayer.addChild('button', {
    text: 'Embed'
  });
  document.getElementById('slideme-code').addEventListener('click', function(e){
    e.stopPropagation();
  });
  button.addClass('slideme-emebed-btn');
  button.on('click', function(e) {
    e.stopPropagation();
    embedNode.style.display = "block";
  });

};
