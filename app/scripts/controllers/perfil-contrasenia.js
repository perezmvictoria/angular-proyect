'use strict';

angular.module('rac')
  .controller('PerfilContraseniaCtrl', function(perfilService,usuarioService,$scope, $location,$http,md5) {  	
  	
	perfilService.validarSesion($location);

  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.contrasenia = "";
    $scope.contrasenia2 = "";
    $scope.msjerror = "Ups! Ha ocurrido un error";
    $scope.noverpasswd = false;

 	  
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

	$scope.cancelar = function(){
		$location.path('/dashboard/perfil-ayuda');
		return "'/dashboard/perfil-ayuda'";
	}

	$scope.guardarContrasenia = function () {
		var data = {
	 			"usuario_exec": $scope.nombreUsuario,
	 			"rol_exec": $scope.rolUsuario,
	 			"usuario": $scope.nombreUsuario,
	 			"contrasenia": md5.createHash($scope.contrasenia)
			}			
			$http.post(perfilService.getRuta()+'/perfil/cambiar_contrasenia_perfil', data, perfilService.getConfig())
				.success(function (data, status, headers, config) {

	    		})
	    		.error(function(data) {
		            $scope.msjerror=data.error;
		            $scope.msjerror= $scope.msjerror.split(":").pop();
		            alert($scope.msjerror);
        });
		$location.path('/dashboard/perfil-ayuda');
		return "'/dashboard/perfil-ayuda'";
	}
});