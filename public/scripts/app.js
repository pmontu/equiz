'use strict';

/**
 * @ngdoc overview
 * @name ownAppApp
 * @description
 * # ownAppApp
 *
 * Main module of the application.
 */
angular
  .module('quizApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'timer',
    'ui.bootstrap',
    'angular-growl'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'mainCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'profileCtrl'
      })
      .when('/quiz/:id', {
        templateUrl: 'views/quiz.html',
        controller: 'quizCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
  })
  .constant('BaseUrl', 'http://10.0.0.2:5000/')
  .config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(1000);
  }]);
