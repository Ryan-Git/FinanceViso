'use strict';

describe('Directive: indexEditor', function () {

  // load the directive's module
  beforeEach(module('financeVisoApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<index-editor></index-editor>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the indexEditor directive');
  }));
});
