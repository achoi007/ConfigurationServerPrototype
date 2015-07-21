/// <reference path="../../dtypes/angularjs/angular.d.ts" />
(function () {
    var myApp = angular.module('ConfigClientApp', ['ngRoute']);
    myApp.controller('GetCtrl', ['$http', '$log',
        function ($http, $log) {
            var _this = this;
            // List of current components
            this.components = [];
            // Update this.components
            this.updateComponents = function () {
                $http.get("/components")
                    .success(function (data) {
                    $log.info("Got data", data);
                    _this.components = data;
                })
                    .error(function (err) {
                    $log.error("Got error", err);
                    _this.components = [];
                });
            };
            // Initialize components
            this.updateComponents();
        }
    ]);
})();
