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
            }, function(){
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }])

    .factory('indexService',function(){
        var indice = [];
        var service = {};
        service.add = function (index){
          if (indice.indexOf(index) === -1)
            indice.push(index);
        };
        service.get = function(){
            return indice;
        };
        return service;
    })
;
