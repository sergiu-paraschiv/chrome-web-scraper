(function (undefined) {
    'use strict';

    function Construct(data) {
        if(data === undefined) {
            data = {};
        }
        
        this.name = data.name || '';
        this.xpath = data.xpath || '';
    }

    this.exports(this.Models, {
        Selector: Construct
    });

}).call(this.WebScraper);