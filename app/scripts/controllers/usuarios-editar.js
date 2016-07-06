'use strict';

angular.module('rac')
  .controller('UsuariosEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

    if (!usuarioService.isModoEditar()) {
    	//crear usuario
    	$scope.dataTipoUsuario = {
    	opciones: [
	  		{ 'id': '2', 'nombre': 'Admin' },
	  		{ 'id': '3', 'nombre': 'Auditor' },
	  		{ 'id': '4', 'nombre': 'Técnico' },
	  		{ 'id': '5', 'nombre': 'Operador' }
    	],
    	seleccionada: { 'id': '4', 'nombre': 'Técnico' }
    	};
    	}
    else
    {
		//editar usuario
		//console.log($scope.usuario_seleccionado.tipo_usuario);
		var tipo = ""
		switch ($scope.usuario_seleccionado.tipo_usuario){
			case "admin":
				tipo = "2";
				break;
			case "auditor":
				tipo = "3";
				break;
			case "tecnico":
				tipo = "4";
				break;
			case "operador":
				tipo = "5";
				break;
		}
		$scope.dataTipoUsuario = {
    	opciones: [
	  		{ 'id': '2', 'nombre': 'Admin' },
	  		{ 'id': '3', 'nombre': 'Auditor' },
	  		{ 'id': '4', 'nombre': 'Técnico' },
	  		{ 'id': '5', 'nombre': 'Operador' }
    	],
    	seleccionada: { 'id': tipo }
    };
    }

	$scope.modoEditar = function(){
		return usuarioService.isModoEditar();
	}

	$scope.cancelar = function(){
		usuarioService.setUsuario(undefined);
		$location.path('/dashboard/usuarios-listar');
		return "'/dashboard/usuarios-listar'";
	}
	
	$scope.generarUsuario = function () {

		//$scope.usuario_seleccionado.tipo = JSON.parse($scope.usuario_seleccionado.tipo);

		if(!usuarioService.isModoEditar()){

			var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": $scope.dataTipoUsuario.seleccionada.id,
	 			"contrasenia":$scope.usuario_seleccionado.contrasenia,
	 			"mail":$scope.usuario_seleccionado.mail,
	 			"telefono":$scope.usuario_seleccionado.telefono
 			}
    		$http.post(perfilService.getRuta()+'/usuarios/crear_usuario', data, perfilService.getConfig())
    			.success(function (data, status, headers, config) {

        		});
        		//NO OLVIDAR .error			
		}else{
			var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": $scope.dataTipoUsuario.seleccionada.id,
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