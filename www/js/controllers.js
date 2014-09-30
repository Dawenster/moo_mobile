var app = angular.module('starter.controllers', []);

app.controller('PlayCtrl', function($scope, $rootScope, $localstorage, Answer) {
  $scope.showDetails = $rootScope.started;
  $scope.attempts = JSON.parse($localstorage.get('attempts'));

  $scope.checkAnswer = function(attempt) {
    var feedback = Answer.check(attempt);
    $scope.addAttempt(attempt, feedback);
  }

  $scope.addAttempt = function(guess, result) {
    var attempts = JSON.parse($localstorage.get('attempts'));
    attempts.push({guess: guess, result: result});
    $localstorage.set('attempts', JSON.stringify(attempts));
    $scope.attempts = attempts;
  }

  $scope.setDigits = function(digits) {

  }

  $scope.setRepeat = function(repeat) {
    
  }

  $scope.startGame = function() {
    console.log("Let the games begin!")

    $rootScope.started = true;
    $scope.showDetails = !$scope.showDetails;
  }

  $scope.restartGame = function(digits) {
    $localstorage.set('attempts', JSON.stringify([]));
  }
});

app.controller('RulesCtrl', function($scope) {
})

app.controller('SettingsCtrl', function($scope, Digits, Repeat) {
  $scope.data = {digit: 4, repeat: false}

  $scope.$watch('data.digit', function(newValue, oldValue) {
    $scope.sentence = Digits[newValue];
  });

  $scope.$watch('data.repeat', function(newValue, oldValue) {
    $scope.repeat = Repeat[newValue];
  });
})

app.controller('HistoryCtrl', function($scope) {
});