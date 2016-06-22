'use strict';

angular.module('rac')
  .controller('UsuariosEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.editar = usuarioService.isModoEditar();
    
    $scope.modoEditar = function(){
    	return usuarioService.isModoEditar();
    }

	$scope.cancelar = function(){
		usuarioService.setUsuario(undefined);		
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
	}
	
	$scope.generarUsuario = function () {
		//la unica diferencia entre editar y crear es la ruta del web service, el resto del codigo está duplicado.
		// hay que ver de limpiar el codigo
		if(!usuarioService.isModoEditar()){
			switch($scope.usuario_seleccionado.tipo){
				case "admin":
				$scope.usuario_seleccionado.tipo = "2";
				case "auditor":
				$scope.usuario_seleccionado.tipo = "3";
				case "operador":
				$scope.usuario_seleccionado.tipo = "5";
				case "tecnico":
				$scope.usuario_seleccionado.tipo = "4";
			};
			var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": $scope.usuario_seleccionado.tipo,
	 			"contrasenia":$scope.usuario_seleccionado.contrasenia,
	 			"mail":$scope.usuario_seleccionado.mail,
	 			"telefono":$scope.usuario_seleccionado.telefono
 			}
    		$http.post(perfilService.getRuta()+'/usuarios/crear_usuario', data, perfilService.getConfig())
    			.success(function (data, status, headers, config) {

        		});
        		//NO OLVIDAR .error			
		}else{
			//funcion editar
			switch($scope.usuario_seleccionado.tipo){
				case "admin":
				$scope.usuario_seleccionado.tipo = "2";
				case "auditor":
				$scope.usuario_seleccionado.tipo = "3";
				case "operador":
				$scope.usuario_seleccionado.tipo = "5";
				case "tecnico":
				$scope.usuario_seleccionado.tipo = "4";
			};

			var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": $scope.usuario_seleccionado.tipo,
	 			"contrasenia":$scope.usuario_seleccionado.contrasenia,
	 			"mail":$scope.usuario_seleccionado.mail,
	 			"telefono":$scope.usuario_seleccionado.telefono
 			}
    		$http.post(perfilService.getRuta()+'/usuarios/editar_usuario', data, perfilService.getConfig())
    			.success(function (data, status, headers, config) {

        		});
        		//falta el .error
		}		
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
    }
});