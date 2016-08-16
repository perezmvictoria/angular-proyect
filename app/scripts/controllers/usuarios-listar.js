/*
Controller usuarios-listar
*/
'use strict';

angular.module('rac')
  .controller('UsuariosListarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	

    // Validacion de sesion
    perfilService.validarSesion($location);

    // Variables
    $scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
     $scope.msjerror = "";
    
    $scope.tengoPermiso = function(permiso){
      return perfilService.getPermiso(permiso);
    }

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
         	}).error(function (data, status, header, config) {          
              $scope.msjerror = data.error;
              $scope.msjerror= $scope.msjerror.split(":").pop();
              alert($scope.msjerror);
          return false;
        })
    }
   	
    $scope.crearUsuario = function () {

    		usuarioService.setUsuario(undefined);
        usuarioService.setModoEditar(false);
    		$location.path('/dashboard/usuarios-editar');
    		return "/dashboard/usuarios-editar";

    }
    
    $scope.editarUsuario = function (usuario) { 
        usuario.contrasenia = ' ';
        usuario.contrasenia2 = ' ';
        usuarioService.setUsuario(usuario);
    		usuarioService.setModoEditar(true);

    		$location.path('/dashboard/usuarios-editar');
    		return "/dashboard/usuarios-editar";
    }  
    
    $scope.setearUsuarioAEliminar = function (usuario){

        usuarioService.setUsuario(usuario); 

    }
    
    $scope.eliminarUsuario = function () {

        var usuario = usuarioService.getUsuario();

        var dataPost = {
          "usuario":usuario.usuario,
          "usuario_exec":$scope.nombreUsuario,
          "rol_exec":$scope.rolUsuario
        }
        $http.post(perfilService.getRuta()+'/usuarios/eliminar_usuario', 
              dataPost,perfilService.getConfig())
          .success(function (data, status, headers, config) {         
          $scope.datos = data.info;             
          })
        .error(function (data, status, header, config) {          
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);              
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
          })
        .error(function (data, status, heder, config) {          
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);    
        })

    		$scope.listarUsuarios();		
    		return false;
      }

      $scope.cambiarContrasenia = function (usuario) {

        usuarioService.setUsuario(usuario); // Seteo el usuario seleccionado

        $location.path('/dashboard/usuarios-contrasenia');
        return "/dashboard/usuarios-contrasenia";
      }  

  $scope.listarUsuarios();

});