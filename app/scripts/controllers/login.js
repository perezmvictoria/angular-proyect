'use strict';

angular.module('rac')
  .controller('LoginCtrl', function(perfilService,$scope, $location, $http) {

    $scope.error     = false;
    $scope.noverpasswd = true;
    $scope.msjerror = "";

    $scope.verpasswd = function(){
      $scope.noverpasswd != $scope.noverpasswd;
    }
    
    // Funcion para cambiar modo de textbox y mostrar o no la contraseña en texto
    $scope.verpasswd_tipo = function(){
      if ($scope.noverpasswd){
        return "password";
      }else{
        return "text";
      }
    }

    // Funcion de login
   	$scope.mLogin = function () {
    var dataUsuario = {
   		"usuario":$scope.usuario,
   		"contrasenia":$scope.contrasenia
   	}
  	$http.post(perfilService.getRuta()+'/perfil/iniciar_sesion', dataUsuario, perfilService.getConfig()).success(
      function (data, status, headers, config) 
    {
      // Seteo datos en el perfil actual de usuario
      perfilService.setPerfil($scope.usuario,data.info.tipo_usuario,$scope.contrasenia);
      // Armo json para enviar en el POST
      var dataPost = {
        "usuario_exec":$scope.usuario,
        "rol_exec":data.info.tipo_usuario
      } 
      $http.post(perfilService.getRuta()+'/perfil/obtener_perfil',dataPost , 
        perfilService.getConfig()).success(
        function (data,status,headers,config)
        {
          perfilService.setDatosPerfil(data.info);
          //debugger;
          $location.path('/dashboard');
          return false;
        }).error (
          function () {
            $scope.msjerror = "Error al cargar datos";
            perfilService.setPerfil("error","admin",$scope.contrasenia);
            $location.path('/login');
            return false;
          })
          return false;
        }).error (
          function () {              
            $scope.msjerror = "Usuario y/o contraseña incorrectos";
            perfilService.setPerfil("error","admin",$scope.contrasenia);
            $location.path('/login');
            return false;
          })
    };
});