(function($, undefined) {
    'use strict';
    
    var Task = this.Models.Task;
   
    this.Main.controller('TaskCtrl', [
        '$scope',
        '$routeParams',
        'EntitiesService',
        'DataService',
        'ScraperQueueService',
        
        function ($scope, $routeParams, entitiesService, dataService, scraperQueueService) {
            if($routeParams.taskId !== undefined) {
                $scope.task = entitiesService.find($routeParams.taskId);
            }
            else {
                $scope.task = new Task();
            }
            
            function removeSelectors(parent) {
                if(parent.selectors !== undefined) {
                    for(var selector in parent.selectors) {
                        removeSelectors(selector);
                        
                        entitiesService.remove(selector.id);
                    }
                }
            }
            
            $scope.add = function() {
                entitiesService.put($scope.task, 'Task');
            };
            
            $scope.remove = function() {
                removeSelectors($scope.task);
               
                entitiesService.remove($scope.task.id);
            };
            
            $scope.run = function() {
                scraperQueueService.run($scope.task, function() {
                    console.log(dataService.makeTree($scope.task));
                });
            };
        }
    ]);
        
}).call(this.WebScraper, jQuery);
