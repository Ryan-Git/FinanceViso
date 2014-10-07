'use strict';

/**
 * @ngdoc overview
 * @name financeVisoApp
 * @description
 * # financeVisoApp
 *
 * Main module of the application.
 */
angular
  .module('financeVisoApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
