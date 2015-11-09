
slideMe.playList = function () {

  slideMe.DOM.createPlaylist;

  if (document.getElementById('slideme-playlist') !== null) {
    slideMe.DOM.createPlaylist = document.getElementById('slideme-playlist');
  } else {
    slideMe.DOM.createPlaylist = document.createElement('div');
    slideMe.DOM.createPlaylist.setAttribute('id', 'slideme-playlist');
    slideMe.slideMeContainer.appendChild(slideMe.DOM.createPlaylist);
  }

  slideMe.DOM.createPlaylist.innerHTML = '<div id="slideme-playlist-title">Playlist<div id="slideme-playlist-drop">></div></div><div id="slideme-playlist-list"></div>';

  var playListTitle = document.getElementById('slideme-playlist-title');
  var playListList = document.getElementById('slideme-playlist-list');

  if (slideMe.data.playlist) {
    playListData = slideMe.data.playlist;
  }

  function playlistReloadClick() {
    slideMe.reload(this.getAttribute('data-json'));
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
      playListTitle.classList.add('slideme-drop-active');
    } else {
      open = false;
      playListList.style.display = 'none';
      playListTitle.classList.remove('slideme-drop-active');
    }

  });

};


slideMe.destroyPlaylist = function() {
  slideMe.DOM.createPlaylist.remove();
  return false;
};
