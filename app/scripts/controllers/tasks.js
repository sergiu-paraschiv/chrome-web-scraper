(function(undefined) {
    'use strict';
   
    this.Main.controller('TasksCtrl', [
        '$scope',
        'EntitiesService',
        
        function ($scope, entitiesService) {
            $scope.tasks = entitiesService.query('Task');
        }
    ]);
        
}).call(this.WebScraper);
