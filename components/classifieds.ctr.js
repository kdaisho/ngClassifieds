(function() {

    'use strict';

    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($scope, $http) {
            $http.get('data/classifieds.json').then(function(res) {
                $scope.classifieds = res.data;
            });
        });
})();