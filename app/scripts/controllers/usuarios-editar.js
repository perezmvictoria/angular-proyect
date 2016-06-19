'use strict';

angular.module('rac')
  .controller('UsuariosEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	//debugger;
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.modoEditar = function(){
    	return usuarioService.isModoEditar();
    }

	$scope.cancelar = function(){
		usuarioService.setUsuario(undefined);
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
	}
	
	$scope.generarUsuario = function () {
		usuarioService.setUsuario(undefined);		
		if(usuarioService.isModoEditar()){
			//funcion crear
			var data = {
	 			"usuario_exec":"superrac",
	 			"rol_exec":"super_admin",
	 			"usuario": $scope.usuario,
	 			"tipo_usuario": $scope.tipo,
	 			"contrasenia": $scope.contrasenia,
	 			"mail" : $scope.mail,
	 			"telefono": $scope.telefono
 			}
    		$http.post(perfilService.getRuta()+'/usuarios/crear_usuario', data, config)
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