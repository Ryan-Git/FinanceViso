'use strict';

/**
 * @ngdoc function
 * @name financeVisoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the financeVisoApp
 */
var app =angular.module('financeVisoApp');
  app.controller('IndexTreeCtrl', function ($scope) {
        $scope.indice = [
            {
                label: '宏观指标',
                children:[
                    {
                        label:'政府基建投资',
                        children:['铁路投资','公路投资','水利和公共设施']
                    }
                ]
            },
            {
                label:'其他指标',
                children:['指标一','指标二','指标三']
            }
    ];
  });

app.controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];
});
