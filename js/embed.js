slideMe.embed = function() {
    var embedNode = document.createElement('div');
    embedNode.setAttribute('id', 'slideme-share');
    var getJsonUrl = document.querySelectorAll('[data-slidemejs]')[0].getAttribute('data-slidemejs');
    var embedCode = document.createTextNode('<div data-slidemejs="' + getJsonUrl + '"></div> <script src="//d3gr29hczmiozh.cloudfront.net/slideme.min.js" async></script>');
    embedNode.innerHTML = '<div id="slideme-embed-close">x</div><div id="slideme-title">Embed<p>Copy and paste the code below into your website</p></div><textarea id="slideme-code"></textarea>';
    slideMe.slideMeContainer.appendChild(embedNode);
    document.getElementById('slideme-code').appendChild(embedCode);

    document.getElementById('slideme-embed-close').addEventListener('click', function() {
      embedNode.style.display = "none";
    });

    button = slideMe.thisPlayer.addChild('button', {
      text: 'Embed'
    });
    button.addClass('slideme-emebed-btn');
    button.on('click', function() {
      embedNode.style.display = "block";
    });

};