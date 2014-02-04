(function(undefined) {
    'use strict';

    var C = this.Constants;
    
    this.Main.factory('DataService', [
        '$localStorage',
        'EntitiesService',
        
        function ($localStorage, entitiesService) {
            var collection = $localStorage.data;
            
            function ensureCollectionExists() {
                if(collection === undefined) {
                    $localStorage.data = {};
                    collection = $localStorage.data;
                }
            }
            
            function find(entityId) {
                ensureCollectionExists();
                
                return collection[entityId];
            }
            
            function walkSelectors(selectors, data) {
                for(var selectorId in selectors) {
                    var selector = entitiesService.find(selectors[selectorId]);

                    if(selector.type === C.SELECTOR.ELEMENT.value) {
                        data[selector.name] = walkSelectors(selector.selectors, data[selector.name]);
                    }
                    else if(selector.type === C.SELECTOR.URL.value) {
                        for(var i in data[selector.name]) {
                            data[selector.name][i] = find(data[selector.name][i] + '-' + selector.name);
                            data[selector.name][i] = walkSelectors(selector.selectors, data[selector.name][i]);
                        }
                    }
                }
                
                return data;
            }
            
            function makeTree(root) {
                var data = find(root.id);
                
                data = walkSelectors(root.selectors, data);

                return data;
            }

            function put(id, data) {
                ensureCollectionExists();
                
                collection[id] = data;
            }
            
            function remove(entityId) {
                ensureCollectionExists();
                
                if(collection[entityId] !== undefined) {
                    delete collection[entityId];
                    return entityId;
                }
                
                return false;
            }
            
            function removeAll() {
                ensureCollectionExists();
                for(var entityId in collection) {
                    delete collection[entityId];
                }
            }
            
            function removeMany(entityIds) {
                ensureCollectionExists();
                
                var removed = [];
                
                for(var entityId in entityIds) {
                    if(collection[entityId] !== undefined) {
                        delete collection[entityId];
                        removed.push(entityId);
                    }
                }
                
                return removed;
            }
            
            return {
                find: find,
                makeTree: makeTree,
                put: put,
                remove: remove,
                removeMany: removeMany,
                removeAll: removeAll
            };
        }
    ]);
        
}).call(this.WebScraper);