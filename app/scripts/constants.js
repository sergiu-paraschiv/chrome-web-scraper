(function(undefined) {
    'use strict';
    
    this.Constants = {
        BROWSER: {
            BLANK_PAGE: 'chrome://newtab',
            MAX_CONCURRENT_LOADS: 2
        },
        
        SELECTOR: {
            ELEMENT: {label: 'Element', value: 'element'},
            URL: {label: 'URL', value: 'url'},
            TEXT: {label: 'Text', value: 'text'},
            ATTRIBUTE: {label: 'Attribute', value: 'attribute'}
        }
    };

}).call(this.WebScraper);