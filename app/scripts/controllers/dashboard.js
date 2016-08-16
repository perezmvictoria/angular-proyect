'use strict';

angular.module('rac')
  .controller('DashboardCtrl', function(perfilService,usuarioService,$scope, $location,$state,$http) {
	perfilService.validarSesion($location);
	$scope.$state = $state;
	$scope.usuario =  perfilService.getUsuario();
	$scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

    $scope.editarPerfil = function () {
		usuarioService.setUsuario(perfilService.getUsuario());				
		$location.path('/dashboard/perfil-editar');
		return "/dashboard/perfil-editar";
    }

    $scope.cambiarContrasenia = function () {
		usuarioService.setUsuario(perfilService.getUsuario());
		$location.path('/dashboard/perfil-contrasenia');
		return "/dashboard/perfil-contrasenia";
    }

    // Cerrar sesion
 	$scope.logout = function () {

		var dataPost = {
      		"usuario_exec":$scope.nombreUsuario,
      		"rol_exec":$scope.rolUsuario
    	} 

    	$http.post(perfilService.getRuta()+'/perfil/cerrar_sesion', 
          dataPost,perfilService.getConfig())
      	.success(function (data, status, headers, config) {         
        	//$scope.listaDeUsuarios = data.info;     
      	return false;
      	})
      	.error(function (data, status, header, config) {
        //$scope.msjerror = data.error;
        //$scope.msjerror= $scope.msjerror.split(":").pop();        
        return false;
    })

 		perfilService.setUsuario({});
 		$location.path('/login.html');
		return "/login.html";
 	}

 	$scope.tengoPermiso = function(permiso){
      return perfilService.getPermiso(permiso);
    }
  });
