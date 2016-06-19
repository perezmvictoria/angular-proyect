'use strict';

angular.module('rac')
  .controller('UsuariosListarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	
  $scope.msjerror = "";
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
		usuarioService.setModoEditar(false);
		$location.path('/dashboard/usuarios-editar');
		return "/dashboard/usuarios-editar";
    }
    $scope.editarUsuario = function (usuario) {
		usuarioService.setUsuario(usuario);				
		usuarioService.setModoEditar(true);		
		$location.path('/dashboard/usuarios-editar');
		return "/dashboard/usuarios-editar";
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
});