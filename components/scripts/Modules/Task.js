(function(ng, undefined) {
    'use strict';
   
    var module = ng.module('Task', [
        'Base',
        'ui.router'
    ]);
    
    module.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('base', {
                url: '',
                abstract: true,
                views: {
                }
            })
                .state('base.add', {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: 'components/views/task/add.html',
                            controller: 'Add'
                        }
                    }
                })
                
                .state('base.edit', {
                    url: '/edit/:id',
                    views: {
                        'content@': {
                            templateUrl: 'components/views/task/edit.html',
                            controller: 'Edit'
                        }
                    }
                });
    });
    
    this.extend('Task', module);

}).call(this.scrap, this.angular);