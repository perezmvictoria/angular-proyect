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

<<<<<<< HEAD
     $scope.cambiarContrasenia = function () {
		usuarioService.setUsuario(perfilService.getUsuario());
		$location.path('/dashboard/perfil-contrasenia');
		return "/dashboard/perfil-contrasenia";
    }

=======
    // Cerrar sesion
>>>>>>> 09515a4f89ba0dde4b05e1f0eb5aed0ca64c5d97
 	$scope.logout = function () {
 		perfilService.setUsuario({});
 		$location.path('/login.html');
		return "/login.html";
 	}
  });
