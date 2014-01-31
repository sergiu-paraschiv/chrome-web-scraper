(function(undefined) {
    'use strict';

    this.Main.factory('EntitiesService', [
        'IDsService',
        '$localStorage',
        
        function (idsService, $localStorage) {
            var collection = $localStorage.entities;
            
            function ensureCollectionExists() {
                if(collection === undefined) {
                    $localStorage.entities = {};
                    collection = $localStorage.entities;
                }
            }
            
            function find(entityId) {
                ensureCollectionExists();
                
                return collection[entityId];
            }
            
            function findMany(entityIds) {
                var entities = {};
                
                entityIds.forEach(function(entityId) {
                    entities[entityId] = find(entityId);
                });
                
                return entities;
            }
            
            function findWithRelations(entityId, relations) {
                var entity = find(entityId);
                
                if(entity === undefined) {
                    return undefined;
                }
                
                var hidratedRelations = {};
                
                relations.forEach(function(relation) {
                    if(entity[relation] !== undefined) {
                        hidratedRelations[relation] = findMany(entity[relation]);
                    }
                });
                
                return {
                    entity: entity,
                    relations: hidratedRelations
                };
            }
            
            function all() {
                ensureCollectionExists();
                
                return collection;
            }
            
            function query(prefix) {
                var entities = all();
                var filtered = [];
                
                for(var id in entities) {
                    if(id.indexOf(prefix) === 0) {
                        filtered.push(entities[id]);
                    }
                }
                
                return filtered;
            }
            
            function put(entity, prefix) {
                ensureCollectionExists();
                
                if(entity.id === undefined) {
                    entity.id = idsService.getNext(prefix);
                }
                
                collection[entity.id] = entity;
                
                return entity.id;
            }
            
            function remove(entityId) {
                ensureCollectionExists();
                
                if(collection[entityId] !== undefined) {
                    delete collection[entityId];
                    return entityId;
                }
                
                return false;
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
            
            function typeOf(entity) {
                if(entity.id.indexOf('Task') === 0) {
                    return 'task';
                }
                else if(entity.id.indexOf('Selector') === 0) {
                    return 'selector';
                }
                else {
                    return undefined;
                }
            }

            return {
                find: find,
                findMany: findMany,
                findWithRelations: findWithRelations,
                put: put,
                all: all,
                query: query,
                remove: remove,
                removeMany: removeMany,
                typeOf: typeOf
            };
        }
    ]);
        
}).call(this.WebScraper);