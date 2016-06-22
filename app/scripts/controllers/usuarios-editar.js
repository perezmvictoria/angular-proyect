'use strict';

angular.module('rac')
  .controller('UsuariosEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

	$scope.lstUsuario = [
	  { 'id': '1', 'nombre': 'Admin' },
	  { 'id': '2', 'nombre': 'Auditor' },
	  { 'id': '3', 'nombre': 'Operador' },
	  { 'id': '4', 'nombre': 'Técnico' }
	];

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

        		});
        		//NO OLVIDAR .error			
		}else{
			//funcion editar
			//Hay que usar $scope.usuario_seleccionado
		}		
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
    }
});