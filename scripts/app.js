'use strict';

angular
    .module('ngClassifieds', ['ngMaterial', 'ui.router'])
    .config(function($mdThemingProvider, $stateProvider, $locationProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('orange');

        //URL: <domain>/#/classifieds
        $stateProvider
            .state('classifieds', {
                url: '/classifieds',
                templateUrl: 'components/classifieds/classifieds.tmp.html',
                controller: 'classifiedsCtrl as vm'
            })
            .state('classifieds.new', {
                url: '/new',
                templateUrl: 'components/classifieds/new/classifieds.new.tmp.html',
                controller: 'newClassifiedsCtrl as vm'
            })
            .state('classifieds.edit', {
                url: '/edit/:id',
                templateUrl: 'components/classifieds/edit/classifieds.edit.tmp.html',
                controller: 'editClassifiedsCtrl as vm',
                params: {
                    classified: null
                }
            });
        $locationProvider.hashPrefix('');
    });