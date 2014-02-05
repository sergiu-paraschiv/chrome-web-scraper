(function($, windows, tabs, undefined) {
    'use strict';
    /*jshint validthis: true */
    
    var C = this.Constants;

    this.Main.factory('ScraperQueueService', [
        'ScraperService',
        'DataService',
        
        function (scraperService, dataService) {
            var queue = [];
            var storedCallback;
            var runningTasks;
            
            function addSubtask(task) {
                var self = this;
                
                queue.push(task);
                
                if(scraperService.calParallelLoad()) {
                    runFirstTask.call(self);
                }
            }
            
            function runSubtask(subtask) {
                var self = this;

                runningTasks += 1;
                scraperService.run(subtask, self, function(data) {
                    dataService.put(subtask.url + '-' + subtask.name, data);
                    
                    handleIsDone.call(self);
                });
            }
        
            function run(task, callback) {
                var self = this;
                
                storedCallback = callback;
                runningTasks = 1;
                
                scraperService.run(task, self, function(data) {
                    dataService.put(task.id, data);
                    
                    handleIsDone.call(self);
                });
            }
            
            function runFirstTask() {
                var self = this;
                
                runSubtask.call(self, queue.shift());
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
                        runSubtask.call(self, queue.shift());
                    }
                }, 100);
                
                runningTasks -= 1;
            }
            
            return {
                run: run,
                addSubtask: addSubtask
            };
        }
    ]);
        
}).call(this.WebScraper, this.jQuery, chrome.windows, chrome.tabs);