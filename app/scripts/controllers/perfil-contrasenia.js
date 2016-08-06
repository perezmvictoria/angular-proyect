'use strict';

angular.module('rac')
  .controller('PerfilContraseniaCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

	$scope.cancelar = function(){
		$location.path('/dashboard');
		return "'/dashboard'";
	}	
	//TODO:esto es copia de perfil-editar, hay que limpiar para cambiar contrasenia
	$scope.guardarContrasenia = function () {
		var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.nombreUsuario,
	 			"contrasenia":$scope.usuario_seleccionado.contrasenia
				}			
			$http.post(perfilService.getRuta()+'/perfil/', data, perfilService.getConfig())
				.success(function (data, status, headers, config) {

	    		});
	    		//NO OLVIDAR .error	
		$location.path('/dashboard');
		return "'/dashboard'";
	}
});