(function(undefined) {
    'use strict';
   
    this.Main.controller('TasksCtrl', [
        '$scope',
        'EntitiesService',
        'BrowserService',
        
        function ($scope, entitiesService, browserService) {
            $scope.tasks = entitiesService.query('Task');
            
            $scope.clearCache = function() {
                browserService.clearCache();
            };
        }
    ]);
        
}).call(this.WebScraper);
