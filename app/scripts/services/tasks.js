(function(undefined) {
    'use strict';

    this.Main.factory('TasksService', [
        '$localStorage',
        
        function ($localStorage) {
            var collection = $localStorage.tasks;
            
            function ensureCollectionExists() {
                if(collection === undefined) {
                    $localStorage.tasks = {};
                    collection = $localStorage.tasks;
                }
            }
            
            function find(taskId) {
                ensureCollectionExists();
                
                return collection[taskId];
            }
            
            function all() {
                ensureCollectionExists();
                
                return collection;
            }
            
            function put(task) {
                ensureCollectionExists();
                
                if(task.id === undefined) {
                    task.id = 'task-' + (Object.keys(collection).length + 1);
                }
                
                collection[task.id] = task;
                
                return task.id;
            }
            
            function remove(taskId) {
                ensureCollectionExists();
                
                if(collection[taskId] !== undefined) {
                    delete collection[taskId];
                    
                    return true;
                }
                
                return false;
            }

            return {
                find: find,
                put: put,
                all: all,
                remove: remove
            };
        }
    ]);
        
}).call(this.WebScraper);