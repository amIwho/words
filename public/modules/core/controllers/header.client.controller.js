"use strict";
angular.module("core").controller("HeaderController", [
  "$scope", "Authentication", "Menus", function($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu("topbar");
    $scope.toggleCollapsibleMenu = function() {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    return $scope.$on("$stateChangeSuccess", function() {
      $scope.isCollapsed = false;
    });
  }
]);
