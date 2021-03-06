// Generated by CoffeeScript 1.9.3
(function() {
  angular.module('core').factory("TimelineService", [
    'WebApiService', 'DateService', '$locale', function(WebApiService, DateService, $locale) {
      var TimelineService;
      return new (TimelineService = (function() {
        TimelineService.prototype.workingMonth = '';

        TimelineService.prototype.workingDate = '';

        TimelineService.prototype.timeline = [];

        TimelineService.prototype.monthLocaleString = '';

        function TimelineService() {
          this.workingMonth = DateService.getTodayMonthString();
          this.workingDate = DateService.getTodayString();
          this.monthLocaleString = this.getMonthLocaleString();
        }

        TimelineService.prototype.fetchTimeline = function() {
          return WebApiService.fetchTimeline(this.workingMonth, (function(_this) {
            return function(days) {
              return angular.copy(days, _this.timeline);
            };
          })(this));
        };

        TimelineService.prototype.setCounterValue = function(date, value) {
          if (date.yyyymm() === this.workingMonth) {
            return this.timeline[date.getDate() - 1] = value;
          }
        };

        TimelineService.prototype.setWorkingMonth = function(monthString) {
          this.workingMonth = monthString;
          return this.updateMonthLocaleString();
        };

        TimelineService.prototype.getWorkingMonth = function() {
          return this.workingMonth;
        };

        TimelineService.prototype.setWorkingDate = function(dateString) {
          return this.workingDate = dateString;
        };

        TimelineService.prototype.getWorkingDate = function() {
          return this.workingDate;
        };

        TimelineService.prototype.prevmonth = function() {
          this.workingMonth = DateService.prevMonthString(new Date(this.workingMonth));
          return this.monthLocaleString = this.getMonthLocaleString();
        };

        TimelineService.prototype.nextmonth = function() {
          this.workingMonth = DateService.nextMonthString(new Date(this.workingMonth));
          return this.monthLocaleString = this.getMonthLocaleString();
        };

        TimelineService.prototype.workingMonthIsLessThenCurrentMonth = function() {
          return Date.parse(new Date(this.workingMonth)) < Date.parse(DateService.getTodayMonthString());
        };

        TimelineService.prototype.getMonthLocaleString = function() {
          return $locale.DATETIME_FORMATS.STANDALONEMONTH[+this.workingMonth.slice(5, 7) - 1] + ' ' + this.workingMonth.slice(0, 4);
        };

        return TimelineService;

      })());
    }
  ]);

}).call(this);

//# sourceMappingURL=timeline.client.service.js.map
