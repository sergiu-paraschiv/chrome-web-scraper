(function(doc, runtime, undefined) {
    'use strict';
    
    runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if(request.action == 'getDOM') {
            sendResponse({
                dom: document.documentElement.outerHTML
            });
        }
        else {
            sendResponse({});
        }
    });
    
}).call(undefined, document, chrome.runtime);