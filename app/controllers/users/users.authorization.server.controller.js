// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  var User, _, mongoose;

  _ = require('lodash');

  mongoose = require('mongoose');

  User = mongoose.model('User');

  exports.userByID = function(req, res, next, id) {
    User.findOne({
      _id: id
    }).exec(function(err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(new Error('Failed to load User ' + id));
      }
      req.profile = user;
      next();
    });
  };

  exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
      return res.status(401).send({
        message: 'User is not logged in'
      });
    }
    next();
  };

  exports.requiresLoginToken = function(req, res, next) {
    var loginToken;
    loginToken = req.body.loginToken;
    return User.findOne({
      loginToken: loginToken,
      loginExpires: {
        $gt: Date.now()
      }
    }, function(err, user) {
      if (!user) {
        return res.status(401).send({
          message: 'Неправильный токен или срок действия истек, залогиньтесь снова.'
        });
      }
      if (err) {
        return res.status(500).send({
          message: 'Произошла внутренняя ошибка сервера. Сообщите разработчикам по адресу kalinon7@gmail.com.'
        });
      }
      req.user = user;
      return next();
    });
  };

  exports.hasAuthorization = function(roles) {
    var _this;
    _this = this;
    return function(req, res, next) {
      _this.requiresLogin(req, res, function() {
        if (_.intersection(req.user.roles, roles).length) {
          return next();
        } else {
          return res.status(403).send({
            message: 'User is not authorized'
          });
        }
      });
    };
  };

}).call(this);

//# sourceMappingURL=users.authorization.server.controller.js.map
