// Generated by CoffeeScript 1.9.3
(function() {
  angular.module('core').controller('TimelineController', [
    '$scope', 'TimelineService', 'Authentication', function($scope, TimelineService, Authentication) {
      $scope.timeline = {};
      TimelineService.fetchTimeline().then(function() {
        $scope.timeline.days = TimelineService.timeline;
        return $scope.timeline.languageMonth = TimelineService.monthLocaleString;
      });
      $scope.timeline_button_class = function(counter, day) {
        var result;
        result = '';
        if (counter === '--') {
          result = 'btn-default';
        }
        if (counter === 0) {
          result = 'btn-info';
        }
        if (counter >= 500) {
          result = 'btn-danger';
        }
        if (counter > 0 && counter < 500) {
          result = 'btn-success';
        }
        if (TimelineService.getWorkingDate() === $scope.get_date_string(day)) {
          result += ' active';
        }
        return result;
      };
      $scope.show_next_month = function() {
        return TimelineService.workingMonthIsLessThenCurrentMonth();
      };
      $scope.get_date_string = function(day) {
        day = day.toString();
        return TimelineService.getWorkingMonth() + '-' + (day.length === 2 ? day : "0" + day);
      };
      $scope.changeMonth = function(direction) {
        switch (direction) {
          case 'prev':
            TimelineService.prevmonth();
            break;
          case 'next':
            TimelineService.nextmonth();
        }
        return TimelineService.fetchTimeline().then(function() {
          $scope.timeline.days = TimelineService.timeline;
          return $scope.timeline.languageMonth = TimelineService.monthLocaleString;
        });
      };
      return $scope.goToHistory = function(dateString) {
        return TimelineService.setWorkingDate(dateString);
      };
    }
  ]);

}).call(this);

//# sourceMappingURL=timeline.client.controller.js.map
