
slideMe.playList = function () {

  var createPlaylist;

  if (document.getElementById('slideme-playlist') !== null) {

    createPlaylist = document.getElementById('slideme-playlist');

  } else {

    createPlaylist = document.createElement('div');
    createPlaylist.setAttribute('id', 'slideme-playlist');

  }

  createPlaylist.innerHTML = '<div id="slideme-playlist-title">Playlist<div id="slideme-playlist-drop">></div></div><div id="slideme-playlist-list"></div>';
  slideMeContainer.appendChild(createPlaylist);

  slideMeContainer.style.margin = '0 auto 50px auto';


  var playListTitle = document.getElementById('slideme-playlist-title');
  var playListList = document.getElementById('slideme-playlist-list');

  if (data.playlist !== undefined) {
    playListData = data.playlist;
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

      playListList.appendChild(newElemnt);

    }

  }

  var open = false;
  playListTitle.addEventListener('click', function() {

    if (open === false) {

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

  document.getElementById('slideme-playlist').remove();

};
