var app = angular.module('starter.controllers', []);

app.controller('PlayCtrl', function($scope, Answer) {
  $scope.attempts = []

  $scope.checkAnswer = function(attempt) {
    var feedback = Answer.check(attempt);
    $scope.addAttempt(attempt, feedback);
  }

  $scope.addAttempt = function(guess, result) {
    $scope.attempts.push({guess: guess, result: result});
  }
});

app.controller('SettingsCtrl', function($scope) {
  $scope.user = {username: "Dawenster"}
})

app.controller('HistoryCtrl', function($scope) {
});