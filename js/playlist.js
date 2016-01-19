
letSlide.playList = function () {

  if (document.getElementById('letSlide-playlist') !== null) {
    letSlide.DOM.createPlaylist = document.getElementById('letSlide-playlist');
  } else {
    letSlide.DOM.createPlaylist = document.createElement('div');
    letSlide.DOM.createPlaylist.setAttribute('id', 'letSlide-playlist');
    letSlide.letSlideContainer.appendChild(letSlide.DOM.createPlaylist);
  }

  letSlide.DOM.createPlaylist.innerHTML = '<div id="letSlide-playlist-title">Playlist<div id="letSlide-playlist-drop">></div></div><div id="letSlide-playlist-list"></div>';

  var playListTitle = document.getElementById('letSlide-playlist-title');
  var playListList = document.getElementById('letSlide-playlist-list');

  if (letSlide.data.playlist) {
    playListData = letSlide.data.playlist;
  }

  function playlistReloadClick() {
    letSlide.reload(this.getAttribute('data-json'));
    return false;
  }

  for (var i = 0; i < playListData.length; i++) {

    var newElemnt;

    if (playListData[i].type === 'json') {
      newElemnt = document.createElement('p');
      newElemnt.innerHTML = playListData[i].title;
      newElemnt.setAttribute('data-json', playListData[i].link);
      playListList.appendChild(newElemnt);
      newElemnt.addEventListener('click', playlistReloadClick);
    } else {
      newElemnt = document.createElement('a');
      newElemnt.innerHTML = playListData[i].title;
      newElemnt.setAttribute('href', playListData[i].link);
      newElemnt.setAttribute('target', '_blank');
      playListList.appendChild(newElemnt);
    }

  }

  var open = false;
  playListTitle.addEventListener('click', function() {

    if (!open) {
      open = true;
      playListList.style.display = 'block';
      playListTitle.classList.add('letSlide-drop-active');
    } else {
      open = false;
      playListList.style.display = 'none';
      playListTitle.classList.remove('letSlide-drop-active');
    }

  });

};


letSlide.destroyPlaylist = function() {
  letSlide.DOM.createPlaylist.remove();
  return false;
};
