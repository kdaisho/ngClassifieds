'use strict';

angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    .config(function($mdThemingProvider, $stateProvider, $locationProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

        $stateProvider
            .state('stateone', {
                url: '/stateone',
                template: '<h1>State One</h1>'
            })
            .state('statetwo', {
                url: '/statetwo',
                template: '<h1>State Two</h1>'
            });

        $locationProvider.hashPrefix('');
    });