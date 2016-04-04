'use strict';

juke.factory('PlaylistFactory', function($http, SongFactory, AlbumFactory) {
  var playlistFactory = {};
  var cachedPlaylist = [];

  playlistFactory.create = function(playlist) {
    return $http.post('api/playlists/', playlist)
      .then(function(response) {
        var playlist = response.data;
        cachedPlaylist.push(playlist);
        return playlist;
      })
  };

  playlistFactory.fetchAll = function() {
    return $http.get('/api/playlists')
      .then(function(response) {
        angular.copy(response.data, cachedPlaylist);
        return cachedPlaylist;
      });
  };

  playlistFactory.fetchById = function(id) {
    return $http.get('/api/playlists/'+ id)
      .then(function(response) {
        var playlist = response.data;
        try {
          playlist.songs = playlist.songs.map(SongFactory.convert);
          playlist.albums = playlist.albums.map(AlbumFactory.convert);  
        } catch(e) {
          return playlist;
        }
        
        return playlist;
      });
  };

  playlistFactory.addSong = function(playlist, song) {
    return $http.post('api/playlists/' + playlist._id + '/songs', {song: song})
      .then(function(response) {
        return response.data;
      })
  };

  return playlistFactory;
});