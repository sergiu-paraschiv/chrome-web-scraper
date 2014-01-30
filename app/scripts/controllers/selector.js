(function(undefined) {
    'use strict';
    
    var Selector = this.Models.Selector;
   
    this.Main.controller('SelectorCtrl', [
        '$scope',
        '$routeParams',
        'TasksService',
        
        function ($scope, $routeParams, tasksService) {
            $scope.task = tasksService.find($routeParams.taskId);
            
            $scope.adding = true;
            
            if($routeParams.selectorId !== undefined) {
                $scope.selector = $scope.task.selectors[$routeParams.selectorId];
                $scope.adding = false;
            }
            else {
                $scope.selector = new Selector();
            }
            
            $scope.save = function() {
                $scope.task.selectors.push($scope.selector);
            };
        }
    ]);
        
}).call(this.WebScraper);
