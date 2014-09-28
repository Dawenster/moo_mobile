var app = angular.module('starter.services', []);

/**
 * A simple example service that returns some data.
 */
app.factory('Answer', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  // var answer = Math.floor(Math.random()*9000) + 1000;
  var answer = 1234;
  
  return answer;
});
