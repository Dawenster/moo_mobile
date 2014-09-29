var app = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
app.factory("Answer", function() {
  var Answer = {};
  var ans = Math.floor(Math.random()*9000) + 1000;

  // Might use a resource here that returns a JSON array

  Answer.check = function(attempt) {
    console.log(ans);
    if (ans == attempt) {
      return "You win!";
    } else {
      return provideFeedback(ans, attempt);
    }
  }
  
  var provideFeedback = function(answer, attempt) {
    var letters = "";

    splitAnswers = answer.toString().split("");
    splitAttempt = attempt.split("");

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


















