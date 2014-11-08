'use strict';

/**
 * @ngdoc service
 * @name financeVisoApp.formulaService
 * @description
 * # formulaService
 * Factory in the financeVisoApp.
 */
angular.module('financeVisoApp')
  .factory('formulaService', [ 'indexService', 'chartService', function (indexService, chartService) {
    var formulaList = [];

    // Public API here
    return {
        get: function(){
          return formulaList;
        },

        addAndDraw: function (formula){
            if (formulaList.indexOf(formula) === -1) {
                //TODO get each index via indexService and calculate the result
                var index = indexService.get(formula); //should be index here. Now it's an index
                //should get more indices
                //calculate
                index.$promise.then(function(){
                    chartService.addSeries(index);//should be calculate result here
                });
            }
        }
    };
  }]);
