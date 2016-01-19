letSlide.embed = function() {

    var embedNode = document.createElement('div');
    embedNode.setAttribute('id', 'letSlide-share');
    var getJsonUrl = document.querySelectorAll('[data-letSlidejs]')[0].getAttribute('data-letSlidejs');
    var embedCode = document.createTextNode('<div data-letSlidejs="' + getJsonUrl + '"></div> <script src="//d3gr29hczmiozh.cloudfront.net/letSlide.min.js"></script>');
    embedNode.innerHTML = '<div id="letSlide-embed-close">x</div><div id="letSlide-title">Embed<p>Copy and paste the code below into your website</p></div><textarea id="letSlide-code"></textarea>';
    letSlideContainer.appendChild(embedNode);
    document.getElementById('letSlide-code').appendChild(embedCode);

    document.getElementById('letSlide-embed-close').addEventListener('click', function() {
      embedNode.style.display = "none";
    });

    button = thisPlayer.addChild('button', {
      text: 'Embed'
    });
    button.addClass('letSlide-emebed-btn');
    button.on('click', function() {
      embedNode.style.display = "block";
    });

};