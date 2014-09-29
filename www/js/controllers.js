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