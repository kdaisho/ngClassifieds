(function() {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($scope, classifiedsFactory, $mdSidenav) {

            classifiedsFactory.getClassifieds().then(function(res) {
                $scope.classifieds = res.data;
            });

            $scope.openSidebar = function() {
                $mdSidenav('left').open();
            }

            $scope.closeSidebar = function() {
                $mdSidenav('left').close();
            }
        });
})();