'use strict';

angular.module('rac')
  .controller('UsuariosContraseniaCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	
  	perfilService.validarSesion($location);
  	
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
  
	$scope.cancelar = function(){
		usuarioService.setUsuario(undefined);
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
	}
	
	$scope.cambiarContrasenia = function () {

		var data = {
			"usuario_exec": $scope.nombreUsuario,
			"rol_exec": $scope.rolUsuario,
			"usuario": $scope.usuario_seleccionado.nombre,
			"contrasenia": $scope.usuario_seleccionado.contrasenia
		}			

		$http.post(perfilService.getRuta()+'/usuarios/cambiar_contrasenia_usuario', data, perfilService.getConfig())
			.success(function (data, status, headers, config) {

	  		});
	   		// TODO: .error	
		
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
	}
});