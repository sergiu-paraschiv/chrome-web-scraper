(function($, undefined) {
    'use strict';
    
    var Task = this.Models.Task;
   
    this.Main.controller('TaskCtrl', [
        '$scope',
        '$routeParams',
        'TasksService',
        'BrowserService',
        
        function ($scope, $routeParams, tasksService, browserService) {
            if($routeParams.taskId !== undefined) {
                $scope.task = tasksService.find($routeParams.taskId);
            }
            else {
                $scope.task = new Task();
            }
            
            $scope.add = function() {
                tasksService.put($scope.task);
            };
            
            $scope.remove = function() {
                tasksService.remove($scope.task.id);
            };
            
            $scope.run = function() {
                browserService.loadURL($scope.task.url, function(htmlString) {
                    var doc = (new DOMParser()).parseFromString(htmlString, 'text/html');
                    var links = $(doc).xpath('//a/@href');
                    console.log(links);
                });
            };
        }
    ]);
        
}).call(this.WebScraper, jQuery);
