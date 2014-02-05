(function($, windows, tabs, undefined) {
    'use strict';
    /*jshint validthis: true */
    
    var C = this.Constants;

    this.Main.factory('ScraperQueueService', [
        '$rootScope',
        'ScraperService',
        'DataService',
        
        function ($rootScope, scraperService, dataService) {
            var queue = [];
            var storedCallback;
            var runningTasks;
            
            function addSubtask(task) {
                queue.push(task);
                
                if(scraperService.calParallelLoad()) {
                    runFirstTask();
                }
            }
            
            function runSubtask(subtask) {
                runningTasks += 1;
                scraperService.run(subtask, function(data) {
                    dataService.put(subtask.url + '-' + subtask.name, data);
                    
                    handleIsDone();
                });
            }
        
            function run(task, callback) {
                storedCallback = callback;
                runningTasks = 1;
                
                scraperService.run(task, function(data) {
                    dataService.put(task.id, data);
                    
                    handleIsDone();
                });
            }
            
            function runFirstTask() {
                runSubtask(queue.shift());
            }
            
            function handleIsDone() {
                setTimeout(function() {
                    if(queue.length === 0 && !scraperService.isLoading() && runningTasks === 0) {
                        if(storedCallback) {
                            storedCallback.call(undefined);
                            storedCallback = null;
                        }
                    }
                    else if(queue.length > 0 && scraperService.calParallelLoad()) {
                        runSubtask(queue.shift());
                    }
                }, 100);
                
                runningTasks -= 1;
            }
            
            function initialize(callback) {
                queue = [];
                dataService.removeAll();
                scraperService.initialize(callback);
            }
            
            $rootScope.$on('addToScraperQueue', function(e, task) {
                addSubtask(task);
            });
            
            return {
                run: run,
                addSubtask: addSubtask,
                initialize: initialize
            };
        }
    ]);
        
}).call(this.WebScraper, this.jQuery, chrome.windows, chrome.tabs);