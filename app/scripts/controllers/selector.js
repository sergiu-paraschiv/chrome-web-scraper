(function(undefined) {
    'use strict';
    
    var C = this.Constants;
    
    var Selector = this.Models.Selector;
   
    this.Main.controller('SelectorCtrl', [
        '$scope',
        '$routeParams',
        'TasksService',
        
        function ($scope, $routeParams, tasksService) {
            $scope.task = tasksService.find($routeParams.taskId);
            
            $scope.adding = true;
            
            $scope.types = [];
            
            for(var key in C.SELECTOR) {
                $scope.types.push(C.SELECTOR[key]);
            }
            
            console.log($scope.types);
            
            if($routeParams.selectorId !== undefined) {
                $scope.selector = $scope.task.selectors[$routeParams.selectorId];
                $scope.adding = false;
            }
            else {
                $scope.selector = new Selector();
            }
            
            $scope.add = function() {
                $scope.task.selectors.push($scope.selector);
            };
        }
    ]);
        
}).call(this.WebScraper);
