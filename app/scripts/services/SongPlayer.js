 (function () {
     /**
          * @function SongPlayer
          * @desc Major player functions
          * @returns {Object} Object that implemetns basic play/pause functionality
          */
     function SongPlayer() {
         /**
          * @desc object of the simple media operations
          * @type {Object}
          */
         var SongPlayer = {};
         /**
          * @desc flag of the song state
          * @type {boolean}
          */
         var currentSong = null;
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
                 currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });

             currentSong = song;
         };
         /**
          * @function playSong
          * @desc plays currentBuzzObject and changes currentSong.playting to true
          */
         var playSong = function () {
             currentBuzzObject.play();
             currentSong.playing = true;
         };

         /**
          * @ngdoc function
          * @name SongpPlayer.play
          * @description This method playing the song
          * @param {Object} song
          */
         SongPlayer.play = function (song) {
             if (currentSong !== song) {
                 setSong(song);
                 playSong();
             } else if (currentSong === song) {
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
             currentBuzzObject.pause();
             song.playing = false;
         };

         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
