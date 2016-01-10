'use strict';

angular.module('quizApp')
  .controller('profileCtrl', ['$scope', '$location', '$cookieStore', 'growl', '$http', 'BaseUrl', function ($scope, $location, $cookieStore, growl, $http, BaseUrl) {
  	function init()
  	{
  		if($cookieStore.get('user') === undefined)
    	{
        	$location.path('/#/')
    	}
    	else
    	{
	  		//$scope.user = $cookieStore.get('user');
        $http.get(BaseUrl + "quiz/").then(function(data){
          console.log("data", data);
        })
    	}
  	};

  	init();

  	$scope.takeQuiz = function(id)
  	{
  		$location.path("/quiz/" + '569205ea5fe406c7639ffbf7');
  	};

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
