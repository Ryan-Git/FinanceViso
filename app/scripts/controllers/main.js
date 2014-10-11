'use strict';

/**
 * @ngdoc function
 * @name financeVisoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financeVisoApp
 */
angular.module('financeVisoApp')
    .controller('MainCtrl', ['$scope','$modal', 'indexService','$log',function ($scope, $modal, indexService, $log) {
        $scope.indice = indexService.get();

        $scope.openEditor = function(){
            var editor = $modal.open({
                templateUrl:'views/indexEditor.html',
                controller:'IndexEditorCtrl',
                size:'lg'
            });

            editor.result.then(function(formula){
                indexService.add(formula);
                indexService.chart(formula);
            }, function(){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }])
;
