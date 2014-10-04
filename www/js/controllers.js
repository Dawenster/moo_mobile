var app = angular.module('starter.controllers', []);

app.controller('PlayCtrl', function($scope, $rootScope, $localstorage, $ionicPopup, Answer) {
  $scope.attempts = JSON.parse($localstorage.get('attempts'));
  $scope.currentTimeElapsed = $rootScope.playTimeStart;
  $scope.holdingAdd = {}
  $scope.holdingSubtract = {}

  var getNumber = function() {
    var max = JSON.parse($localstorage.get('data')).digit;
    var arr = [];
    for (var i = 0; i < max; i++) {
      arr.push({index: i})
    };
    return arr;
  }

  $scope.maxNumbers = getNumber();

  var executeAdd = function(index) {
    var numHolder = document.getElementsByClassName('digit-' + index)[0];
    var num = parseInt(numHolder.innerHTML);
    if (num == 9) {
      numHolder.innerHTML = 0;
    } else {
      numHolder.innerHTML = num + 1;
    }
  }

  var executeSubtract = function(index) {
    var numHolder = document.getElementsByClassName('digit-' + index)[0];
    var num = parseInt(numHolder.innerHTML);
    if (num == 0) {
      numHolder.innerHTML = 9;
    } else {
      numHolder.innerHTML = num - 1;
    }
  }

  $scope.addNumberFromHold = function(index) {
    $scope.holdingAdd[index] = true;
    window.setInterval(function(){
      if ($scope.holdingAdd[index]) {
        executeAdd(index);
      }
    }, 200);
  }

  $scope.releaseAddHold = function(index) {
    $scope.holdingAdd[index] = false;
  }

  $scope.addNumber = function(index) {
    executeAdd(index);
  }

  $scope.subtractNumberFromHold = function(index) {
    $scope.holdingSubtract[index] = true;
    window.setInterval(function(){
      if ($scope.holdingSubtract[index]) {
        executeSubtract(index);
      }
    }, 200);
  }

  $scope.releaseSubtractHold = function(index) {
    $scope.holdingSubtract[index] = false;
  }

  $scope.subtractNumber = function(index) {
    executeSubtract(index);
  }

  var addGreyout = function(direction, index) {
    var icon = document.getElementsByClassName(direction + '-icon-' + index)[0];
    icon.className += " greyout"
  }

  var removeGreyout = function(direction, index) {
    var icon = document.getElementsByClassName(direction + '-icon-' + index)[0];
    icon.className = icon.className.replace(/\bgreyout\b/,'');
  }

  $scope.checkAnswer = function() {    
    var attempt = [];
    var inputs = document.getElementsByClassName("number-input");

    for (var i = 0; i < inputs.length; i++) {
      attempt.push(parseInt(inputs[i].innerHTML));
    };

    var feedback = Answer.check(attempt);
    
    $scope.addAttempt(attempt.join(""), feedback);

    if (feedback == "You win!") {
      endTime();
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
    endTime();
    showAnswer();
  }

  var endTime = function() {
    var time = new Date() - $rootScope.playTimeStart;
    $localstorage.set('time', JSON.stringify(time));
  }

  var showAnswer = function() {
    $scope.showRestart = !$scope.showRestart;
    $scope.time = JSON.parse($localstorage.get('time'));
    $scope.finalAnswer = JSON.parse($localstorage.get('ansArr')).join("");
    $localstorage.set('answerShown', JSON.stringify(true));
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

  var answerShown = JSON.parse($localstorage.get('answerShown'));
  if (answerShown) {
    showAnswer();
  }
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