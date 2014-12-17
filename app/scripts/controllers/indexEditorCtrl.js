'use strict';

/**
 * @ngdoc function
 * @name financeVisoApp.controller:IndexEditorCtrl
 * @description
 * # IndexEditorCtrl
 * Controller of the financeVisoApp
 */
angular.module('financeVisoApp')
  .controller('IndexEditorCtrl', ['$scope', '$modalInstance', '$rootScope', 'indexService', function ($scope, $modalInstance, $rootScope, indexService) {
    $scope.root = null;

    d3.json("data/data.json", function(json) {
      $scope.json = json;
      $scope.$apply();
    });

    $scope.ok = function(name){
            $modalInstance.close(name);
        };

    $scope.cancel = function(){
        $modalInstance.dismiss('cancel');
    };
}]);
