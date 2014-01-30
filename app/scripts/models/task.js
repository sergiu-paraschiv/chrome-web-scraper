(function (undefined) {
    'use strict';

    function Construct(data) {
        if(data === undefined) {
            data = {};
        }
        
        this.id = data.id || undefined;
        this.name = data.name || '';
        this.url = data.url || '';
        
        this.selectors = [];
    }

    this.exports(this.Models, {
        Task: Construct
    });

}).call(this.WebScraper);