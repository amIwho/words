// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  module.exports = function(app) {
    var callback;
    callback = require('../../app/controllers/callback.server.controller');
    return app.route('/callback').post(callback.send);
  };

}).call(this);

//# sourceMappingURL=callback.server.routes.js.map
