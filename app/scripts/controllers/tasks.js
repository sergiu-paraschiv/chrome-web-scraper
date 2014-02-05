(function(undefined) {
    'use strict';
   
    this.Main.controller('TasksCtrl', [
        '$scope',
        'EntitiesService',
        
        function ($scope, entitiesService, dataService) {
            $scope.tasks = entitiesService.query('Task');
        }
    ]);
        
}).call(this.WebScraper);
