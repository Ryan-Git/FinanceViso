'use strict';

/**
 * @ngdoc service
 * @name financeVisoApp.formulaService
 * @description
 * # formulaService
 * Factory in the financeVisoApp.
 */
angular.module('financeVisoApp')
  .factory('formulaService', [ 'indexService','$log', function (indexService, $log) {
    var formulaList = [];

    // Public API here
    return {
        get: function(){
          return formulaList;
        },

        calculate: function (formula){
            if (formulaList.indexOf(formula) === -1) {
                //TODO get each index via indexService and calculate the result
                var index = indexService.get(formula); //should be index here. Now it's an index
                //should get more indices
                //calculate
                $log.debug('calculated result is:' + angular.toJson(index));
                return index; //return result
            }
        }
    };
  }]);
