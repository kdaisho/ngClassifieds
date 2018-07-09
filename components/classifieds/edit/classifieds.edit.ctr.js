(function() {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function($state, $scope, $mdSidenav, $mdDialog, classifiedsFactory, $timeout) {

            var vm = this;

            vm.closeSidebar = closeSidebar;
            vm.saveEdit = saveEdit;
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

            function saveEdit() {
                $scope.$emit('editSaved', 'Edit saved!');
                vm.sidenavOpen = false;
            }

        });
})();