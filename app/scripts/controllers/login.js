'use strict';

angular.module('rac')
  .controller('LoginCtrl', function(perfilService,$scope, $location, $http,md5) {

    $scope.noverpasswd = false;
    $scope.msjerror = "";
    
    $http.get('config.json')
    .then(function(res){
      perfilService.setRuta(res.data.urlServer);
      //perfilService.ruta = res.data.urlServer;
      //console.log(perfilService.getRuta());               
    })

    $scope.verpasswd = function(){
      $scope.noverpasswd != $scope.noverpasswd;
    }
    
    // Funcion para cambiar modo de textbox y mostrar o no la contraseña en texto
    $scope.verpasswd_tipo = function(){
      if ($scope.noverpasswd){
        return "text";
      }else{
        return "password";
      }
    }

    $scope.crearHash = function(texto){
      return md5.createHash(texto);
    }

    // Funcion de login
   	$scope.mLogin = function () {
      var dataUsuario = {
     		"usuario":$scope.usuario.toLowerCase(),
     		"contrasenia": md5.createHash($scope.contrasenia)
     	}
    	$http.post(perfilService.getRuta()+'/perfil/iniciar_sesion', dataUsuario, perfilService.getConfig()).success(
        function (data, status, headers, config){
          // Seteo datos en el perfil actual de usuario
          perfilService.setPerfil($scope.usuario.toLowerCase(),data.info.tipo_usuario,$scope.contrasenia);
          // Armo json para enviar en el POST
          perfilService.setPermisos(data.info.operaciones);
          var dataPost = {
            "usuario_exec":$scope.usuario.toLowerCase(),
            "rol_exec":data.info.tipo_usuario
          }
          $http.post(perfilService.getRuta()+'/perfil/obtener_perfil',dataPost , 
            perfilService.getConfig()).success(
            function (data,status,headers,config)
            {
              perfilService.setDatosPerfil(data.info);
              $location.path('/dashboard/perfil-ayuda');
              return false;
            }).error (function (data) {
                if (data.error != undefined){
                  $scope.msjerror = data.error;
                  $scope.msjerror = $scope.msjerror.split(":").pop();  
                }                
                $location.path('/login');
                return false;
              })
              return false;
          }).error (function (data) {   
                if (data.error != undefined){
                  $scope.msjerror = data.error;
                  $scope.msjerror = $scope.msjerror.split(":").pop();  
                }           
              $location.path('/login');
              return false;
          })
    };
});