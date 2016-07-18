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
      var dataUsuario = {
   			"usuario":$scope.usuario,
   			"contrasenia":$scope.contrasenia
   		}
  		$http.post(perfilService.getRuta()+'/perfil/iniciar_sesion', dataUsuario, perfilService.getConfig()).success(
          function (data, status, headers, config) 
          {
            
            //console.log("dentro del iniciar sesion");
            perfilService.setPerfil($scope.usuario,data.info.tipo_usuario,$scope.contrasenia);
            var dataPost = {
              "usuario_exec":$scope.usuario,
              "rol_exec":data.info.tipo_usuario
            } 
            $http.post(perfilService.getRuta()+'/perfil/listar_roles',dataPost , perfilService.getConfig()).success(
              function (data,status,headers,config)
              {
                //console.log("dentro del listar roles");                
                perfilService.setRolesUsuario(data.info);
                $location.path('/dashboard');
                return false;
              }).error (
              function () {
              //console.log(textoError);
                $scope.msjerror = "Error al cargar datos";
                perfilService.setPerfil("error","admin",$scope.contrasenia);
                $location.path('/login');
                return false;
              })
            //.error(loginError ("Error al cargar datos"))
            return false;
          }).error (
              function () {              
                $scope.msjerror = "Usuario y/o contraseña incorrectos";
                perfilService.setPerfil("error","admin",$scope.contrasenia);
                $location.path('/login');
                return false;
              })
      //.error(loginError ("Usuario y/o contraseña incorrectos"))            
    };
    //var loginError = function (textoError) {
              //console.log(textoError);
            //  $scope.msjerror = textoError;
          //    perfilService.setPerfil("error","admin",$scope.contrasenia);
        //      $location.path('/login');
      //        return false;
    //};
});