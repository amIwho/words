(function() {
  "use strict";

  /**
  Module dependencies.
   */
  var Article, errorHandler, mongoose, _;

  mongoose = require("mongoose");

  errorHandler = require("./errors.server.controller");

  Article = mongoose.model("Article");

  _ = require("lodash");


  /**
  Create a article
   */

  exports.update = function(req, res) {
    var today_end, today_start;
    today_start = new Date();
    today_start.setHours(0, 0, 0, 0);
    today_end = new Date();
    today_end.setHours(23, 59, 59, 999);
    Article.update({
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
    Article.find({
      date: {
        $gte: today_start,
        $lt: today_end
      },
      user: req.user
    }, function(err, articles) {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(articles[0]);
      }
    });
  };


  /**
  Show the current article
   */

  exports.read = function(req, res) {
    var today_end, today_start;
    today_start = new Date();
    today_start.setHours(0, 0, 0, 0);
    today_end = new Date();
    today_end.setHours(23, 59, 59, 999);
    Article.find({
      date: {
        $gte: today_start,
        $lt: today_end
      },
      user: req.user
    }, function(err, articles) {
      if (err) {
        res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        console.log(articles);
        res.json(articles[0]);
      }
    });
  };

  exports.list = function(req, res) {
    res.jsonp(req.articles);
  };


  /**
  Article middleware
   */

  exports.articlesByMonth = function(req, res, next, id) {
    var first_day, last_day, m, today, y;
    today = new Date(id);
    y = today.getFullYear();
    m = today.getMonth();
    first_day = new Date(y, m, 1);
    last_day = new Date(y, m + 1, 0);
    first_day.setHours(0, 0, 0, 0);
    last_day.setHours(23, 59, 59, 999);
    console.log(first_day, last_day);
    Article.find({
      date: {
        $gte: first_day,
        $lt: last_day
      },
      user: req.user
    }, function(err, articles) {
      if (err) {
        return next(err);
      }
      if (!articles) {
        return next(new Error("Failed to load article " + id));
      }
      req.articles = articles;
      next();
    });
  };


  /**
  Article middleware
   */

  exports.articleByID = function(req, res, next, id) {
    Article.findById(id).populate("user", "displayName").exec(function(err, article) {
      if (err) {
        return next(err);
      }
      if (!article) {
        return next(new Error("Failed to load article " + id));
      }
      req.article = article;
      next();
    });
  };


  /**
  Article authorization middleware
   */

  exports.hasAuthorization = function(req, res, next) {
    if (req.article.user.id !== req.user.id) {
      return res.status(403).send({
        message: "User is not authorized"
      });
    }
    next();
  };

}).call(this);
