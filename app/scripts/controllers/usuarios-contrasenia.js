/*
Controller usuarios-contrasenia
*/

'use strict';

angular.module('rac')
  .controller('UsuariosContraseniaCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	
  	// Validacion de sesion
  	perfilService.validarSesion($location);
  	
  	// Variables
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
  
	$scope.cancelar = function(){

		// Limpio usuario seleccionado
		usuarioService.setUsuario(undefined);

		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";

	}
	
	$scope.cambiarContrasenia = function () {

		var data = {
			"usuario_exec": $scope.nombreUsuario,
			"rol_exec": $scope.rolUsuario,
			"usuario": $scope.usuario_seleccionado.usuario,
			"contrasenia": $scope.usuario_seleccionado.contrasenia
		}			

		$http.post(perfilService.getRuta()+'/usuarios/cambiar_contrasenia_usuario', 
			data, perfilService.getConfig())
			.success(function (data, status, headers, config) {

	  		});
		
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
	}
});