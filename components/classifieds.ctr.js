(function() {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($scope, classifiedsFactory, $mdSidenav, $mdToast) {

            classifiedsFactory.getClassifieds().then(function(res) {
                $scope.classifieds = res.data;
            });

            var contact = {
                name: 'Daisho',
                phone: '(555) 524-5588',
                email: 'daishokomiyama@gmail.com'
            };

            $scope.openSidebar = function() {
                $mdSidenav('left').open();
            }

            $scope.closeSidebar = function() {
                $mdSidenav('left').close();
            }

            $scope.saveClassified = function(classified) {
                if (classified) {
                    classified.contact = contact;
                    $scope.classifieds.push(classified)
                    $scope.classified = {};
                    $scope.closeSidebar();

                    $mdToast.show(
                        $mdToast.simple()
                            .content('Classified saved!')
                            .position('top, right')
                            .hideDelay(3000)
                    );
                }
            }
        });
})();