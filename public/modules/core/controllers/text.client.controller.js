// Generated by CoffeeScript 1.10.0
(function() {
  'use strict';
  angular.module('core').controller('TextController', [
    '$scope', '$http', '$stateParams', '$location', 'AuthService', '$document', "AlertService", 'WebApiService', 'TimelineService', 'DateService', function($scope, $http, $stateParams, $location, AuthService, $document, AlertService, WebApiService, TimelineService, DateService) {
      $scope.user = AuthService.getUser();
      $scope.history = {};
      $scope.todayDateString = DateService.getTodayString();
      $scope.getWordCounter = function() {
        if ($scope.text && $scope.text.trim()) {
          return $scope.text.trim().split(/[\s,.;]+/).length;
        } else {
          return 0;
        }
      };
      $scope.changed = false;
      $scope.$watch("text", function(newVal, oldVal) {
        $scope.changed = newVal !== oldVal && oldVal !== void 0;
        if ($scope.changed) {
          $scope.state = 'notsaved';
          TimelineService.setCounterValue(DateService.getToday(), $scope.getWordCounter());
        }
      });
      $scope.insertText = function() {
        return WebApiService.getToday().then(function(response) {
          $scope.text = response.data.text;
          $scope.state = 'saved';
          return setInterval($scope.save, 10000);
        }, function(err) {});
      };
      $scope.historyText = '';
      $scope.state = 'saved';
      $scope.saveByKeys = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($scope.changed && $scope.text !== void 0) {
          $scope.state = 'saving';
          WebApiService.postText($scope.text).then(function(data) {
            if (data.data.message) {
              AlertService.send("danger", data.data.message, 3000);
              $scope.state = 'notsaved';
            } else {
              AlertService.send("success", "Продолжайте!", "Сохранение прошло успешно!", 2000);
              $scope.state = 'saved';
              return $scope.changed = false;
            }
          }, function(err) {
            AlertService.send("danger", "Упс!", err, 4000);
            return $scope.state = 'notsaved';
          });
        } else {
          AlertService.send("success", "Продолжайте!", "Ничего не изменилось с прошлого сохранения!", 2000);
        }
        return false;
      };
      $scope.putTab = function(e) {
        var end, start;
        e.preventDefault();
        start = e.target.selectionStart;
        end = e.target.selectionEnd;
        $scope.text = $scope.text.substring(0, start) + '\t' + $scope.text.substring(end);
        angular.element(e.target).val($scope.text);
        return e.target.selectionStart = e.target.selectionEnd = start + 1;
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
      $scope.$watch(function() {
        return TimelineService.workingDate;
      }, function(value, oldval) {
        if (value !== $scope.todayDateString) {
          return WebApiService.getText(value).then(function(response) {
            $scope.history.text = response.data.text;
            return $scope.history.date = value;
          }, function(err) {});
        } else {
          return $scope.history = {};
        }
      });
    }
  ]);

}).call(this);
