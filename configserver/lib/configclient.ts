/// <reference path="../dtypes/angularjs/angular.d.ts" />

(function() {
	var myApp = angular.module('ConfigClient', ['ngRoute']);
	
	myApp.controller('GetCtrl', ['$http', '$log',
		function($http: angular.IHttpBackendService, 
			$log: angular.ILogService) {
				
			$log.info('GetCtrl initialized.');
		} 
	]);
})();