'use strict';

angular.module('rac')
  .controller('PerfilEditarCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	

    perfilService.validarSesion($location);

  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.perfil_seleccionado = perfilService.getDatosPerfil();
    $scope.hayError=false; 
    $scope.msjerror = "";

	$scope.cancelar = function(){
		$location.path('/dashboard/perfil-ayuda');
		return "'/dashboard/perfil-ayuda'";
	}

	$scope.guardarPerfil = function () {

		var data = {
	 		"usuario_exec":$scope.nombreUsuario,
 			"rol_exec":$scope.rolUsuario,
 			"nombre":$scope.perfil_seleccionado.nombre,
 			"usuario":$scope.nombreUsuario,
 			"mail": $scope.perfil_seleccionado.mail,
 			"telefono":$scope.perfil_seleccionado.telefono
		}

		$http.post(perfilService.getRuta()+'/perfil/editar_perfil', data, perfilService.getConfig())
			.success(function (data, status, headers, config) {
				//$scope.hayError = true;
	    }).error(function(data) {
            $scope.hayError = true;
            $scope.msjerror=data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);
        });

	$location.path('/dashboard/perfil-ayuda');
	return "'/dashboard/perfil-ayuda'";

	}
});