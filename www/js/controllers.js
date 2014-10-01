var app = angular.module('starter.controllers', []);

app.controller('PlayCtrl', function($scope, $rootScope, $localstorage, $ionicPopup, Answer) {
  $scope.showDetails = $rootScope.started;
  $scope.attempts = JSON.parse($localstorage.get('attempts'));

  var getNumber = function() {
    var max = JSON.parse($localstorage.get('data')).digit;
    var arr = [];
    for (var i = 0; i < max; i++) {
      arr.push({index: i})
    };
    return arr;
  }

  $scope.maxNumbers = getNumber();

  $scope.startGame = function() {
    $rootScope.started = true;
    $scope.showDetails = !$scope.showDetails;
    Answer.generate();
  }

  $scope.checkAnswer = function() {
    var attempt = [];
    var inputs = document.getElementsByClassName("number-input");

    for (var i = 0; i < inputs.length; i++) {
      attempt.push(parseInt(inputs[i].value));
    };

    var feedback = Answer.check(attempt);
    $scope.addAttempt(attempt.join(""), feedback);
    if (feedback == "You win!") {
      showAnswer();
    }
  }

  $scope.addAttempt = function(guess, result) {
    var attempts = JSON.parse($localstorage.get('attempts'));
    attempts.push({guess: guess, result: result});
    $localstorage.set('attempts', JSON.stringify(attempts));
    $scope.attempts = attempts;
  }

  $scope.giveUp = function() {
    showAnswer();
  }

  var showAnswer = function() {
    $scope.showRestart = !$scope.showRestart;
    $scope.finalAnswer = JSON.parse($localstorage.get('ansArr')).join("");
  }

  $scope.restartGame = function() {
    $scope.showRestart = !$scope.showRestart;
    $rootScope.newGame();
    $scope.attempts = JSON.parse($localstorage.get('attempts'));
  }

  $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: "Awww... it's ok",
      template: "Life is hard. Giving up is easy! Go ahead, we'd love to tell you the answer :)",
      okText: "I give up...",
      cancelText: "Never!"
    });
    confirmPopup.then(function(res) {
      if(res) {
        $scope.giveUp();
      }
    });
  };
});

app.controller('RulesCtrl', function($scope) {
})

app.controller('SettingsCtrl', function($scope, $rootScope, $localstorage, Digits, Repeat) {
  $scope.data = JSON.parse($localstorage.get('data'));

  $scope.$watch('data.digit', function(newValue, oldValue) {
    $scope.sentence = Digits[newValue];
    if (newValue != oldValue) {
      $scope.data.digit = newValue;
      updateAndRestart($scope.data);
    }
  });

  $scope.$watch('data.repeat', function(newValue, oldValue) {
    $scope.repeat = Repeat[newValue];
    if (newValue != oldValue) {
      $scope.data.repeat = newValue;
      updateAndRestart($scope.data);
    }
  });

  var updateAndRestart = function(data) {
    $localstorage.set('data', JSON.stringify(data));
    $rootScope.newGame();
  }
})

app.controller('HistoryCtrl', function($scope) {
});