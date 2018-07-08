(function() {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, classifiedsFactory, $timeout) {

            var self = this;

            self.closeSidebar = closeSidebar;
            self.saveClassified = saveClassified;

            self.sidebarTitle = 'Add a Classified';

            $scope.$watch('vm.sidenavOpen', function(sidenav) {
                if (sidenav === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() {
                            $state.go('classifieds');
                        });
                }
            });

            $timeout(function() {
                $mdSidenav('left').open();
            });

            function closeSidebar() {
                self.classified = {};
                self.sidenavOpen = false;
            }

            function saveClassified(classified) {
                if(classified) {
                    classified.contact = {
                        name: 'Daisho',
                        phone: '(514) 775-9111',
                        email: 'daishokomiyama@gmail.com'
                    };

                    $scope.$emit('newClassified', classified);
                    self.sidenavOpen = false;
                }
            }

        });
})();