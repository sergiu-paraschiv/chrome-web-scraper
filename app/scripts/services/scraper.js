(function(windows, tabs, undefined) {
    'use strict';
    
    var C = this.Constants;

    this.Main.factory('ScraperService', [
        'EntitiesService',
        'BrowserService',
        
        function (entitiesService, browserService) {
          
            function run(task, callback) {
                var data = {};
                
                browserService.loadURL(task.url, function(htmlString) {
                    var doc = (new DOMParser()).parseFromString(htmlString, 'text/html');
                    
                    for(var i in task.selectors) {
                        var selector = entitiesService.find(task.selectors[i]);
                        data[selector.name] = [];
                        
                        var results = $(doc).xpath(selector.xpath);
                        for(var j in results) {
                            data[selector.name].push(results[j].innerText);
                        }
                    }
                    
                    callback.call(undefined, data);
                });
            }
            
            return {
                run: run
            };
        }
    ]);
        
}).call(this.WebScraper, chrome.windows, chrome.tabs);