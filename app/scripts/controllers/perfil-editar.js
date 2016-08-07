'use strict';

angular.module('rac')
  .controller('PerfilEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	
    perfilService.validarSesion($location);

  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

	$scope.cancelar = function(){
		$location.path('/dashboard');
		return "'/dashboard'";
	}	
	$scope.guardarPerfil = function () {
		var data = {
	 		"usuario_exec":$scope.nombreUsuario,
 			"rol_exec":$scope.rolUsuario,
 			"nombre":$scope.usuario_seleccionado.nombre,
 			"usuario":$scope.nombreUsuario,
 			"mail":$scope.usuario_seleccionado.mail,
 			"telefono":$scope.usuario_seleccionado.telefono
		}			
		$http.post(perfilService.getRuta()+'/perfil/editar_perfil', data, perfilService.getConfig())
			.success(function (data, status, headers, config) {

	    	});
	    	// TODO: .error	
	$location.path('/dashboard');
	return "'/dashboard'";
	
	}
});