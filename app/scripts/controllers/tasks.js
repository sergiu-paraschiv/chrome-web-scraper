(function(undefined) {
    'use strict';
   
    this.Main.controller('TasksCtrl', [
        '$scope',
        'EntitiesService',
        'URLLoaderService',
        
        function ($scope, entitiesService, urlLoaderService) {
            $scope.tasks = entitiesService.query('Task');
            
            $scope.clearCache = function() {
                urlLoaderService.clearCache();
            };
        }
    ]);
        
}).call(this.WebScraper);
