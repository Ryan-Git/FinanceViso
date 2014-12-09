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
    var formulaList = [{expression: '', data:[]}];

    // Public API here
    return {
        get: function(){
          return formulaList;
        },

        calculate: function (formula){
            //TODO get each index via indexService and calculate the result
            var index = indexService.get(formula.expression); //should be expression here. Now it's an index
            //should get more indices
            //calculate
            return index.$promise.then(function(){ //return the final promise
                formula.data = index.data; //add final data to formula
                $log.debug('calculated result is:' + angular.toJson(formula));
            });
        }
    };
  }]);
