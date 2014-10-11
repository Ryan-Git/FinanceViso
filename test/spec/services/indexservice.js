'use strict';

describe('Service: indexService', function () {

  // load the service's module
  beforeEach(module('financeVisoApp'));

  // instantiate service
  var indexService;
  beforeEach(inject(function (_indexService_) {
    indexService = _indexService_;
  }));

  it('should do something', function () {
    expect(!!indexService).toBe(true);
  });

});
