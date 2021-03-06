(function() {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($scope, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {

            var vm = this;

            vm.categories;
            vm.classifieds;
            vm.classified;
            vm.closeSidebar = closeSidebar;
            vm.deleteClassified = deleteClassified;
            vm.editing;
            vm.editClassified = editClassified;
            vm.openSidebar = openSidebar;
            // vm.saveClassified = saveClassified;
            vm.saveEdit = saveEdit;

            classifiedsFactory.getClassifieds().then(function(res) {
                // vm.classifieds = res.data;
                // vm.categories = getCategories(vm.classifieds);
            });

            $scope.$on('newClassified', function(event, classified) {
                classified.id = vm.classifieds.length + 1;
                vm.classifieds.push(classified);
                showToast('Classified saved!');
            });

            $scope.$on('editSaved', function(event, msg) {
                showToast(msg);
            });

            function openSidebar() {
                $state.go('classifieds.new');
            }

            var contact = {
                name: 'Daisho',
                phone: '(555) 524-5588',
                email: 'daishokomiyama@gmail.com'
            };

            function closeSidebar() {
                $mdSidenav('left').close();
            }

            var typingTimer;
            var doneInterval = 2000;
            var myInput = document.getElementById('query');

            myInput.addEventListener('keyup', function(url) {
                clearTimeout(typingTimer);
                if (myInput.value) {
                    console.log('keyup fired');
                    typingTimer = setTimeout(
                        callAjax('/data/classifieds.json', function(data) {
                            vm.classifieds = data;
                            vm.categories = getCategories(vm.classifieds);
                        }),
                        doneInterval
                    );
                }
            });

            function callAjax(url, callback) {
                return function() {
                    var xhttp = new XMLHttpRequest();
                    xhttp.onreadystatechange = function() {
                        console.log('ajax called');
                        if (xhttp.readyState == 4 && xhttp.status == 200) {
                            try {
                                var data = JSON.parse(xhttp.responseText);
                                console.log('DATA: ' + data);
                            }
                            catch(error) {
                                console.log(error.message + ' in ' + xhttp.responseText);
                                return;
                            }
                            callback(data);
                        }
                    };

                    xhttp.open('GET', url, true);
                    xhttp.send();
                }
            }


            // function saveClassified(classified) {
            //     if (classified) {
            //         classified.contact = contact;
            //         vm.classifieds.push(classified)
            //         vm.classified = {};
            //         closeSidebar();
            //         showToast('Classified saved!');
            //     }
            // }

            function editClassified(classified) {
                $state.go('classifieds.edit', {
                    id: classified.id,
                    classified: classified
                });
            }

            function saveEdit() {
                vm.editing = false;
                vm.classified = {};
                closeSidebar();
                showToast('Edit saved!');
            }

            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete ' + classified.title + '?')
                    .ok('Yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    var index = vm.classifieds.indexOf(classified);
                    vm.classifieds.splice(index, 1);
                }, function() {

                });
            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple()
                        .content(message)
                        .position('top, right')
                        .hideDelay(3000)
                );
            }

            function getCategories(classifieds) {

                var categories = [];

                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(category) {
                        categories.push(category);
                    });
                });

                return _.uniq(categories);
            }
        });
})();