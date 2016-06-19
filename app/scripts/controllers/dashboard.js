'use strict';

angular.module('rac')
  .controller('DashboardCtrl', function(perfilService,$scope, $state) {

	$scope.user_name = perfilService.getNombreUsuario();
    $scope.$state = $state;

  });
