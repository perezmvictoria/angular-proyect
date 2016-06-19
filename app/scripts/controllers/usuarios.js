'use strict';

angular.module('rac')
  .controller('UsuariosCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	
  	$scope.usuario_seleccionado = usuarioService.getUsuario();


	$scope.listarUsuarios = function () {

    	$http.post(perfilService.ruta(),'/usuarios/listar_usuarios', 
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
