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
    if (ansArr.equals(attempt)) {
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

// Angular Timer plugin
var timerModule=app.directive("timer",["$compile",function(a){return{restrict:"EAC",replace:!1,scope:{interval:"=interval",startTimeAttr:"=startTime",endTimeAttr:"=endTime",countdownattr:"=countdown",finishCallback:"&finishCallback",autoStart:"&autoStart",maxTimeUnit:"="},controller:["$scope","$element","$attrs","$timeout",function(b,c,d,e){function f(){b.timeoutId&&clearTimeout(b.timeoutId)}function g(){b.maxTimeUnit&&"day"!==b.maxTimeUnit?"second"===b.maxTimeUnit?(b.seconds=Math.floor(b.millis/1e3),b.minutes=0,b.hours=0,b.days=0,b.months=0,b.years=0):"minute"===b.maxTimeUnit?(b.seconds=Math.floor(b.millis/1e3%60),b.minutes=Math.floor(b.millis/6e4),b.hours=0,b.days=0,b.months=0,b.years=0):"hour"===b.maxTimeUnit?(b.seconds=Math.floor(b.millis/1e3%60),b.minutes=Math.floor(b.millis/6e4%60),b.hours=Math.floor(b.millis/36e5),b.days=0,b.months=0,b.years=0):"month"===b.maxTimeUnit?(b.seconds=Math.floor(b.millis/1e3%60),b.minutes=Math.floor(b.millis/6e4%60),b.hours=Math.floor(b.millis/36e5%24),b.days=Math.floor(b.millis/36e5/24%30),b.months=Math.floor(b.millis/36e5/24/30),b.years=0):"year"===b.maxTimeUnit&&(b.seconds=Math.floor(b.millis/1e3%60),b.minutes=Math.floor(b.millis/6e4%60),b.hours=Math.floor(b.millis/36e5%24),b.days=Math.floor(b.millis/36e5/24%30),b.months=Math.floor(b.millis/36e5/24/30%12),b.years=Math.floor(b.millis/36e5/24/365)):(b.seconds=Math.floor(b.millis/1e3%60),b.minutes=Math.floor(b.millis/6e4%60),b.hours=Math.floor(b.millis/36e5%24),b.days=Math.floor(b.millis/36e5/24),b.months=0,b.years=0),b.secondsS=1==b.seconds?"":"s",b.minutesS=1==b.minutes?"":"s",b.hoursS=1==b.hours?"":"s",b.daysS=1==b.days?"":"s",b.monthsS=1==b.months?"":"s",b.yearsS=1==b.years?"":"s",b.sseconds=b.seconds<10?"0"+b.seconds:b.seconds,b.mminutes=b.minutes<10?"0"+b.minutes:b.minutes,b.hhours=b.hours<10?"0"+b.hours:b.hours,b.ddays=b.days<10?"0"+b.days:b.days,b.mmonths=b.months<10?"0"+b.months:b.months,b.yyears=b.years<10?"0"+b.years:b.years}"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}),b.autoStart=d.autoStart||d.autostart,c.append(0===c.html().trim().length?a("<span>{{millis}}</span>")(b):a(c.contents())(b)),b.startTime=null,b.endTime=null,b.timeoutId=null,b.countdown=b.countdownattr&&parseInt(b.countdownattr,10)>=0?parseInt(b.countdownattr,10):void 0,b.isRunning=!1,b.$on("timer-start",function(){b.start()}),b.$on("timer-resume",function(){b.resume()}),b.$on("timer-stop",function(){b.stop()}),b.$on("timer-clear",function(){b.clear()}),b.$on("timer-set-countdown",function(a,c){b.countdown=c}),b.start=c[0].start=function(){b.startTime=b.startTimeAttr?new Date(b.startTimeAttr):new Date,b.endTime=b.endTimeAttr?new Date(b.endTimeAttr):null,b.countdown||(b.countdown=b.countdownattr&&parseInt(b.countdownattr,10)>0?parseInt(b.countdownattr,10):void 0),f(),h(),b.isRunning=!0},b.resume=c[0].resume=function(){f(),b.countdownattr&&(b.countdown+=1),b.startTime=new Date-(b.stoppedTime-b.startTime),h(),b.isRunning=!0},b.stop=b.pause=c[0].stop=c[0].pause=function(){var a=b.timeoutId;b.clear(),b.$emit("timer-stopped",{timeoutId:a,millis:b.millis,seconds:b.seconds,minutes:b.minutes,hours:b.hours,days:b.days})},b.clear=c[0].clear=function(){b.stoppedTime=new Date,f(),b.timeoutId=null,b.isRunning=!1},c.bind("$destroy",function(){f(),b.isRunning=!1}),b.countdownattr?(b.millis=1e3*b.countdownattr,b.addCDSeconds=c[0].addCDSeconds=function(a){b.countdown+=a,b.$digest(),b.isRunning||b.start()},b.$on("timer-add-cd-seconds",function(a,c){e(function(){b.addCDSeconds(c)})}),b.$on("timer-set-countdown-seconds",function(a,c){b.isRunning||b.clear(),b.countdown=c,b.millis=1e3*c,g()})):b.millis=0,g();var h=function(){b.millis=new Date-b.startTime;var a=b.millis%1e3;return b.endTimeAttr&&(b.millis=b.endTime-new Date,a=b.interval-b.millis%1e3),b.countdownattr&&(b.millis=1e3*b.countdown),b.millis<0?(b.stop(),b.millis=0,g(),void(b.finishCallback&&b.$eval(b.finishCallback))):(g(),b.timeoutId=setTimeout(function(){h(),b.$digest()},b.interval-a),b.$emit("timer-tick",{timeoutId:b.timeoutId,millis:b.millis}),void(b.countdown>0?b.countdown--:b.countdown<=0&&(b.stop(),b.finishCallback&&b.$eval(b.finishCallback))))};(void 0===b.autoStart||b.autoStart===!0)&&b.start()}]}}]);"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports=timerModule);









