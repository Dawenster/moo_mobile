var app = angular.module('starter.controllers', []);

app.controller('PlayCtrl', function($scope, Answer) {
  $scope.checkAnswer = function(attempt) {
    console.log(Answer.check(attempt));
  }
});

app.controller('SettingsCtrl', function($scope) {
  $scope.user = {username: "Dawenster"}
})

app.controller('HistoryCtrl', function($scope) {
});