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
    var chart;
    function initChart(data, id){
        //the first chart
        $('#highCharts').highcharts('StockChart', {
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
                    lineWidth: 2
                }
            ],
            series:[{
                id: id,
                data: data
            }]
        });
        chart =  $('#highCharts').highcharts();
    }
    // Public API here
    return {
        remove: function (id){
            $log.debug('chart to be removed: ', id);
            chart.get(id).remove();
            if (chart.get('yAxis' + id))
                chart.get('yAxis' + id).remove();
            if ( chart.yAxis.length === 2){
              chart.yAxis[0].update({
                height: '100%'
              }, true);
            }
            chart.redraw();
        },

        compare: function (data, id){
            $log.debug('chart compare: ', angular.toJson(id));
            if (typeof(chart) == 'undefined'){
                initChart(data, id);
            } else{
                chart.addSeries({
                    id: id,
                    data: data
                });
                chart.redraw();
            }
        },

        append: function(data, id){
            $log.debug('chart append: ', angular.toJson(data));
            if (typeof(chart) == 'undefined'){
                initChart(data, id);
            } else{
                chart.yAxis[0].update({
                    height: '60%'
                }, true);
                chart.addAxis({
                    id: 'yAxis' + id,
                    top: '65%',
                    height: '35%',
                    offset: 0,
                    lineWidth: 2,
                    opposite: true
                });
                chart.addSeries({
                    id: id,
                    type: 'column',
                    data: data,
                    yAxis: 'yAxis' + id
                });
            }
            chart.redraw();
        },

        number: function(){
          $.each(chart.series,function(i, s){
            s.setCompare('value');
          });
          $.each(chart.yAxis, function(i, axis){
            axis.setCompare('value');
          });
        },

        percent: function(){
          $.each(chart.series,function(i, s){
              s.setCompare('percent');
          });
          $.each(chart.yAxis, function(i, axis){
            axis.setCompare('percent');
          });
        }
    };
  }]);
