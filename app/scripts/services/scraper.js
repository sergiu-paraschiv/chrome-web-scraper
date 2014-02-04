(function($, windows, tabs, undefined) {
    'use strict';
    
    var C = this.Constants;
    
    var Task = this.Models.Task;

    this.Main.factory('ScraperService', [
        'EntitiesService',
        'BrowserService',
        
        function (entitiesService, browserService) {
        
            function ensureDOM(task, callback) {
                browserService.loadURL(task.url, function(htmlString) {
                    var doc = (new DOMParser()).parseFromString(htmlString, 'text/html');

                    callback.call(undefined, doc);
                });
            }
            
            function runSelectors(parent, dom, queue, task) {
                var data = {};

                for(var selectorId in parent.selectors) {
                    var selector = entitiesService.find(parent.selectors[selectorId]);
                    var selectorData = runSelector(selector, dom, queue, task);
                    
                    if(selector.type === C.SELECTOR.ELEMENT.value) {
                        data[selector.name] = runSelectors(selector, selectorData, queue, task);
                    }
                    else {
                        data[selector.name] = selectorData;
                    }
                }

                return data;
            }
            
            function runSelector(selector, dom, queue, task) {
                var data = [];
                
                var results = $(selector.query, dom);

                results.each(function(resultId, result) {
                    var selectorData = parseResult(selector, result, queue, task);
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
                    
            function parseResult(selector, result, queue, task) {
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
                    
                    queue.addSubtask(subTask);
                    
                    return subTask.url;
                }
                else if(selector.type === C.SELECTOR.ELEMENT.value) {
                    return result;
                }

                return undefined;
            }
          
            function run(task, queue, callback) {
                ensureDOM(task, function(dom) {
                    var data = runSelectors(task, dom, queue, task);

                    callback.call(undefined, data);
                });
            }
            
            return {
                run: run
            };
        }
    ]);
        
}).call(this.WebScraper, this.jQuery, chrome.windows, chrome.tabs);