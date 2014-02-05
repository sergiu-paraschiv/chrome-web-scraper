(function(windows, tabs, runtime, undefined) {
    'use strict';
    
    var C = this.Constants;

    this.Main.factory('URLLoaderService', [
        '$localStorage',
        
        function ($localStorage) {
        
            var $storage = $localStorage.$default({
                windowID: undefined,
                cache: []
            });
            
            var tabPool = [];
            var openedTabs = 0;
            
            function isLoading() {
                return openedTabs > 0;
            }

            function hasAvailableTab() {
                return openedTabs < C.BROWSER.MAX_CONCURRENT_LOADS;
            }
            
            function ensureCache() {
                if($storage.cache === undefined) {
                    $storage.cache = [];
                }
            }
            
            function clearCache() {
                ensureCache();
                $storage.cache = [];
            }

            function listenOnWindows() {
                windows.onRemoved.addListener(function (windowID) {
                    if(windowID === $storage.windowID) {
                        $storage.windowID = undefined;
                    }
                });
            }
            
            function removeTab(tabId) {
                for(var i in tabPool) {
                    if(tabPool[i].tabId === tabId && tabPool[i].url !== null) {
                        tabs.remove(tabId);
                        tabPool.splice(i, 1);
                        openedTabs -= 1;
                    }
                }
            }
            
            function listenOnTabs() {
                tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
                
                    if(changeInfo.status === 'complete') {
                    
                        for(var i in tabPool) {

                            if(tabPool[i].tabId === tabId && tabPool[i].url !== null) {
                                (function(tabPoolTab) {
                                    
                                    getTabHTML(
                                        tabPoolTab.tabId,
                                        function(htmlString) {
                                            var tabPoolTabCallback = tabPoolTab.callback;
                                            
                                            $storage.cache.push({
                                                url: tabPoolTab.url,
                                                htmlString: htmlString
                                            });
                                            
                                            removeTab(tabPoolTab.tabId);
                                            
                                            if(tabPoolTabCallback) {
                                                tabPoolTabCallback.call(undefined, htmlString);
                                            }
                                        },
                                        function(error) {
                                            removeTab(tabPoolTab.tabId);
                                        }
                                    );
                                }).call(undefined, tabPool[i]);
                            }
                        }
                    }
                });
            }
            
            function getTabHTML(tabId, callback, errorCallback) {
                setTimeout(function() {
                    tabs.sendMessage(
                        tabId,
                        
                        {
                            action: 'getDOM'
                        },
                        
                        function(response) {
                            if(response) {
                                callback.call(undefined, response.dom);
                            } else {
                                errorCallback.call(undefined, runtime.lastError);
                            }
                        }
                    );
                }, 300);
            }
            
            function getHTMLFromCache(url) {
                for(var i in $storage.cache) {
                    if($storage.cache[i].url === url) {
                        return $storage.cache[i].htmlString;
                    }
                }
                
                return undefined;
            }
            
            function createWindow(callback) {
                windows.create(
                    {
                        type: 'normal',
                        url: C.BROWSER.BLANK_PAGE,
                        focused: false,
                        // incognito: true,
                        height: 600,
                        width: 600
                    }, 
                    
                    function(w) {
                        $storage.windowID = w.id;
                        callback(w);
                    }
                );
            }
            
            function getWindow(callback) {
                windows.get(
                    $storage.windowID,
                    
                    {
                        populate: true
                    },
                    
                    function(w) {
                        if(w !== undefined) {
                            callback(w);
                        }
                        else {
                            createWindow(callback);
                        }
                    }
                );
            }
            
            function ensureWindow(callback) {
                if($storage.windowID === undefined) {
                    createWindow(callback);
                }
                else {
                    getWindow(callback);
                }
            }
            
            function ensureTab(w, callback) {
                tabs.create(
                    {
                        windowId: w.id,
                        url: C.BROWSER.BLANK_PAGE
                    },
                    function(tab) {
                        callback.call(undefined, tab);
                    }
                );
            }
            
            function updateTab(tabId, url) {
                tabs.update(
                    tabId,
                    {
                        url: url
                    }
                );
            }
            
            function loadURL(url, callback) {
                var dom = getHTMLFromCache(url);
                
                if(dom !== undefined) {
                    callback.call(undefined, dom);
                }
                else {
                    openedTabs += 1;
                    ensureWindow(function(w) {
                        ensureTab(w, function(tab) {
                            tabPool.push({
                                tabId: tab.id,
                                url: url,
                                callback: callback
                            });
                            updateTab(tab.id, url);
                        });
                    });
                }
            }
            
            function init() {
                ensureCache();
                listenOnWindows();
                listenOnTabs();
            }
            
            init();

            return {
                loadURL: loadURL,
                clearCache: clearCache,
                hasAvailableTab: hasAvailableTab,
                isLoading: isLoading
            };
        }
    ]);
        
}).call(this.WebScraper, chrome.windows, chrome.tabs, chrome.runtime);