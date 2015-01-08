'use strict';

/**
 * @ngdoc service
 * @name financeVisoApp.formulaService
 * @description
 * # formulaService
 * Factory in the financeVisoApp.
 */
angular.module('financeVisoApp')
  .factory('formulaService', [ 'indexService','$http', '$log', function (indexService, $http, $log) {
    var formulaList = [{expression: '', data:[]}];
    var keywords = ['+', '-', '*', '/'];
    // Public API here
    return {
        get: function(){
          return formulaList;
        },

        calculate: function (formula){
            //TODO get each index via indexService and calculate the result
            //var index = indexService.get(formula.expression); //should be expression here. Now it's an index
            ////should get more indices
            ////calculate
            //return index.$promise.then(function(){ //return the final promise
            //    formula.data = index.data; //add final data to formula
            //    $log.debug('calculated result is:' + angular.toJson(formula));
            //});

          return $http.get('http://218.244.146.161/app/gongshi.aspx?formula=' + formula.expression, {cache: true})
            .success(function(data){
              formula.data = data;
            });
        },

        tick: function(formula){
          return $http.get('data/appl.json'/* + formula.expression*/, {cache: true})
            .success(function(data){
              // split the data set into ohlc and volume
              var ohlc = [],
                volume = [],
                dataLength = data.length,
              // set the allowed units for data grouping
                groupingUnits = [[
                  'week',                         // unit name
                  [1]                             // allowed multiples
                ], [
                  'month',
                  [1, 2, 3, 4, 6]
                ]],

                i = 0;

              for (i; i < dataLength; i += 1) {
                ohlc.push([
                  data[i][0], // the date
                  data[i][1], // open
                  data[i][2], // high
                  data[i][3], // low
                  data[i][4] // close
                ]);

                volume.push([
                  data[i][0], // the date
                  data[i][5] // the volume
                ]);
              }
              formula.data.ohlc = ohlc;
              formula.data.volume = volume;
            });
        }
    };
  }]);
