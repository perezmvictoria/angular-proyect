'use strict';

angular.module('rac')
  .controller('DashboardCtrl', function(perfilService,usuarioService,$scope, $location,$state) {
	perfilService.validarSesion($location);
	$scope.$state = $state;
	$scope.usuario =  perfilService.getUsuario();

    $scope.editarPerfil = function () {
		usuarioService.setUsuario(perfilService.getUsuario());				
		//usuarioService.setModoEditar(true);		
		$location.path('/dashboard/perfil-editar');
		return "/dashboard/perfil-editar";
    }

    // Cerrar sesion
 	$scope.logout = function () {
 		perfilService.setUsuario({});
 		$location.path('/login.html');
		return "/login.html";
 	}
  });
