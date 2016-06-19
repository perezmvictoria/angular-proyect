'use strict';

angular.module('rac')
  .controller('DashboardCtrl', function(perfilService,usuarioService,$scope, $location,$state) {

	$scope.$state = $state;
	$scope.usuario =  perfilService.getUsuario();

    $scope.editarPerfil = function () {
		usuarioService.setUsuario(perfilService.getUsuario());				
		usuarioService.setModo("editar");		
		$location.path('/dashboard/usuarios-editar');
		return "/dashboard/usuarios-editar";
    }

 	$scope.logout = function () {
 		$location.path('/login.html');
		return "/login.html";
 	}
  });
