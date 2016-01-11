'use strict';
angular.module('quizApp')
  .controller('mainCtrl', ['$scope', '$location', '$http', '$cookieStore', 'userService', '$timeout', 'BaseUrl', function ($scope, $location, $http, $cookieStore, userService, $timeout, BaseUrl) {
    var i;
    $scope.joinQuiz = function() {
        $http.get(BaseUrl + 'user/' + $scope.email)
        .then(function(data) {
            console.log("data", data.data);
            var userDtls = data.data;
            userDtls.user = userDtls.email.split(/[@.]+/)[0];
            $cookieStore.put('user', userDtls);
            $location.path("/profile");
        })
    };
  }]);
