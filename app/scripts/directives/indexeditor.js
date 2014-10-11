'use strict';

/**
 * @ngdoc directive
 * @name financeVisoApp.directive:indexEditor
 * @description
 * # indexEditor
 */
angular.module('financeVisoApp')
  .directive('indexEditor', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the indexEditor directive');
      }
    };
  });
