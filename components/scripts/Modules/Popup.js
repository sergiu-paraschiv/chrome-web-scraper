(function(ng, undefined) {
    'use strict';
   
    var module = ng.module('Popup', [
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
                .state('base.home', {
                    url: '/',
                    views: {
                        'content@': {
                            templateUrl: 'components/views/popup/home.html',
                            controller: 'Home'
                        }
                    }
                });
    });
    
    this.extend('Popup', module);

}).call(this.scrap, this.angular);