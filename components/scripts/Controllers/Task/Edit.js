(function(undefined) {
    'use strict';
    
    var Models = this.Models;
    var replaceObject = this.Tools.Object.replace;
    
    this.Task.controller('Edit', [
        '$scope',
        '$stateParams',
        'Tasks',
        
        function($scope, $stateParams, $tasks) {
            var taskId = parseInt($stateParams.id);
            var task = new Models.Task();
            
            $tasks.ready(function(db) {

                db.find(taskId, function(result) {
                    replaceObject(task, result);
                    $scope.$apply();
                });
                
                function save() {
                    // db.add(task, function() {
                        // console.log(task);
                    // });
                }

                $scope.save = save;
            });
            
            $scope.task = task;
        }
    ]);
        
}).call(this.scrap);
