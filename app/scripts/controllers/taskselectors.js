(function(undefined) {
    'use strict';
    
    var Task = this.Models.Task;
   
    this.Main.controller('TaskSelectorsCtrl', [
        '$scope',
        '$routeParams',
        'TasksService',
        
        function ($scope, $routeParams, tasksService) {
            $scope.task = tasksService.find($routeParams.taskId);
            
            $scope.removeSelector = function(index) {
                $scope.task.selectors.splice(index, 1);
            };
        }
    ]);
        
}).call(this.WebScraper);
