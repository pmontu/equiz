angular.module('quizApp')
.controller('gameOverCtrl', ['$scope', '$http', '$location', '$modalInstance', 'score', function($scope, $http, $location, $modalInstance, score) {
	$scope.score = score;
	$scope.close = function()
	{
		$modalInstance.close();
		$location.path("/profile");
	}
}]);