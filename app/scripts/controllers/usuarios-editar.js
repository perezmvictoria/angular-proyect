'use strict';

angular.module('rac')
  .controller('UsuariosEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http,md5) {  	
  	
  	// Validacion de sesion
  	perfilService.validarSesion($location);

  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.noverpasswd = false;
    $scope.msjerror = "Ups! Ha ocurrido un error";


    if (!usuarioService.isModoEditar()) {

    	// Crear usuario 

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

	$scope.verpasswd = function(){
      $scope.noverpasswd != $scope.noverpasswd;
    } 
    
	$scope.verpasswd_tipo = function(){
      if ($scope.noverpasswd){
        return "text";
      }else{
        return "password";
      }
    }

    // Para ejecutar al hacer foco en el combo de tipo de usuario
    $scope.onFocusTipoUsuarios = function(){

    	$scope.dataTipoUsuario.opciones = perfilService.getRolesUsuario();    	

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
		
		// obtengo id del tipo de usuario
		var retorno = "";
		for (var i = 0, len = $scope.dataTipoUsuario.opciones.length; i < len; i++) {
			if ($scope.dataTipoUsuario.opciones[i].name == $scope.dataTipoUsuario.seleccionada.name)
			{
			retorno = $scope.dataTipoUsuario.opciones[i].value;			
			}
		}

		if(!usuarioService.isModoEditar()){

			// Crear usuario
			var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": retorno,
	 			"contrasenia": md5.createHash($scope.usuario_seleccionado.contrasenia),
				"mail":$scope.usuario_seleccionado.mail,
	 			"telefono":$scope.usuario_seleccionado.telefono
			}			
			$http.post(perfilService.getRuta()+'/usuarios/crear_usuario', data, perfilService.getConfig())
				.success(function (data, status, headers, config) {
	    		}).error(function(data) {
	    			   	$scope.msjerror=data.error;
	    			   	$scope.msjerror= $scope.msjerror.split(":").pop();
						alert($scope.msjerror);
				});
		}
		else
		{
			// editar usuario

			var data = {
	 			"usuario_exec":$scope.nombreUsuario,
	 			"rol_exec":$scope.rolUsuario,
	 			"nombre":$scope.usuario_seleccionado.nombre,
	 			"usuario":$scope.usuario_seleccionado.usuario,
	 			"tipo_usuario": retorno,	
				"mail":$scope.usuario_seleccionado.mail,
	 			"telefono":$scope.usuario_seleccionado.telefono
			}

			$http.post(perfilService.getRuta()+'/usuarios/editar_usuario', data, perfilService.getConfig())
				.success(function (data, status, headers, config) {
	    		}).error(function(data) {
						$scope.msjerror=data.error;
	    			   	$scope.msjerror= $scope.msjerror.split(":").pop();
						alert($scope.msjerror);
				});
		}		
			$location.path('/dashboard/usuarios-listar');
			return "'/dashboard/usuarios-listar'";

	}
});