(function(ng, undefined) {
    'use strict';
   
    var module = ng.module('WebScraper', [
        'ngRoute',
        'ngStorage'
    ]);
    
    module.config([
        '$routeProvider',
        '$compileProvider',
        
        function($routeProvider, $compileProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'app/views/tasks.html',
                    controller: 'TasksCtrl'
                })
                .when('/task/:taskId?', {
                    templateUrl: 'app/views/task.html',
                    controller: 'TaskCtrl'
                })
                .when('/selectors/:parentId', {
                    templateUrl: 'app/views/selectors.html',
                    controller: 'SelectorsCtrl'
                })
                .when('/selector/:selectorId', {
                    templateUrl: 'app/views/selector.html',
                    controller: 'SelectorCtrl'
                })
                .when('/selectors/:parentId/selector', {
                    templateUrl: 'app/views/selector.html',
                    controller: 'SelectorCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
                
            $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
        }
    ]);
    
    module.run(function($rootScope, $location, $localStorage) {
        var $storage = $localStorage.$default({
            URI: '/'
        });
        
        $location.path($storage.URI);

        $rootScope.$on('$routeChangeSuccess', function() {
            $storage.URI = $location.path();
        });
    });
    
    this.exports(this, {
        Main: module
    });
    
}).call(this.WebScraper, this.angular);