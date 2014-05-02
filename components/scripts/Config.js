(function(undefined) {
    'use strict';
    
    var config = {
        DB: {
            NAME: 'scrap',
            VERSION: 1,
            SCHEMA : {
                tasks: {
                    key: {
                        keyPath: 'id' , autoIncrement: true
                    }
                }
            }
        }
    };

    this.extend('Config', config);

}).call(this.scrap);