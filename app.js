angular.module('Uniway', ['ngRoute','ngAnimate'])

.config(['$routeProvider','$locationProvider',function ($routeProvider, $locationProvider) {
	$routeProvider
	
	.when('/home',{
		templateUrl: 'client/partials/signIn.html'
	})
	.when('/signUp', {
		templateUrl: 'client/partials/signUp.html',		
	})
	.when('/me', {
		templateUrl: 'client/partials/welcome.html',		
	})
	.otherwise({ redirectTo: '/home' })
}])

.controller('signInCtrl', ['$scope', function ($scope,$sce) {
	var imagesRoutes = "client/libs/img/";
	$scope.logo = imagesRoutes + "Uniway.png";
}])

.controller('scrollCtrl', ['$scope', function ($scope) {	
	var imagesRoutes = "client/libs/img/";
	$scope.logo = imagesRoutes + "Uniway.png";
	$scope.active = "1";
	$scope.isActive = function (id) {		
		return $scope.active === id;
	}

	$scope.asignActive = function (id) {
		$scope.active = id;
	}
}])
.controller('BackGroundCtrl', ['$scope', function ($scope) {
	$scope.myBack = "client/libs/img/back.PNG";
}])
;
