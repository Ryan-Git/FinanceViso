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
    function initChart(formula){
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
            yAxis:[
                {
//                    height: '60%',
                    lineWidth: 2
                }
            ],
            series:[{
                id: formula.name,
                name: formula.name,
                data: formula.data
            }]
        });
    };

    // Public API here
    return {

        remove: function (formula){
            var chart = $('#highCharts').highcharts();
            var name = formula.name;
            chart.get(name).remove();
            if (chart.series.length === 1){
                chart.series[0].setCompare(null);
                chart.yAxis[0].setCompare(null);
            }
            chart.redraw();
        },

        compare: function (formula){
            $log.debug('chart compare: ', angular.toJson(formula));
            var chart = $('#highCharts').highcharts();
            if (typeof(chart) == 'undefined'){
                initChart(formula);
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
        },

        append: function(formula){
            $log.debug('chart append: ', angular.toJson(formula));
            var chart = $('#highCharts').highcharts();
            if (typeof(chart) == 'undefined'){
                initChart(formula);
            } else{
                chart.yAxis[0].update({
                    height: '60%'
                }, true);
                chart.addAxis({
                    id: formula.name,
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2,
                    opposite: true
                });
                chart.addSeries({
                    id: formula.name,
                    type: 'column',
                    name: formula.name,
                    data: formula.data,
                    yAxis: formula.name
                });
            }
            chart.redraw();
        }
    };
  }]);
