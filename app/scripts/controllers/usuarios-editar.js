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
    	seleccionada: {'name': 'tecnico'}
    	};
    	$scope.dataTipoUsuario.opciones = perfilService.getRolesUsuario();    	
    	}
    else
    {
		//editar usuario

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
		if(!usuarioService.isModoEditar()){

			var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": $scope.dataTipoUsuario.seleccionada.value,	
	 			"contrasenia": $scope.usuario_seleccionado.contrasenia;
				"mail":$scope.usuario_seleccionado.mail,
	 			"telefono":$scope.usuario_seleccionado.telefono
			}
			
			$http.post(perfilService.getRuta()+'/usuarios/crear_usuario', data, perfilService.getConfig())
				.success(function (data, status, headers, config) {

	    		});
	    		//NO OLVIDAR .error			
		}else
		{
			debugger;
			var retorno = "";
			for (var i = 0, len = $scope.dataTipoUsuario.opciones.length; i < len; i++) {
 				if ($scope.dataTipoUsuario.opciones[i].name == $scope.dataTipoUsuario.seleccionada.name)
 				{
					retorno = $scope.dataTipoUsuario.opciones[i].value;			
 				}
			}
			var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": $scope.dataTipoUsuario.seleccionada.value,	
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