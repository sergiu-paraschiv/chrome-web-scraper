(function(undefined) {
    'use strict';
    
    var Config = this.Config;
    var Mapper = this.Mappers.Tasks;
    
    function Service($storage) {
        var db;
        var mapper = new Mapper();
        
        function ready(callback) {
            var self = this;
            
            $storage.ready(function(server) {
                db = server.tasks;
                callback.call(undefined, self);
            });
        }
        
        function all(callback) {
            $storage.all(db, function(results) {
                callback.call(undefined, mapper.map(results));
            });
        }
        
        function find(id, callback) {
            $storage.find(id, Config.DB.SCHEMA.tasks.key.keyPath, db, function(result) {
                callback.call(undefined, mapper.mapOne(result));
            });
        }
        
        function remove(id, callback) {
            $storage.remove(id, db, callback);
        }
        
        function add(items, callback) {
            $storage.add(items, Config.DB.SCHEMA.tasks.key.keyPath, db, callback);
        }
    
        return {
            ready: ready,
            all: all,
            find: find,
            remove: remove,
            add: add
        };
    }
    
    this.Base.service('Tasks', ['Storage', Service]);
        
}).call(this.scrap);