(function(undefined) {
    'use strict';
   
    this.Main.controller('TasksCtrl', [
        '$scope',
        'TasksService',
        
        function ($scope, tasksService) {
            $scope.tasks = tasksService.all();
        }
    ]);
        
}).call(this.WebScraper);
