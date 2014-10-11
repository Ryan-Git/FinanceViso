'use strict';

describe('Controller: IndexeditorctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('financeVisoApp'));

  var IndexeditorctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IndexeditorctrlCtrl = $controller('IndexeditorctrlCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
