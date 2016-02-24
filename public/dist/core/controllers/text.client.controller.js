(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  angular.module('core').controller('TextController', [
    '$scope', '$http', '$stateParams', '$location', 'Authentication', '$document', "AlertService", 'WebApiService', 'TimelineService', 'DateService', function($scope, $http, $stateParams, $location, Authentication, $document, AlertService, WebApiService, TimelineService, DateService) {
      $scope.authentication = Authentication;
      $scope.text = '';
      $scope.getWordCounter = function() {
        if ($scope.text.trim()) {
          return $scope.text.trim().split(/\s+/).length;
        } else {
          return 0;
        }
      };
      $scope.changed = false;
      $scope.insertText = function(todayString) {
        if (todayString === DateService.getTodayString()) {
          return WebApiService.getToday().then(function(response) {
            $scope.text = response.data.text;
            $scope.state = 'saved';
            setInterval($scope.save, 10000);
          }, function(err) {});
        }
      };
      $scope.$watch("text", function(newVal, oldVal) {
        $scope.changed = newVal !== oldVal;
        if ($scope.changed) {
          $scope.state = 'notsaved';
          TimelineService.setCounterValue(DateService.getToday(), $scope.getWordCounter());
        }
      });
      $scope.historyText = '';
      $scope.state = 'saved';
      $scope.saveByKeys = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($scope.changed && $scope.text !== '') {
          $scope.state = 'saving';
          WebApiService.postText($scope.text).then(function(data) {
            if (data.data.message) {
              AlertService.send("danger", data.data.message, 3000);
            } else {
              AlertService.send("success", "Продолжайте!", "Сохранение прошло успешно!", 2000);
              $scope.state = 'saved';
              return $scope.changed = false;
            }
          }, function(err) {
            return AlertService.send("danger", "Упс!", err, 4000);
          });
        } else {
          AlertService.send("success", "Продолжайте!", "Ничего не изменилось с прошлого сохранения!", 2000);
        }
        return false;
      };
      $scope.save = function() {
        if ($scope.changed && $scope.text !== '') {
          $scope.state = 'saving';
          return WebApiService.postText($scope.text).then(function(data) {
            if (data.data.message) {
              AlertService.send("danger", data.message, 3000);
            } else {
              $scope.state = 'saved';
              return $scope.changed = false;
            }
          }, function(err) {
            return AlertService.send("danger", "Упс!", err, 4000);
          });
        }
      };
      $scope.showText = function(date) {
        if ($scope.current_date.setHours(0, 0, 0, 0) > (new Date($scope.curMonth + '-' + date)).setHours(0, 0, 0, 0)) {
          date = date + '';
          date = date.length === 2 ? date : '0' + date;
          $scope.hideToday = true;
          $scope.curDate = new Date($scope.curMonth + '-' + date);
          $http.get('/text/' + $scope.curMonth + '-' + date).success(function(data, status, headers) {
            $scope.historyText = data.text;
          });
        } else if ($scope.current_date.setHours(0, 0, 0, 0) === (new Date($scope.curMonth + '-' + date)).setHours(0, 0, 0, 0)) {
          $scope.hideToday = false;
          $scope.historyText = '';
          $scope.curDate = $scope.current_date;
        } else {
          AlertService.send("info", "Машину времени пока изобретаем", "Давайте жить сегодняшним днем!", 3000);
          return;
        }
      };
    }
  ]);

}).call(this);

},{}]},{},[1])