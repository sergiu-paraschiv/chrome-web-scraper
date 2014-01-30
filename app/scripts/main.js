(function($, undefined) {
    'use strict';
    
    this.WebScraper = {
        Models: {}
    };
    
    this.WebScraper.exports = function(where, what) {
        $.extend(true, where, what);
    };

}).call(this, this.jQuery);