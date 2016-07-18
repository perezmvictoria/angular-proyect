'use strict';

angular.module('rac')
  .controller('UsuariosEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	perfilService.validarSesion($location);
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

    if (!usuarioService.isModoEditar()) {
    	$scope.dataTipoUsuario = {
    	opciones: [],
    	seleccionada: {}
    	};
    	$scope.dataTipoUsuario.opciones = perfilService.getRolesUsuario();    	
    	}
    else
    {
		//editar usuario

		// este pedazo de codigo debería estar al pedo ... fernando eliminarlo en breve !!!!
		/*var tipo = ""
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
		}*/
		// -- fin de pedazo de codigo al pedo !!!

		$scope.dataTipoUsuario = {
    	opciones: [],
    	seleccionada: {}
    	};
    	$scope.dataTipoUsuario.opciones = perfilService.getRolesUsuario();    	
    	$scope.dataTipoUsuario.seleccionada = {'name': $scope.usuario_seleccionado.tipo_usuario};
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

		var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": $scope.dataTipoUsuario.seleccionada.value,	 			
	 			"mail":$scope.usuario_seleccionado.mail,
	 			"telefono":$scope.usuario_seleccionado.telefono
				}
		if(!usuarioService.isModoEditar()){
			data.contrasenia = $scope.usuario_seleccionado.contrasenia;
			
			$http.post(perfilService.getRuta()+'/usuarios/crear_usuario', data, perfilService.getConfig())
				.success(function (data, status, headers, config) {

	    		});
	    		//NO OLVIDAR .error			
		}else
		{
			var retorno = "";
			for (var i = 0, len = $scope.dataTipoUsuario.opciones.length; i < len; i++) {
 				if ($scope.dataTipoUsuario.opciones[i].name == $scope.dataTipoUsuario.seleccionada.name)
 				{
					retorno = $scope.dataTipoUsuario.opciones[i].value;			
 				}
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