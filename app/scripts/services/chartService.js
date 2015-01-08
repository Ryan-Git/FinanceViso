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

        tick: function(data, id){
          // set the allowed units for data grouping
          var groupingUnits = [[
            'week',                         // unit name
            [1]                             // allowed multiples
          ], [
            'month',
            [1, 2, 3, 4, 6]
          ]];
          if (typeof(chart) == 'undefined'){

            // create the chart
            $('#highCharts').highcharts('StockChart', {

              rangeSelector: {
                selected: 1
              },

              title: {
                text: 'AAPL'
              },

              yAxis: [{
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2
              }, {
                labels: {
                  align: 'right',
                  x: -3
                },
                title: {
                  text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
              }],

              series: [{
                type: 'candlestick',
                name: 'AAPL',
                data: data.ohlc,
                dataGrouping: {
                  units: groupingUnits
                }
              }, {
                type: 'column',
                name: 'Volume',
                data: data.volume,
                yAxis: 1,
                dataGrouping: {
                  units: groupingUnits
                }
              }]
            });
            chart =  $('#highCharts').highcharts();
          } else{
            chart.addSeries({
              id:  'candlestick' + id,
              type: 'candlestick',
              name: 'AAPL',
              data: data.ohlc,
              dataGrouping: {
                units: groupingUnits
              }
            });
            chart.addSeries({
              id: 'Volume' + id,
              type: 'column',
              name: 'Volume',
              data: data.volume,
              yAxis: 1,
              dataGrouping: {
                units: groupingUnits
              }
            });
            chart.redraw();
          }
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
