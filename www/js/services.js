var app = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
app.factory('Answer', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // var answer = Math.floor(Math.random()*9000) + 1000;
  var answer = 1234;

  var Answer = {};

  Answer.check = function(attempt) {
    if (answer == attempt) {
      return "Congrats!";
    } else {
      return provideFeedback(answer, attempt);
    }
  }
  
  var provideFeedback = function(answer, attempt) {
    var feedback = "";

    splitAnswers = answer.toString().split("");
    splitAttempt = attempt.split("");

    for (var i = 0; i < splitAttempt.length; i++) {
      feedback += determineLetter(splitAttempt[i], splitAnswers, i);
    };

    return feedback;
  }

  var determineLetter = function(letter, splitAnswers, letterIndex) {
    var foundIndex = splitAnswers.indexOf(letter)

    if (foundIndex > -1) {
      if (foundIndex == letterIndex) {
        return "A";
      } else {
        return "B";
      }
    } else {
      return "";
    }
  }

  return Answer
});