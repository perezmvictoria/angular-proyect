'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 */
angular.module('rac')
  .controller('DashboardCtrl', function($scope, $state) {

	$scope.user_name = "Fernando Peralta";
    $scope.$state = $state;

  });
