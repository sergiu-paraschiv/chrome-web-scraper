(function(undefined) {
    'use strict';
    
    function replaceObject(a, b) {
        for(var key in b) {
            a[key] = b[key];
        }
    }
    
    function joinObjects(a, b) {
        var c = {};
        
        for(var key in a) {
            c[key] = a[key];
        }
        
        for(var key in b) {
            c[key] = b[key];
        }
        
        return c;
    }
    
    function objectKeys(a) {
        var keys = [];
        var k;
            
        for(k in a) {
            if(Object.prototype.hasOwnProperty.call(a, k)) {
                keys.push(k);
            }
        }
        
        return keys;
    };
    
    this.extend('Tools.Object.replace', replaceObject);
    this.extend('Tools.Object.join', joinObjects);
    this.extend('Tools.Object.keys', objectKeys);

}).call(this.scrap);