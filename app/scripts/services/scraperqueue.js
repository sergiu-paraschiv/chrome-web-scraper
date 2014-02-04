(function($, windows, tabs, undefined) {
    'use strict';
    /*jshint validthis: true */
    
    var C = this.Constants;

    this.Main.factory('ScraperQueueService', [
        'ScraperService',
        'DataService',
        
        function (scraperService, dataService) {
            var queue = [];
            
            function addSubtask(task) {
                queue.push(task);
            }
            
            function runSubtask(subtask, callback) {
                var self = this;

                scraperService.run(subtask, self, function(data) {
                    dataService.put(subtask.url + '-' + subtask.name, data);
                    
                    if(queue.length > 0) {
                        runSubtask.call(self, queue.shift(), callback);
                    }
                    else {
                        callback.call(undefined);
                    }
                });
            }
        
            function run(task, callback) {
                var self = this;
                
                scraperService.run(task, self, function(data) {
                    dataService.put(task.id, data);
                    
                    if(queue.length > 0) {
                        runSubtask.call(self, queue.shift(), callback);
                    }
                    else {
                        callback.call(undefined);
                    }
                });
            }
            
            return {
                run: run,
                addSubtask: addSubtask
            };
        }
    ]);
        
}).call(this.WebScraper, this.jQuery, chrome.windows, chrome.tabs);