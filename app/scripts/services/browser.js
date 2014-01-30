(function(windows, tabs, undefined) {
    'use strict';
    
    var C = this.Constants;

    this.Main.factory('BrowserService', [
        '$localStorage',
        
        function ($localStorage) {
            var $storage = $localStorage.$default({
                windowID: undefined,
                tabID: undefined,
                cache: {}
            });
            
            var tabLoadedCallback;
            var currentURL;
            
            function ensureCache() {
                if($storage.cache === undefined) {
                    $storage.cache = {};
                }
            }

            function listenOnWindows() {
                windows.onRemoved.addListener(function (windowID) {
                    if(windowID === $storage.windowID) {
                        $storage.windowID = undefined;
                        $storage.tabID = undefined;
                    }
                });
            }
            
            function listenOnTabs() {
                tabs.onUpdated.addListener(function (tabID, changeInfo, tab) {                    
                    if(tabLoadedCallback !== undefined && tabID === $storage.tabID && changeInfo.status === 'complete') {
                        getTabDom(function(dom) {
                            $storage.cache[currentURL] = dom;
                            tabLoadedCallback.call(undefined, dom);
                            tabLoadedCallback = undefined;
                            currentURL = undefined;
                        });
                    }
                });
            }
            
            function getTabDom(callback) {
                tabs.sendMessage(
                    $storage.tabID,
                    
                    {
                        action: 'getDOM'
                    },
                    
                    function(response) {                        
                        callback.call(undefined, response.dom);
                    }
                );
            }
            
            function createWindow(callback) {
                windows.create(
                    {
                        type: 'popup',
                        url: C.BROWSER.BLANK_PAGE,
                        focused: false,
                        // incognito: true,
                        height: 400,
                        width: 400
                    }, 
                    
                    function(window) {
                        $storage.windowID = window.id;
                        callback(window);
                    }
                );
            }
            
            function getWindow(callback) {
                windows.get(
                    $storage.windowID,    
                    
                    {
                        populate: true
                    },
                    
                    function(window) {
                        if(window !== undefined) {
                            callback(window);
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
            
            function updateTab(url, callback) {
                tabs.update(
                    $storage.tabID,                    
                    {
                        url: url
                    }
                );
                
                tabLoadedCallback = callback;
                currentURL = url;
            }
            
            function loadURL(url, callback) {
                var dom = $storage.cache[url];
                if(dom !== undefined) {
                    callback.call(undefined, dom);
                }
                else {
                    ensureWindow(function(window) {
                        var tab = window.tabs[0];                    
                        $storage.tabID = tab.id;
                        updateTab(url, callback);
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
                loadURL: loadURL
            };
        }
    ]);
        
}).call(this.WebScraper, chrome.windows, chrome.tabs);