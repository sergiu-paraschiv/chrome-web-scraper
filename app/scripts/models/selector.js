﻿(function (undefined) {
    'use strict';
    
    var C = this.Constants;

    function Construct(data) {
        if(data === undefined) {
            data = {};
        }
        
        this.id = data.id || undefined;
        this.name = data.name || '';
        this.query = data.query || '';
        this.type = data.type || C.SELECTOR.TEXT.value;
        
        this.parent = data.parent || undefined;
        this.selectors = [];
    }

    this.exports(this.Models, {
        Selector: Construct
    });

}).call(this.WebScraper);