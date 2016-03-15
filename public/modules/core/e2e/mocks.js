// Generated by CoffeeScript 1.9.3
(function() {
  var httpBackendMock;

  module.exports = httpBackendMock = function() {
    angular.module('httpBackendMock', ['ngMockE2E', 'myApp']).run(function($httpBackend) {
      var authenticated, testAccount;
      authenticated = false;
      testAccount = {
        email: 'test@example.com'
      };
      $httpBackend.whenGET('/api/auth').respond(function(method, url, data, headers) {
        if (authenticated) {
          return [200, testAccount, {}];
        } else {
          return [401, {}, {}];
        }
      });
      $httpBackend.whenPOST('/api/auth').respond(function(method, url, data, headers) {
        authenticated = true;
        return [200, testAccount, {}];
      });
      $httpBackend.whenDELETE('/api/auth').respond(function(method, url, data, headers) {
        authenticated = false;
        return [204, {}, {}];
      });
      $httpBackend.whenGET(/.*/).passThrough();
    });
  };

}).call(this);

//# sourceMappingURL=mocks.js.map
