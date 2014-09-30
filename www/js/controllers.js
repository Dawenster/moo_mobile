var app = angular.module('starter.controllers', []);

app.controller('PlayCtrl', function($scope, $rootScope, Answer) {
  $scope.showDetails = $rootScope.started;

  $scope.checkAnswer = function(attempt) {
    var feedback = Answer.check(attempt);
    $scope.addAttempt(attempt, feedback);
  }

  $scope.addAttempt = function(guess, result) {
    $rootScope.attempts.push({guess: guess, result: result});
  }

  $scope.setDigits = function(digits) {

  }

  $scope.setRepeat = function(repeat) {
    
  }

  $scope.startGame = function() {
    $scope.showDetails = !$scope.showDetails;
    console.log("Let the games begin!")
    $rootScope.started = true;
  }

  $scope.restartGame = function(digits) {
    
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