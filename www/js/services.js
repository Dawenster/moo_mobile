var app = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
app.factory("Answer", function($localstorage) {
  var Answer = {};

  Answer.generate = function() {
    var ansArr = []
    var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    data = JSON.parse($localstorage.get('data'));

    for (var i = 0; i < data.digit; i++) {
      var randomNumber = numbers[Math.floor(Math.random()*numbers.length)];
      ansArr.push(randomNumber);
      if (!data.repeat) {
        var randomIndex = numbers.indexOf(randomNumber);
        numbers.splice(randomIndex, 1);
      }
    };
    var ans = ansArr.join("");
    console.log(ans);
    $localstorage.set('ansArr', JSON.stringify(ansArr));
  }

  Answer.check = function(attempt) {
    var ansArr = JSON.parse($localstorage.get('ansArr'));
    if (ansArr == attempt) {
      return "You win!";
    } else {
      return provideFeedback(ansArr, attempt);
    }
  }
  
  var provideFeedback = function(answer, attempt) {
    var letters = "";

    for (var i = 0; i < attempt.length; i++) {
      letters += determineLetter(attempt[i], answer, i);
    };

    return countLetters(letters);
  }

  var determineLetter = function(letter, answer, letterIndex) {
    var foundIndex = answer.indexOf(letter)

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













