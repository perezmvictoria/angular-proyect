'use strict';

angular.module('rac')
  .controller('UsuariosListarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  $scope.msjerror = "";
  $scope.usuario_seleccionado = usuarioService.getUsuario();
  $scope.nombreUsuario = perfilService.getUsuario().nombre;
  $scope.rolUsuario    = perfilService.getUsuario().rol;

	$scope.listarUsuarios = function () {
      var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      } 
    	$http.post(perfilService.getRuta()+'/usuarios/listar_usuarios', 
    				dataPost,perfilService.getConfig())
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
      usuario.contrasenia = '123456';
      usuario.contrasenia2 = '123456';
      usuarioService.setUsuario(usuario);
  		usuarioService.setModoEditar(true);

  		$location.path('/dashboard/usuarios-editar');
  		return "/dashboard/usuarios-editar";
    }  
    $scope.eliminarUsuario = function (usuario) {
      usuarioService.setUsuario(usuario);
      console.log(usuario.usuario);
      var dataPost = {
        "usuario":usuario.usuario,
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      }
      $http.post(perfilService.getRuta()+'/usuarios/eliminar_usuario', 
            dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
        $scope.datos = data.info;        
        return false;
        })
      .error(function (data, status, header, config) {          
          $scope.msjerror = "Error de conexion al servidor";          
          return false;
      })
  		$scope.listarUsuarios();
      return false;
    }
    $scope.desbloquearUsuario = function (usuario) {
  		usuarioService.setUsuario(usuario);
      $scope.usuario_seleccionado = usuario;   
      var dataPost = {
        "usuario":$scope.usuario_seleccionado.usuario,
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      }   
      $http.post(perfilService.getRuta()+'/usuarios/desbloquear_usuario', 
            dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
        $scope.datos = data.info;        
        return false;
        })
      .error(function (data, status, header, config) {          
          $scope.msjerror = "Error de conexion al servidor";          
          return false;
      })
  		$scope.listarUsuarios();		
  		return false;
    }
});