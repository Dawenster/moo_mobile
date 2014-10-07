// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.run(function($rootScope, $localstorage, Answer) {
  var initialSettings = {
    "digit": 4,
    "repeat": false,
    "timer": true
  }
  $localstorage.set('data', JSON.stringify(initialSettings));
  $localstorage.set('answerShown', JSON.stringify(false));

  $rootScope.games = [];

  $rootScope.url = "http://localhost:3000/"
  // $rootScope.url = "http://moo-game.herokuapp.com/"

  $rootScope.newGame = function() {
    $localstorage.set('answerShown', JSON.stringify(false));
    $localstorage.set('attempts', JSON.stringify([]));
    Answer.generate();
    startOffPlayTime();
  }

  var startOffPlayTime = function() {
    $rootScope.playTimeStart = new Date();
  }

  $rootScope.newGame();
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.play', {
      url: '/play',
      views: {
        'tab-play': {
          templateUrl: 'templates/tab-play.html',
          controller: 'PlayCtrl'
        }
      }
    })

    .state('tab.rules', {
      url: '/rules',
      views: {
        'tab-rules': {
          templateUrl: 'templates/tab-rules.html',
          controller: 'RulesCtrl'
        }
      }
    })

    .state('tab.scores', {
      url: '/scores',
      views: {
        'tab-scores': {
          templateUrl: 'templates/tab-scores.html',
          controller: 'ScoresCtrl'
        }
      }
    })

    .state('tab.history', {
      url: '/history',
      views: {
        'tab-history': {
          templateUrl: 'templates/tab-history.html',
          controller: 'HistoryCtrl'
        }
      }
    })

    .state('tab.history-detail', {
      url: '/history/:gameId',
      views: {
        'tab-history': {
          templateUrl: 'templates/history-detail.html',
          controller: 'HistoryDetailCtrl'
        }
      }
    })

    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'SettingsCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/play');

});


Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;

  // compare lengths - can save a lot of time 
  if (this.length != array.length)
    return false;

  for (var i = 0, l=this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i]))
        return false;       
    }           
    else if (this[i] != array[i]) { 
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;   
    }           
  }       
  return true;
}