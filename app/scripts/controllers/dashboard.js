'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 */
angular.module('rac')
  .controller('DashboardCtrl', function(perfilService,$scope, $state) {

	$scope.user_name = perfilService.getNombreUsuario();
    $scope.$state = $state;

  });
