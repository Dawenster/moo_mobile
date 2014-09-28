angular.module('starter.controllers', [])

.controller('PlayCtrl', function($scope, Answer) {
  $scope.checkAnswer = function(attempt) {
    var answer = Answer
    console.log(answer == attempt);
  }
})

.controller('SettingsCtrl', function($scope) {
  $scope.user = {username: "Dawenster"}
})

.controller('HistoryCtrl', function($scope) {
});