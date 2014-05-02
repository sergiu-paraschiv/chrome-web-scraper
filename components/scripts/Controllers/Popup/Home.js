(function(chrome, window, _, undefined) {
    'use strict';
    
    var replaceArray = this.Tools.Array.replace;
    
    this.Popup.controller('Home', [
        '$scope',
        'Tasks',
        
        function($scope, $tasks) {
            var tasks = [];
            
            function add() {
                chrome.windows.create({
                    type: 'normal',
                    url: '/main.html',
                    focused: true,
                    width: 600,
                    height: 600
                });
                
                window.close();
            }
            
            function edit(taskId) {
                chrome.windows.create({
                    type: 'normal',
                    url: '/main.html#/edit/' + taskId,
                    focused: true,
                    width: 600,
                    height: 600
                });
                
                window.close();
            }
            
            $tasks.ready(function(db) {
                db.all(function(results) {
                    replaceArray(tasks, results);
                    $scope.$apply();
                });
                
                function remove(taskId) {
                    db.remove(taskId, function() {
                        _.remove($scope.tasks, {id: taskId});
                        $scope.$apply();
                    });
                }
                
                $scope.remove = remove;
            });
            
            $scope.add = add;
            $scope.edit = edit;
            $scope.tasks = tasks;
        }
    ]);
        
}).call(this.scrap, this.chrome, this.window, this._);
