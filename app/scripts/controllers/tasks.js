(function(undefined) {
    'use strict';
   
    this.Main.controller('TasksCtrl', [
        '$scope',
        'EntitiesService',
        'DataService',
        'URLLoaderService',
        
        function ($scope, entitiesService, dataService, urlLoaderService) {
            $scope.tasks = entitiesService.query('Task');
            
            $scope.clearCache = function() {
                urlLoaderService.clearCache();
                dataService.removeAll();
            };
        }
    ]);
        
}).call(this.WebScraper);
