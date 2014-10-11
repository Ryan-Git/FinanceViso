'use strict';

/**
 * @ngdoc service
 * @name financeVisoApp.indexService
 * @description
 * # indexService
 * Factory in the financeVisoApp.
 */
angular.module('financeVisoApp')
  .factory('indexService', ['$resource', '$log', function ($resource, $log) {
    // Service logic
    var indice = [];

    // Public API here
    return {
        add: function (index){
            if (indice.indexOf(index) === -1)
                indice.push(index);
        },

        get: function(){
            return indice;
        },

        chart: function(formula){
            var index = $resource('http://115.28.100.71:8881/datagen?type=A03070703').get(function(){
                var keys = [], values = [];
                for (var key in index.data)
                    keys.push(key);
                keys.sort();
                keys = keys.reverse().slice(0, 18);
                keys.sort();
                for (var i = 0; i < keys.length; i++) {
                    values.push(parseFloat(index.data[keys[i]].replace(',','')));
                }

                $log.info(keys);
                $log.info(values);

                $(function () {
                    $('#highCharts').highcharts({
                        title: {
                            text: index.name,
                            x: -20 //center
                        },

                        xAxis: {
                            categories: keys
                        },
                        yAxis: {
                            title: {
                                text: '亿元'
                            },
//                            min:0,
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: '亿元'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: [{
                            name: index.name,
                            data: values
                        }]
                    });
                });
            });
        }
    };
  }]);
