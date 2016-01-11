'use strict';

angular.module('quizApp')
  .controller('profileCtrl', ['$scope', '$location', '$cookieStore', 'growl', '$http', 'BaseUrl', function ($scope, $location, $cookieStore, growl, $http, BaseUrl) {
  	
    var monthName = 
    [
      "JAN", "FEB", "MAR",
      "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP",
      "OCT", "NOV", "DEC"
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
        console.log("$scope.user", $scope.user);
        $http.get(BaseUrl + "quiz?type=live").then(function(data){
          var liveData = data.data;
          for(var i=0; i < liveData.length; i++)
          {
            if(liveData[i].started_at)
            {
              liveData[i].started_at = ("0" + new Date(liveData[i].started_at).getDate()).slice(-2) + " " + monthName[new Date(liveData[i].started_at).getMonth()] + " " + new Date(liveData[i].started_at).getFullYear();
            }
          }
          $scope.liveData = liveData;
        })
    	}
  	};

  	init();

  	$scope.takeQuiz = function(id)
  	{
  		$location.path("/quiz/" + id);
  	};

    $scope.upcoming = function()
    {
      $http.get(BaseUrl + "quiz?type=upcoming").then(function(data){
        $scope.upcomingData = data.data;
      })
    }

    $scope.signout = function()
    {
      $cookieStore.remove("user");
      $location.path('/#/')
    };

    $scope.remind = function() {
      growl.success("Thank you we will send u mail before the test starts");
    };

    $scope.menu1 = true;
    $scope.set = function(menu)
    {
      $scope[menu] = true;
    }
}]);
