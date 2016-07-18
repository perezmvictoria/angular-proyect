'use strict';

angular.module('rac')
  .controller('DashboardCtrl', function(perfilService,usuarioService,$scope, $location,$state) {

	$scope.$state = $state;
	$scope.usuario =  perfilService.getUsuario();

    $scope.editarPerfil = function () {
		usuarioService.setUsuario(perfilService.getUsuario());				
		usuarioService.setModoEditar(true);		
		$location.path('/dashboard/perfil-editar');
		return "/dashboard/perfil-editar";
    }

 	$scope.logout = function () {
 		$location.path('/login.html');
		return "/login.html";
 	}
  });
