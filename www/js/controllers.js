var app = angular.module('starter.controllers', []);

app.controller('PlayCtrl', function($scope, $rootScope, $localstorage, $ionicPopup, $cordovaDevice, Answer) {
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
      saveGameRecord("win");
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
    saveGameRecord("giveup");
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

  var getUserParams = function() {
    var uuid = "";
    var username = "Shy person";
    var platform = "";
    try {
      uuid = $cordovaDevice.getUUID();
      platform = $cordovaDevice.getPlatform();
      model = $cordovaDevice.getModel();
    }
    catch(err) {
      uuid = "Testing"
      platform = "Test platform"
      model = "Test model"
    }
    return {
      uuid: uuid,
      username: username,
      platform: platform,
      model: model
    }
  }

  var saveGameRecord = function(result) {
    var userParams = getUserParams();
    var data = JSON.parse($localstorage.get('data'));
    var url = $rootScope.url + 'create_record';

    $.post(url,
      {
        user_params: userParams,
        game_params: {
          answer: $scope.finalAnswer,
          result: result,
          time: $scope.time,
          digits: data.digit,
          repeat: data.repeat
        },
        attempts: $scope.attempts
      }
    ).done(function (data) {
      console.log(data);
    }).fail(function() {
      console.log("I'm a failure...");
    });
  }

  var answerShown = JSON.parse($localstorage.get('answerShown'));
  if (answerShown) {
    showAnswer();
  }
});

app.controller('RulesCtrl', function($scope) {
  $scope.goToWiki = function() {
    var ref = window.open('http://en.wikipedia.org/wiki/Bulls_and_cows', '_blank', 'location=yes');
  }
})

app.controller('ScoresCtrl', function($scope, $rootScope, $ionicLoading, $cordovaDevice, $ionicPopover) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  var getUUID = function() {
    var uuid = "";
    try {
      uuid = $cordovaDevice.getUUID();
    }
    catch(err) {
      uuid = "Testing"
    }
    return uuid
  }

  $scope.getScore = function() {
    var uuid = getUUID();
    var url = $rootScope.url + "get_score";

    $.get(url,
      {
        uuid: uuid
      }
    ).done(function (result) {
      $scope.hide();
      $scope.score = result.score;
      $scope.high_scores = result.high_scores;
      $scope.fastest_by_digit = result.fastest_by_digit;
    }).fail(function() {
      console.log("I'm a failure...");
    });
  }

  $scope.show();
  $scope.getScore();

  $ionicPopover.fromTemplateUrl('score-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
  // Execute action on hide popover
  $scope.$on('popover.hidden', function() {
    // Execute action
  });
  // Execute action on remove popover
  $scope.$on('popover.removed', function() {
    // Execute action
  });
})


app.controller('HistoryCtrl', function($scope, $rootScope, $ionicLoading, $cordovaDevice) {
  $scope.show = function() {
    $ionicLoading.show({
      template: 'Loading...'
    });
  };

  $scope.hide = function(){
    $ionicLoading.hide();
  };

  var getUUID = function() {
    var uuid = "";
    try {
      uuid = $cordovaDevice.getUUID();
    }
    catch(err) {
      uuid = "Testing"
    }
    return uuid
  }

  $scope.getAllGames = function() {
    var uuid = getUUID();
    var url = $rootScope.url + "fetch_records";

    $.get(url,
      {
        uuid: uuid
      }
    ).done(function (result) {
      $scope.hide();
      $scope.games = result.data;
      $rootScope.games = $scope.games;
      if ($scope.games) {
        $scope.showRecords = true;
      } else {
        $scope.showRecords = false;
      }
    }).fail(function() {
      console.log("I'm a failure...");
    });
  }

  $scope.show();
  $scope.getAllGames();

  $scope.doRefresh = function() {
    $scope.getAllGames();
    $scope.$broadcast('scroll.refreshComplete');
  };
})

.controller('HistoryDetailCtrl', function($scope, $stateParams, $rootScope) {
  var getGame = function(gameId) {
    var index = null;
    for (var i = 0; i < $rootScope.games.length; i++) {
      if ($rootScope.games[i].id == gameId) {
        index = i;
      }
    };
    return $rootScope.games[index];
  }
  $scope.game = getGame($stateParams.gameId);
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

  var getUserParams = function(username) {
    var uuid = "";
    var username = username || "Shy person";
    var platform = "";
    try {
      uuid = $cordovaDevice.getUUID();
      platform = $cordovaDevice.getPlatform();
      model = $cordovaDevice.getModel();
    }
    catch(err) {
      uuid = "Testing"
      platform = "Test platform"
      model = "Test model"
    }
    return {
      uuid: uuid,
      username: username,
      platform: platform,
      model: model
    }
  }

  var getUUID = function() {
    var uuid = "";
    try {
      uuid = $cordovaDevice.getUUID();
    }
    catch(err) {
      uuid = "Testing"
    }
    return uuid
  }

  $scope.submitUsername = function(username) {
    var userParams = getUserParams(username);
    var url = $rootScope.url + 'update_username';

    $.post(url,
      {
        user_params: userParams
      }
    ).done(function (data) {
      console.log(data);
    }).fail(function() {
      console.log("I'm a failure...");
    });
  }

  $scope.getUsername = function() {
    var uuid = getUUID();
    var url = $rootScope.url + 'get_username';

    $.get(url,
      {
        uuid: uuid
      }
    ).done(function (result) {
      if (result.username == "Shy person") {
        $scope.username = ""
      } else {
        $scope.username = result.username
      }
      console.log(result);
    }).fail(function() {
      console.log("I'm a failure...");
    });
  }

  $scope.getUsername();
});
















