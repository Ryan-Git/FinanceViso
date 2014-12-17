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
        $scope.available = [
            {id: 1, name: '铁路运输业固定资产投资额', url: 'http://115.28.100.71:8881/datagen?type=A03070703'},
            {id: 2, name: '铁路运输业固定资产投资额_累计增长百分比', url:'http://115.28.100.71:8881/datagen?type=A03070704'},
            {id: 3, name: '指标2'}
        ];

        $scope.compare = function(formula){
            formula.id = uuid();
            $log.debug('compare: ' + angular.toJson(formula));
            var result = formulaService.calculate(formula);
            result.then(function(){
                chartService.compare(formula.data, formula.id);
            });
            $scope.formulaList.push({expression:'', data:[]});
        };

        $scope.append = function(formula){
            formula.id = uuid();
            $log.debug('append: ' + angular.toJson(formula));
            var result = formulaService.calculate(formula);
            result.then(function(){//TODO shouldn't be promise here. Finish formulaService
                chartService.append(formula.data, formula.id);
            });
            $scope.formulaList.push({expression:'', data:[]});
        };
        $scope.remove = function(formula){
            $log.debug('remove: ' + angular.toJson(formula.id));
            chartService.remove(formula.id);
            $scope.formulaList.splice($.inArray(formula,$scope.formulaList),1);
        };

        $scope.openEditor = function(formula){
            var editor = $modal.open({
                templateUrl:'views/indexEditor.html',
                controller:'IndexEditorCtrl',
                size:'lg'
            });

            editor.result.then(function(data){
              formula.expression += data;
            }, function(){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.number = function(){
          chartService.number();
        };

        $scope.percent = function(){
          chartService.percent();
        };

        function uuid(){
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          });
        }
    }])
;
