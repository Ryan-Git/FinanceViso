'use strict';

/**
 * @ngdoc service
 * @name financeVisoApp.chartService
 * @description
 * # chartService
 * Factory in the financeVisoApp.
 */
angular.module('financeVisoApp')
  .factory('chartService', ['$log', function ($log) {
    // Service logic
    // ...

    // Public API here
    return {

        removeSeries: function (formula){
            var chart = $('#highCharts').highcharts();
            var name = formula.name;
            chart.get(name).remove();
            if (chart.series.length === 1){
                chart.series[0].setCompare(null);
                chart.yAxis[0].setCompare(null);
            }
            chart.redraw();
        },

        addSeries: function (formula){
            $log.debug('chart formula: ', angular.toJson(formula));
            var chart = $('#highCharts').highcharts();
            if (typeof(chart) == 'undefined'){
                //the first chart
                $('#highCharts').highcharts('StockChart', {
                    title: {
                        text: '自定义图表'
                    },
                    subtitle:{
                        align: 'left',
                        text: formula.name + '<a href="javascript:void(0);" onclick="removeSeries(\''+formula.name+'\')"><span class="glyphicon glyphicon-remove"></span></a><br/>',
                        useHTML: true
                    },
                    rangeSelector:{
                        selected: 4
                    },
                    plotOptions: {
                        series: {
                            compare: 'value'
                        }
                    },
                    tooltip: {
                        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
                        valueDecimals: 2
                    },
                    series:[{
                        id: formula.name,
                        name: formula.name,
                        data: formula.data
                    }]
                });
            } else{
                chart.addSeries({
                    id: formula.name,
                    name: formula.name,
                    data: formula.data
                });
                $.each(chart.series,function(i, s){
                    s.setCompare('percent');
                });
                chart.yAxis[0].setCompare('percent');
                var originalSubTitle = chart.subtitle.textStr;
                chart.setTitle(null, {
                    align: 'left',
                    text: originalSubTitle + formula.name + '<a href="javascript:void(0);" onclick="removeSeries(\''+formula.name+'\')"><span class="glyphicon glyphicon-remove"></span></a><br/>',
                    useHTML: true
                });
                chart.redraw();
            }
        }
    };
  }]);
