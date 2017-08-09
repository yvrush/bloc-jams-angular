 (function () {
     /**
      * @function SongPlayer
      * @desc Major player functions
      * @returns {Object} Object that implemetns basic play/pause functionality
      */
     function SongPlayer(Fixtures) {
         /**
          * @desc object of the simple media operations
          * @type {Object}
          */
         var SongPlayer = {};
         /**
          * @desc flag of the song state
          * @type {boolean}
          */
         var currentAlbum = Fixtures.getAlbum();
         /**
          * @desc Buzz object audio file
          * @type {Object}
          */
         var currentBuzzObject = null;
         /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         var setSong = function (song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             SongPlayer.currentSong = song;
         };
         /**
          * @function playSong
          * @desc plays currentBuzzObject and changes currentSong.playting to true
          */
         var playSong = function () {
             currentBuzzObject.play();
             SongPlayer.currentSong.playing = true;
         };

         var getSongIndex = function (song) {
             return currentAlbum.songs.indexOf(song);
         };
         
         var stopSong = function() {
             currentBuzzObject.stop();
             SongPlayer.currentSong.playing = null
             
         }


         SongPlayer.currentSong = null;

         /**
          * @ngdoc function
          * @name SongpPlayer.play
          * @description This method playing the song
          * @param {Object} song
          */
         SongPlayer.play = function (song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
                 playSong();
             } else if (SongPlayer.currentSong === song) {
                 if (currentBuzzObject.isPaused()) {
                     playSong();
                 }
             }
         };
         /**
          * @ngdoc function
          * @name SongpPlayer.pause
          * @description This method pausing the song 
          * @param {Object} song
          */
         SongPlayer.pause = function (song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         SongPlayer.previous = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;
             if (currentSongIndex < 0) {
                 stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };
         
         SongPlayer.next = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;
             if (currentSongIndex > currentAlbum.songs.length) {
                 stopSong();
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
