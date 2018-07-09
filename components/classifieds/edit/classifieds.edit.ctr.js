(function() {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, classifiedsFactory, $timeout) {

            var vm = this;

            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;
            vm.classified = $state.params.classified;

            // vm.sidebarTitle = 'Add a Classified';

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
                vm.classified = {};
                vm.sidenavOpen = false;
            }

            function saveClassified(classified) {
                if(classified) {
                    classified.contact = {
                        name: 'Daisho',
                        phone: '(514) 775-9111',
                        email: 'daishokomiyama@gmail.com'
                    };

                    $scope.$emit('editClassified', classified);
                    vm.sidenavOpen = false;
                }
            }

        });
})();