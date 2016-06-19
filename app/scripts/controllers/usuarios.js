'use strict';

angular.module('rac')
  .controller('UsuariosCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	
  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.msjerror = ""; 

		$scope.CrearUsuario = function () {
			
		var data = {
 			"usuario_exec":"superrac",
 			"rol_exec":"super_admin",
 			"usuario": $scope.usuario,
 			"tipo_usuario": $scope.tipo,
 			"contrasenia": $scope.contrasenia,
 			"mail" : $scope.mail,
 			"telefono": $scope.telefono
 		}
    	$http.post('http://192.168.1.108:5000/usuarios/crear_usuario', data, config)
    		.success(function (data, status, headers, config) {
        })
    }

	$scope.listarUsuarios = function () {

    	$http.post(perfilService.getRuta()+'/usuarios/listar_usuarios', 
    				perfilService.getData(),perfilService.getConfig())
    		.success(function (data, status, headers, config) {    			
				$scope.datos = data.info;
				return false;
       	})
    	.error(function (data, status, header, config) {          
          $scope.msjerror = "No se pudo cargar la lista de usuarios";          
          return false;
      })
    }
    $scope.listarUsuarios();

  	$scope.crearUsuario = function () {
		usuarioService.setUsuario(undefined);		
		usuarioService.setModo("crear");
		$location.path('/dashboard/usuarios-edit');
		return "/dashboard/usuarios-edit";
    }
    $scope.editarUsuario = function (usuario) {
		usuarioService.setUsuario(usuario);				
		usuarioService.setModo("editar");		
		$location.path('/dashboard/usuarios-edit');
		return "/dashboard/usuarios-edit";
    }
  
    $scope.eliminarUsuario = function (usuario) {
		usuarioService.setUsuario(undefined);		
		//funcion para eliminar usuario
		$scope.listarUsuarios();		
		return false;
    }
    $scope.desbloquearUsuario = function (usuario) {
		usuarioService.setUsuario(undefined);		
		//funcion de desbloquear
		$scope.listarUsuarios();		
		return false;
    }
    $scope.generarUsuario = function () {
		usuarioService.setUsuario(undefined);		
		if(usuarioService.getModo()==="crear"){
			//funcion crear
			//Hay que usar $scope.usuario_seleccionado
		}else{
			//funcion editar
			//Hay que usar $scope.usuario_seleccionado
		}		
		$scope.listarUsuarios();
		$location.path('/dashboard/usuarios');
		return "'/dashboard/usuarios'";
    }
});