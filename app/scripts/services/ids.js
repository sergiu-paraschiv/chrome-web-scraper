(function(undefined) {
    'use strict';

    this.Main.factory('IDsService', [
        '$localStorage',
        
        function ($localStorage) {
            var collection = $localStorage.ids;
            
            function ensureCollectionExists() {
                if(collection === undefined) {
                    $localStorage.ids = {
                        max: 0
                    };
                    collection = $localStorage.ids;
                }
            }
            
            function getNext(prefix) {
                ensureCollectionExists();
                
                collection.max += 1;
                
                var id = collection.max;
                
                if(prefix) {
                    id = prefix + id;
                }
                
                return id;
            }

            return {
                getNext: getNext
            };
        }
    ]);
        
}).call(this.WebScraper);