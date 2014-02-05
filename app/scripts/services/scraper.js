(function($, windows, tabs, undefined) {
    'use strict';
    
    var C = this.Constants;
    
    var Task = this.Models.Task;

    this.Main.factory('ScraperService', [
        '$rootScope',
        'EntitiesService',
        'URLLoaderService',
        
        function ($rootScope, entitiesService, urlLoaderService) {
        
            function calParallelLoad() {
                return urlLoaderService.hasAvailableTab();
            }
            
            function isLoading() {
                return urlLoaderService.isLoading();
            }
            
            function ensureDOM(task, callback) {
                urlLoaderService.loadURL(task.url, function(htmlString) {
                    var doc = (new DOMParser()).parseFromString(htmlString, 'text/html');
                    callback.call(undefined, doc);
                });
            }
            
            function runSelectors(parent, dom, task) {
                var data = {};

                for(var selectorId in parent.selectors) {
                    var selector = entitiesService.find(parent.selectors[selectorId]);
                    var selectorData = runSelector(selector, dom, task);
                    
                    if(selector.type === C.SELECTOR.ELEMENT.value) {
                        data[selector.name] = runSelectors(selector, selectorData, task);
                    }
                    else {
                        data[selector.name] = selectorData;
                    }
                }

                return data;
            }
            
            function runSelector(selector, dom, task) {
                var data = [];
                
                var results = $(selector.query, dom);

                results.each(function(resultId, result) {
                    var selectorData = parseResult(selector, result, task);
                    if(selectorData !== undefined) {
                        data.push(selectorData);
                    }
                });
                
                return data;
            }
            
            function ensureAbsoluteURL(parentUrl, url) {
                if(url.indexOf('http') === 0) {
                    return url;
                }
                else if(url.indexOf('//') === 0) {
                    return 'http:' + url;
                }
                else if(url.indexOf('/') === 0) {
                    var parser = document.createElement('a');
                    parser.href = parentUrl;

                    return parser.protocol + '//' + parser.host + url;
                }
                else {
                    return parentUrl + url;
                }
            }
                    
            function parseResult(selector, result, task) {
                if(selector.type === C.SELECTOR.TEXT.value) {
                    return $(result).text();
                }
                else if(selector.type === C.SELECTOR.ATTRIBUTE.value) {
                    return $(result).attr(selector.attribute);
                }
                else if(selector.type === C.SELECTOR.URL.value) {
                
                    var subTask = new Task();
                    subTask.url = ensureAbsoluteURL(task.url, $(result).attr(selector.attribute));
                    subTask.selectors = selector.selectors;
                    subTask.name = selector.name;
                    
                    $rootScope.$broadcast('addToScraperQueue', subTask);
                    
                    return subTask.url;
                }
                else if(selector.type === C.SELECTOR.ELEMENT.value) {
                    return result;
                }

                return undefined;
            }
          
            function run(task, callback) {
                ensureDOM(task, function(dom) {
                    var data = runSelectors(task, dom, task);
                    callback.call(undefined, data);
                });
            }
            
            function initialize(callback) {
                urlLoaderService.initialize(callback);
            }
            
            return {
                run: run,
                calParallelLoad: calParallelLoad,
                isLoading: isLoading,
                initialize: initialize
            };
        }
    ]);
        
}).call(this.WebScraper, this.jQuery, chrome.windows, chrome.tabs);