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
        $scope.indice = [
            {
                label: '宏观指标',
                children:[
                    {
                        label:'政府基建投资',
                        children:['铁路投资','公路投资','水利和公共设施']
                    }
                ]
            },
            {
                label:'其他指标',
                children:['指标一','指标二','指标三']
            }
        ];

        $scope.my_tree_handler = function(branch){
            $scope.formula = branch.label;
            $rootScope.$broadcast('insert', $scope.formula);
        };

        $scope.ok = function(){
            $modalInstance.close($scope.formula);
        };

        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
    }]);
