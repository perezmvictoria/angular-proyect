'use strict';

angular.module('rac')
  .controller('LoginCtrl', function(perfilService,$scope, $location, $http) {
    $scope.error = false;
   	$scope.mLogin = function () {
  		$http.post(perfilService.getRuta()+'/perfil/iniciar_sesion', 
            perfilService.getData(),perfilService.getConfig())
    	    .success(function (data, status, headers, config) {
              perfilService.setPerfil($scope.usuario,"admin",$scope.contrasenia);
          		$location.path('/dashboard');              
              return false;
        	})
        	.error(function (data, status, header, config) {              
              $scope.msjerror = "Usuario y/o contraseña incorrectos ";                            
              perfilService.setPerfil("error","admin",$scope.contrasenia);
              $location.path('/dashboard');
              return false;
          })
            
    };
});