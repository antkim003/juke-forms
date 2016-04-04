'use strict';

juke.controller('PlaylistsCtrl', function ($scope, thePlaylist, $state) {
  $scope.playlist = thePlaylist;

  $scope.newPlaylist = function() {
    var newObj = {name: newPlaylistForm.name.value}
    // $scope.playlists.push(newObj);
    PlaylistFactory.create(newObj)
      .then(function(playlist) {
        newPlaylistForm.reset();
        $state.go('onePlaylist',playlist._id);
      } );
  };
});

juke.controller('PlaylistCtrl', function($scope, thePlaylist, allSongs, PlaylistFactory, PlayerFactory) {
  $scope.playlist = thePlaylist;
  $scope.songs = allSongs;

  $scope.addSong = function() {
    PlaylistFactory.addSong(thePlaylist, $scope.songToAdd)
      .then(function(song) {
        console.log(song);
      });
  };

  $scope.getCurrentSong = function () {
    return PlayerFactory.getCurrentSong();
  };

  $scope.isPlaying = function (song) {
    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
  };

  $scope.toggle = function (song) {
    if (song !== PlayerFactory.getCurrentSong()) {
      PlayerFactory.start(song, $scope.playlist.songs);
    } else if ( PlayerFactory.isPlaying() ) {
      PlayerFactory.pause();
    } else {
      PlayerFactory.resume();
    }
  };
});