(function(undefined) {
    'use strict';
    
    function replaceArray(a, b) {
        a.splice(0, a.length);
        Array.prototype.push.apply(a, b);
    }
    
    this.extend('Tools.Array.replace', replaceArray);

}).call(this.scrap);