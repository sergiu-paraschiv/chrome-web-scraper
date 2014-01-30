(function(undefined) {
    'use strict';
    
    var Task = this.Models.Task;
   
    this.Main.controller('TaskCtrl', [
        '$scope',
        '$routeParams',
        'TasksService',
        
        function ($scope, $routeParams, tasksService) {
            if($routeParams.taskId !== undefined) {
                $scope.task = tasksService.find($routeParams.taskId);
            }
            else {
                $scope.task = new Task();
            }
            
            $scope.save = function() {
                tasksService.put($scope.task);
            };
            
            $scope.remove = function() {
                tasksService.remove($scope.task.id);
            };
        }
    ]);
        
}).call(this.WebScraper);
