'use strict';

angular.module('rac')
  .controller('PerfilContraseniaCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.contrasenia = "";
    $scope.contrasenia2 = "";

	$scope.cancelar = function(){
		$location.path('/dashboard');
		return "'/dashboard'";
	}

	// TODO:
	$scope.guardarContrasenia = function () {
		var data = {
	 			"usuario_exec": $scope.nombreUsuario,
	 			"rol_exec": $scope.rolUsuario,
	 			"usuario": $scope.nombreUsuario,
	 			"contrasenia": $scope.contrasenia
			}			
			$http.post(perfilService.getRuta()+'/perfil/cambiar_contrasenia_perfil', data, perfilService.getConfig())
				.success(function (data, status, headers, config) {

	    		});
	    		// TODO: .error	
		$location.path('/dashboard');
		return "'/dashboard'";
	}
});