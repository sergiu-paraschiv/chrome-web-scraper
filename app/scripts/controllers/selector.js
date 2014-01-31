(function(undefined) {
    'use strict';
    
    var C = this.Constants;
    
    var Selector = this.Models.Selector;
   
    this.Main.controller('SelectorCtrl', [
        '$scope',
        '$routeParams',
        'EntitiesService',
        
        function ($scope, $routeParams, entitiesService) {
            $scope.adding = true;
            
            if($routeParams.selectorId !== undefined) {
                $scope.selector = entitiesService.find($routeParams.selectorId);
                $scope.adding = false;
            }
            else {
                $scope.selector = new Selector();
            }
            
            if($scope.adding) {
                $scope.parent = entitiesService.find($routeParams.parentId);
            }
            else {
                $scope.parent = entitiesService.find($scope.selector.parent);
            }
            
            $scope.types = [];
            
            for(var key in C.SELECTOR) {
                $scope.types.push(C.SELECTOR[key]);
            }
            
            $scope.add = function() {
                var selectorId = entitiesService.put($scope.selector, 'Selector');
                
                $scope.selector.parent = $scope.parent.id;
                $scope.parent.selectors.push(selectorId);
            };
        }
    ]);
        
}).call(this.WebScraper);
