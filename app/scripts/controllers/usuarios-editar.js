'use strict';

angular.module('rac')
  .controller('UsuariosEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	//debugger;
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = "hola";
    $scope.nombreUsuario = perfilService.getNombreUsuario();
    $scope.rolUsuario = perfilService.getRolUsuario();

	$scope.generarUsuario = function () {
		usuarioService.setUsuario(undefined);
		if(usuarioService.getModo()==="crear"){
			//funcion crear
			var data = {
 			"usuario_exec":$scope.nombreUsuario,
 			"rol_exec":$scope.rolUsuario,
 			"usuario": $scope.usuario,
 			"tipo_usuario": $scope.tipo,
 			"contrasenia": $scope.contrasenia,
 			"mail" : $scope.mail,
 			"telefono": $scope.telefono
 			}
    		$http.post(perfilService.getRuta()+'/usuarios/crear_usuario', data, perfilService.getConfig())
    			.success(function (data, status, headers, config) {
        	})
			//Hay que usar $scope.usuario_seleccionado
		}else{
			//funcion editar
			//Hay que usar $scope.usuario_seleccionado
		}		
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
    }
});