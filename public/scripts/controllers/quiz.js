'use strict';

angular.module('quizApp')
  .controller('quizCtrl', ['$scope', '$location', '$cookieStore', '$http', '$timeout', '$modal', 'growl', 'BaseUrl', function ($scope, $location, $cookieStore, $http, $timeout, $modal, growl, BaseUrl) {
    var qns, counter, i;
    $scope.participants = [
      {
        "name" : "nikhil",
        "points" : 1800
      },
      {
        "name" : "makranth",
        "points" : 1810
      },
      {
        "name" : "saumen",
        "points" : 1790
      },
      {
        "name" : "debasish",
        "points" : 1804
      }
    ];


    function init()
  	{
      if($cookieStore.get('user') === undefined)
    	{
        	$location.path('/#/')
    	}
      else
      {
        $scope.user = $cookieStore.get('user');
        var quizId = $location.url().split("/quiz/")[1];
        $http.get(BaseUrl + "quiz/" + quizId).then(function(questions) {
          $scope.questions = questions.data;
          console.log("questions", questions.data);
          qns = $scope.questions.length;
          $scope.index = 0;
        })
        $scope.counter = 20;
        $scope.score = 0
        countdown();
        // if($scope.participants[($scope.user.id) - 2] == undefined)
        // {
        //   $scope.participants.push({"name" : $scope.user.name, "points" : 0});
        // }
        // $http.get("/scripts/json/questions.json").then(function(questions) {
        //   $scope.questions = questions.data;
        //   qns = $scope.questions.length;
        //   $scope.index = 0;
        // });
        // $scope.counter = 20;
        // $scope.score = 0
        // countdown();
      }  
  		
  	};

  	var countdown = function() {
	    if($scope.counter > 0)
	    {
	    	var stopped = $timeout(function() {
		     	$scope.counter--;   
		    	countdown();   
		    }, 1000);
	    }
	    else
	    {
	    	if(qns === $scope.index)
	  		{
          gameOver();
	  		}
	  		else
	  		{
          updateusers();
          $scope.index++;
		    	$scope.counter = 20;
	    		countdown();
		    }
		}    
  	};

  	init();


    $scope.signout = function()
    {
      $cookieStore.remove("user");
      $location.path('/#/')
    };

  	$scope.next = function(undefined, option, answer)
  	{
      if(option == answer)
  		{
  			$scope.score+=Math.ceil($scope.counter/2);
        $scope.participants[($scope.user.id)-2].points+=Math.ceil($scope.counter/2);
        growl.success("yeah! your answer is right");
  		}
      else
      {
        growl.error("Oh! Your answer is wrong!");
      } 
      updateusers(); 
      $scope.index++;
      if(qns == $scope.index)
      {
        gameOver();
      }
      else
      {
        $scope.counter = 20;
      }  
  	};

    function updateusers()
    {
      for(i=0;i<$scope.participants.length; i++)
      {
        if(i != $scope.user.id - 2)
        {
          var random  = Math.floor(Math.random() * 10);
          $scope.participants[i].points += random;
        }
      }
    };

    function gameOver() {
      var obj = {
        "score" : $scope.score,
        "total" : $scope.participants[($scope.user.id)-2].points
      };
      var modalInstance = $modal.open({
        templateUrl: 'views/gameOver.html',
        controller: 'gameOverCtrl',
        backdrop: 'static',
        resolve: {
          score: function() {
            return obj;
          }
        }
      });
    };
}]);

    // $scope.joinQuiz = function(userData) {
    // 	$scope.user.push(userData);
    // 	$location.path("/quiz");
    // };

 //    setInterval(function() {
 //    	var myDate = new Date();
 //    	$date = "May 06 2015 13:50:40";
 //    	var reg = new RegExp('\(' + $date.replace(/\s/g, "\\s") + '\)', 'g');
 //    	if(myDate.toString().match($date) ) {
 //        	do_something();
 //    	}
	// }, 1000);
//   .directive('countdown', ['Util', '$interval', function(Util, $interval) {
//     return {
//       restrict: 'A',
//       scope: {
//         date: '@'
//       },
//       link: function(scope, element) {
//         var future;
//         console.log(scope.date);
//         future = new Date(scope.date);
//         $interval(function() {
//           var diff;
//           diff = Math.floor((future.getTime() - new Date().getTime()) / 1000);
//           return element.text(Util.dhms(diff));
//         }, 1000);
//       }
//     };
//   }
// ])
// .factory('Util', [
//   function() {
//     return {
//       dhms: function(t) {
//         var days, hours, minutes, seconds;
//         days = Math.floor(t / 86400);
//         t -= days * 86400;
//         hours = Math.floor(t / 3600) % 24;
//         t -= hours * 3600;
//         minutes = Math.floor(t / 60) % 60;
//         t -= minutes * 60;
//         seconds = t % 60;
//         return [hours + 'h', minutes + 'm', seconds + 's'].join(' ');
//       }
//     };
//   }
// ]);