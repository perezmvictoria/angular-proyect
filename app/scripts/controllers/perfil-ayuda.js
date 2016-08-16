'use strict';

angular.module('rac')
  .controller('PerfilAyudaCtrl', function(perfilService,usuarioService,$scope, $location,$http) {  	
  	
	perfilService.validarSesion($location);

  	$scope.usuario_seleccionado = usuarioService.getUsuario();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
   
 	  
	$scope.cancelar = function(){
		$location.path('/dashboard');
		return "'/dashboard'";
	}


});