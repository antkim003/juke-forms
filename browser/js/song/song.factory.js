'use strict';

juke.factory('SongFactory', function ($http) {

  return {
    convert: function (song) {
      song.audioUrl = '/api/songs/' + song._id + '.audio';
      return song;
    },
    fetchAll: function() {
      var self = this;
      return $http.get('/api/songs/')
        .then(function(resp) {
          var songs = resp.data
          songs = songs.map(function(song) {
            return self.convert(song);
          });
          return songs;
        });
    }
  };

});
