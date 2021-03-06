angular
  .module('core')
  .factory "TimelineService", ['WebApiService', 'DateService', '$locale', (WebApiService, DateService, $locale) ->
    new class TimelineService
      workingMonth: ''
      workingDate: ''
      timeline: []
      monthLocaleString: ''
      constructor: ->
        @workingMonth = DateService.getTodayMonthString()
        @workingDate = DateService.getTodayString()
        @monthLocaleString = @getMonthLocaleString()
      fetchTimeline: () ->
        WebApiService.fetchTimeline @workingMonth, (days) =>
          angular.copy(days, @timeline)
      setCounterValue: (date, value) ->
        if date.yyyymm() is @workingMonth
          @timeline[date.getDate()-1] = value
      setWorkingMonth: (monthString) ->
        @workingMonth = monthString
        @updateMonthLocaleString()
      getWorkingMonth: () ->
        @workingMonth
      setWorkingDate: (dateString) ->
        @workingDate = dateString
      getWorkingDate: () ->
        @workingDate
      prevmonth: () ->
        @workingMonth = DateService.prevMonthString(new Date(@workingMonth))
        @monthLocaleString = @getMonthLocaleString()
      nextmonth: () ->
        @workingMonth = DateService.nextMonthString(new Date(@workingMonth))
        @monthLocaleString = @getMonthLocaleString()
      workingMonthIsLessThenCurrentMonth: () ->
        Date.parse(new Date @workingMonth) < Date.parse(DateService.getTodayMonthString())
      getMonthLocaleString: ->
        $locale.DATETIME_FORMATS.STANDALONEMONTH[+@workingMonth[5..6]-1] + ' ' + @workingMonth[0..3]
  ]
