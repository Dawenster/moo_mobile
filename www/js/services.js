var app = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
app.factory("Answer", function($localstorage) {
  var Answer = {};

  Answer.generate = function() {
    var ans = Math.floor(Math.random()*9000) + 1000;
    console.log(ans);
    $localstorage.set('ans', JSON.stringify(ans));
  }

  Answer.check = function(attempt) {
    var ans = JSON.parse($localstorage.get('ans'));
    if (ans === attempt) {
      return "You win!";
    } else {
      return provideFeedback(ans, attempt);
    }
  }
  
  var provideFeedback = function(answer, attempt) {
    var letters = "";

    splitAnswers = answer.toString().split("");
    splitAttempt = attempt.toString().split("");

    for (var i = 0; i < splitAttempt.length; i++) {
      letters += determineLetter(splitAttempt[i], splitAnswers, i);
    };

    return countLetters(letters);
  }

  var determineLetter = function(letter, splitAnswers, letterIndex) {
    var foundIndex = splitAnswers.indexOf(letter)

    if (foundIndex > -1) {
      if (foundIndex == letterIndex) {
        return "A";
      } else {
        return "B";
      }
    }
  }

  var countLetters = function(letters) {
    var countA = (letters.match(/A/g) || []).length + "A";
    var countB = (letters.match(/B/g) || []).length + "B";

    return countA + " " + countB;
  }

  return Answer
});

app.factory("Digits", function() {
  var Digits = {
    1: "Your cat could do this",
    2: "Don't wanna think huh?",
    3: "Easy peasy",
    4: "Normal",
    5: "Keener",
    6: "Respect, yo!",
    7: "Ok, you're a computer aren't you"
  };
  
  return Digits
});

app.factory("Repeat", function() {
  var Repeat = {
    true: "True: This means digits can repeat, like 1122. This makes the game more challenging.",
    false: "False: This means digits cannot repeat, like 1234."
  };
  
  return Repeat
});

app.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])













