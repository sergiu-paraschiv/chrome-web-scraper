(function(undefined) {
    'use strict';
    
    var Models = this.Models;
    
    this.Task.controller('Add', [
        '$scope',
        '$state',
        'Tasks',
        
        function($scope, $state, $tasks) {
            $tasks.ready(function(db) {
                var task = new Models.Task();
                
                function save() {
                    db.add(task, function() {
                        $state.go('base.edit', {id: task.id});
                    });
                }

                $scope.task = task;
                $scope.save = save;
            });
            
            
        }
    ]);
        
}).call(this.scrap);
