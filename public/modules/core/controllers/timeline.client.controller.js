// Generated by CoffeeScript 1.10.0
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
