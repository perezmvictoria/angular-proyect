/*
Controller usuarios-listar
*/
'use strict';

angular.module('rac')
  .controller('UsuariosListarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	

    // Validacion de sesion
    perfilService.validarSesion($location);

    // Variables
    $scope.msjerror = "";
    $scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.tienePermiso="";
    $scope.hayError=false;

  	$scope.listarUsuarios = function () {
        var dataPost = {
          "usuario_exec":$scope.nombreUsuario,
          "rol_exec":$scope.rolUsuario
        }
        
      	$http.post(perfilService.getRuta()+'/usuarios/listar_usuarios', 
      				dataPost,perfilService.getConfig())
      		.success(function (data, status, headers, config) {    			
  				    $scope.datos = data.info;
              $scope.tienePermiso=true;       
  				return false;
         	}).error(function (data, status, header, config) {          
            if ( data.error.includes("permisos")){
                $scope.tienePermiso=false; 
                //alert(data.error);
                //$scope.msjerror = "Permisos insuficientes";  
            }else{
               $scope.msjerror = "No se pudo cargar la lista de usuarios";
               $scope.hayError=true;
            }
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
            $scope.msjerror = "Error de conexion al servidor";          
            
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

      $scope.cambiarContrasenia = function (usuario) {

        usuarioService.setUsuario(usuario); // Seteo el usuario seleccionado

        $location.path('/dashboard/usuarios-contrasenia');
        return "/dashboard/usuarios-contrasenia";
      }  

  $scope.listarUsuarios();

});