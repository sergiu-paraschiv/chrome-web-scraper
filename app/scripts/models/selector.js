(function (undefined) {
    'use strict';
    
    var C = this.Constants;

    function Construct(data) {
        if(data === undefined) {
            data = {};
        }
        
        this.name = data.name || '';
        this.xpath = data.xpath || '';
        this.type = data.type || C.SELECTOR.TEXT.value;
        
        this.selectors = [];
    }

    this.exports(this.Models, {
        Selector: Construct
    });

}).call(this.WebScraper);