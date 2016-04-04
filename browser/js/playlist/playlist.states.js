'use strict';

juke.config(function ($stateProvider) {

  $stateProvider.state('newPlaylist', {
    url: 'playlist/new',
    templateUrl: '/js/playlist/templates/newplaylist.html',
    controller: 'PlaylistsCtrl',
    resolve: {
      thePlaylist: function(PlaylistFactory, $stateParams) {
          return PlaylistFactory.fetchById($stateParams.playlistId);
      }
    }
  });

  $stateProvider.state('onePlaylist', {
    url: 'playlist/:playlistId',
    templateUrl: '/js/playlist/templates/playlist.html',
    controller: 'PlaylistCtrl',
    resolve: {
      thePlaylist: function(PlaylistFactory, $stateParams) {
          return PlaylistFactory.fetchById($stateParams.playlistId);
      },
      allSongs: function(SongFactory) {
        return SongFactory.fetchAll();
      }
    }
  })

});