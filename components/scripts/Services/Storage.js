(function(ng, _, db, undefined) {
    'use strict';
    
    var Config = this.Config;
    
    function Service($q) {
    
        function open(name, version, schema) {
            var deferred = $q.defer();
            
            db.open(name, version, schema)
                .done(function(server) {
                    deferred.resolve(server);
                });
                
            return deferred.promise;
        }
        
        var connection = open({
            server: Config.DB.NAME,
            version: Config.DB.VERSION,
            schema: Config.DB.SCHEMA
        });
        
        function ready(callback) {
            connection.then(callback);
        }
        
        function all(server, callback) {
            server.query()
                    .all()
                    .execute()
                    .done(callback);
        }
        
        function find(id, keyPath, server, callback) {
            server.query()
                    .filter(keyPath, id)
                    .execute()
                    .done(function(results) {
                        if(results.length === 0) {
                            callback.call(undefined, null);
                        }
                        else {
                            callback.call(undefined, results[0]);
                        }
                    });
        }
        
        function remove(id, server, callback) {
            server.remove(id)
                    .done(callback);
        }
        
        function add(items, keyPath, server, callback) {
            if(!ng.isArray(items)) {
                items = [items];
            }
            
            items = _.map(items, function(item) {
                if(item[keyPath] === null) {
                    delete item[keyPath];
                }

                return item;
            });
            
            server.add.apply(this, items)
                    .done(callback);
        }
            
        return {
            ready: ready,
            all: all,
            find: find,
            remove: remove,
            add: add
        };
    }
    
    this.Base.service('Storage', ['$q', Service]);
        
}).call(this.scrap, this.angular, this._, this.db);