(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.9.3
(function() {
  angular.module('core').controller('TimelineController', [
    '$scope', 'TimelineService', '$stateParams', function($scope, TimelineService, $stateParams) {
      if ($stateParams.date) {
        TimelineService.setWorkingMonth($stateParams.date);
      }
      $scope.languageMonth = TimelineService.monthLocaleString;
      TimelineService.fetchTimeline(TimelineService.workingMonth);
      $scope.days = TimelineService.timeline;
      $scope.timeline_button_class = function(counter) {
        if (counter === '--') {
          return 'btn-default';
        }
        if (counter === 0) {
          return 'btn-info';
        }
        if (counter > 500) {
          return 'btn-danger';
        }
        if (counter > 0) {
          return 'btn-success';
        }
      };
      $scope.prevmonth = TimelineService.prevMonthString();
      if (TimelineService.workingMonthIsLessThenCurrentMonth()) {
        return $scope.nextmonth = TimelineService.nextMonthString();
      }
    }
  ]);

}).call(this);

//# sourceMappingURL=timeline.client.controller.js.map

},{}]},{},[1])