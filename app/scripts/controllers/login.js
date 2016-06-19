'use strict';

angular.module('rac')
  .controller('LoginCtrl', function(perfilService,$scope, $location, $http) {

    $scope.error     = false;
    $scope.noverpasswd = true;
    $scope.msjerror = "";

    $scope.verpasswd = function(){
      $scope.noverpasswd != $scope.noverpasswd;      
    }

    $scope.verpasswd_tipo = function(){
      if ($scope.noverpasswd){
        return "password";
      }else{
        return "text";        
      }
    }

   	$scope.mLogin = function () {
   		var data = {
   			"usuario":$scope.usuario,
   			"contrasenia":$scope.contrasenia
   		}
  		$http.post(perfilService.getRuta()+'/perfil/iniciar_sesion',data,perfilService.getConfig())
    	    .success(function (data, status, headers, config) {
              perfilService.setPerfil($scope.usuario,data.info.tipo_usuario,$scope.contrasenia);
          		$location.path('/dashboard');           
              return false;
        	})
        	.error(function (data, status, header, config) {              
              $scope.msjerror = "Usuario y/o contraseña incorrectos ";                            
              perfilService.setPerfil("error","admin",$scope.contrasenia);
              $location.path('/login');
              return false;
        })            
    };

});
