(function(undefined) {
    'use strict';
    
    var Task = this.Models.Task;
   
    this.Main.controller('SelectorsCtrl', [
        '$scope',
        '$routeParams',
        'EntitiesService',
        
        function ($scope, $routeParams, entitiesService) {
            var parent = entitiesService.findWithRelations($routeParams.parentId, ['selectors']);
            
            $scope.parent = parent.entity;
            $scope.selectors = parent.relations.selectors;
            
            function removeSelectors(parent) {
                if(parent.selectors !== undefined) {
                    for(var selector in parent.selectors) {
                        removeSelectors(selector);
                        
                        entitiesService.remove(selector.id);
                    }
                }
            }
            
            $scope.remove = function(selector) {
                removeSelectors(selector);
                
                for(var index in $scope.parent.selectors) {
                    if($scope.parent.selectors[index] === selector.id) {
                        delete $scope.parent.selectors[index];
                    }
                }
                
                entitiesService.remove(selector.id);
            };
            
            var entityType = entitiesService.typeOf($scope.parent);
            
            if(entityType === 'task') {
                $scope.backLink = '#/task/' + $scope.parent.id;
            }
            else if(entityType === 'selector') {
                $scope.backLink = '#/selector/' + $scope.parent.id;
            }
        }
    ]);
        
}).call(this.WebScraper);
