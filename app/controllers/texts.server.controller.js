// Generated by CoffeeScript 1.9.3
(function() {
  "use strict";

  /**
  Module dependencies.
   */
  var Text, _, errorHandler, mongoose;

  mongoose = require("mongoose");

  errorHandler = require("./errors.server.controller");

  Text = mongoose.model("Text");

  _ = require("lodash");


  /**
  Upsert
   */

  exports.upsert = function(req, res) {
    var text_date, today, today_end, today_start;
    today = (new Date()).setHours(0, 0, 0, 0);
    if (req.body.date === void 0) {
      text_date = today;
    } else {
      text_date = (new Date(req.body.date)).setHours(0, 0, 0, 0);
    }
    if (text_date === today) {
      today_start = new Date(text_date);
      today_start.setHours(0, 0, 0, 0);
      today_end = new Date(text_date);
      today_end.setHours(23, 59, 59, 999);
      Text.update({
        date: {
          $gte: today_start,
          $lt: today_end
        },
        user: req.user
      }, {
        $set: {
          text: req.body.text,
          counter: req.body.counter,
          date: today_start
        }
      }, {
        upsert: true
      }, function() {});
      Text.find({
        date: {
          $gte: today_start,
          $lt: today_end
        },
        user: req.user
      }, function(err, texts) {
        if (err) {
          return res.status(400).send({
            message: errorHandler.getErrorMessage(err)
          });
        } else {
          return res.json(texts[0]);
        }
      });
    } else {
      res.send({
        message: 'День прошел, перезагрузите, пожалуйста, страницу'
      });
    }
  };


  /**
  Show the current article
   */

  exports.today = function(req, res) {
    var today_end, today_start;
    today_start = new Date();
    today_start.setHours(0, 0, 0, 0);
    today_end = new Date();
    today_end.setHours(23, 59, 59, 999);
    Text.find({
      date: {
        $gte: today_start,
        $lt: today_end
      },
      user: req.user
    }, function(err, texts) {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(texts[0]);
      }
    });
  };

  exports.list = function(req, res) {
    res.jsonp(req.texts);
  };


  /**
  Text middleware
   */

  exports.textsByMonth = function(req, res, next, id) {
    var first_day, last_day, m, today, y;
    today = new Date(id);
    y = today.getFullYear();
    m = today.getMonth();
    console.log(y, m);
    first_day = new Date(y, m, 1);
    last_day = new Date(y, m + 1, 0);
    first_day.setHours(0, 0, 0, 0);
    last_day.setHours(23, 59, 59, 999);
    Text.find({
      date: {
        $gte: first_day,
        $lt: last_day
      },
      user: req.user
    }, 'date counter', function(err, texts) {
      if (err) {
        return next(err);
      }
      if (!texts) {
        return next(new Error("Failed to load article " + id));
      }
      req.texts = texts;
      next();
    });
  };


  /**
  Text middleware
   */

  exports.textByDate = function(req, res, next, id) {
    var day_end, day_start;
    day_start = new Date(id);
    day_end = new Date(id);
    day_start.setHours(0, 0, 0, 0);
    day_end.setHours(23, 59, 59, 999);
    Text.find({
      date: {
        $gte: day_start,
        $lt: day_end
      },
      user: req.user
    }, function(err, texts) {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        req.text = texts[0];
        next();
      }
    });
  };

  exports.readOne = function(req, res) {
    res.jsonp(req.text);
  };


  /**
  Text authorization middleware
   */

  exports.hasAuthorization = function(req, res, next) {
    if (req.texts && req.texts.user) {
      if (req.texts.user.id !== req.user.id) {
        return res.status(403).send({
          message: "User is not authorized"
        });
      }
    }
    next();
  };

}).call(this);