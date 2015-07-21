/// <reference path="../../dtypes/angularjs/angular.d.ts" />

(function() {
	var myApp = angular.module('ConfigClientApp', ['ngRoute']);
	
	myApp.controller('GetCtrl', ['$http', '$log',
		function($http: angular.IHttpService, $log: angular.ILogService) {
			
			// List of current components
			this.components = [];
			
			// Update this.components
			this.updateComponents = () => {
				$http.get("/components")
				.success(data => {
					$log.info("Got data", data);
					this.components = data;
				})
				.error(err => {
					$log.error("Got error", err);
					this.components = [];
				});
			};
			
			// Initialize components
			this.updateComponents(); 
		} 
	]);
})();