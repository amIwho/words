(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  'use strict';
  angular.module('core').directive('sooText', [
    'TimelineService', 'AlertService', 'DateService', function(TimelineService, AlertService, DateService) {
      return {
        templateUrl: 'modules/core/views/text.client.view.html',
        restrict: 'E',
        controller: 'TextController',
        scope: {
          textDate: '='
        },
        link: function(s, e, a) {
          s.insertText(DateService.getTodayString());
        }
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=text.client.directive.js.map

},{}]},{},[1])