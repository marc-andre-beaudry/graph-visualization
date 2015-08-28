'use strict';

var App = angular.module('GraphVisualizationApp', [ 'ngRoute' ]);

// Declare app level module which depends on filters, and services
App.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/home', {
		templateUrl : 'views/home/home.html',
		controller : 'homeController'
	});
	$routeProvider.otherwise({
		redirectTo : '/home'
	});
} ]);
