// Generated by CoffeeScript 1.9.3
'use strict';
angular.module('core').factory("AlertService", [
  "$timeout", "$rootScope", function($timeout, $rootScope) {
    var AlertService;
    AlertService = {};
    $rootScope.alerts = [];
    AlertService.send = function(type, title, msg, timeout) {
      $rootScope.alerts.push({
        type: type,
        title: title,
        msg: msg,
        close: function() {
          return AlertService.closeAlert(this);
        }
      });
      if (typeof timeout === "undefined") {
        timeout = 7000;
      }
      if (timeout) {
        $timeout(function() {
          AlertService.closeAlert(this);
        }, timeout);
      }
    };
    AlertService.closeAlert = function(alert) {
      return this.closeAlertIdx($rootScope.alerts.indexOf(alert));
    };
    AlertService.closeAlertIdx = function(index) {
      return $rootScope.alerts.splice(index, 1);
    };
    return AlertService;
  }
]);
