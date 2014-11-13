'use strict';

/**
 * @ngdoc function
 * @name financeVisoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financeVisoApp
 */
angular.module('financeVisoApp')
    .controller('MainCtrl', ['$scope','$modal','$log', 'formulaService', 'chartService', function ($scope, $modal, $log, formulaService, chartService) {
        $scope.formulaList = formulaService.get();
        $scope.formula = "";
        $scope.available = [
            {id: 1, name: '铁路运输业固定资产投资额', url: 'http://115.28.100.71:8881/datagen?type=A03070703'},
            {id: 2, name: '铁路运输业固定资产投资额_累计增长百分比', url:'http://115.28.100.71:8881/datagen?type=A03070704'},
            {id: 3, name: '指标2'}
        ];

        $scope.compare = function(){
            $log.debug('add: ' + angular.toJson($scope.formula));
            var result = formulaService.calculate($scope.formula);
            result.$promise.then(function(){ //TODO shouldn't be promise here. Finish formulaService
                chartService.compare(result);
            });
            $scope.formula = "";
        };

        $scope.append = function(){
            $log.debug('append: ' + angular.toJson($scope.formula));
            var result = formulaService.calculate($scope.formula);
            result.$promise.then(function(){//TODO shouldn't be promise here. Finish formulaService
                chartService.append(result);
            });
            $scope.formula = "";
        };

        $scope.removeSeries = function(name){
            $log.debug('remove: ' + name);
            chartService.remove(name);
        };

        $scope.openEditor = function(){
            var editor = $modal.open({
                templateUrl:'views/indexEditor.html',
                controller:'IndexEditorCtrl',
                size:'lg'
            });

            editor.result.then(function(formula){
                formulaService.addAndDraw($scope.formula);
            }, function(){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }])
;
