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

    // Public API here
    return {
        get: function(index) {
            var Index = $resource(index.url);
            index = Index.get(function () {
                var keys = [], values = [];
                for (var key in index.data)
                    keys.push(key);
                keys.sort();
//                $log.debug(keys);
//                keys = keys.reverse().slice(7, 18);
//                keys.sort();
//                $log.debug(keys);
                for (var i = 0; i < keys.length; i++) {
                    var v = parseFloat(index.data[keys[i]].replace(',', ''));
                    var array = [];
                    var key = keys[i];
                    var date = new Date(key.substr(0, 4), key.substr(4) - 1);
                    array.push(date.getTime());
                    array.push(v);
                    values.push(array);
                }
                index.data = values;
                $log.debug('got index: ' + angular.toJson(index));
            });
            return index;
        }
    };
  }]);
