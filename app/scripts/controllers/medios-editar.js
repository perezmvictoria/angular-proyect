'use strict';

angular.module('rac')
  .controller('MediosEditarCtrl', function(perfilService,mediosService,$scope, $location, $http) {
    $scope.medio_seleccionado =  mediosService.getMedio();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.editar = mediosService.isModoEditar();

    $scope.modoEditar = function(){
      return mediosService.isModoEditar();
    }

  $scope.cancelar = function(){
    mediosService.setMedio(undefined);
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
  }
  
  $scope.generarMedio = function () {
    mediosService.setMedio(undefined);   
    if(!mediosService.isModoEditar()){
      //Hay que usar $scope.medio_seleccionado
            var data = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario,
        "nombre":$scope.usuario_seleccionado.nombre,
        "usuario":$scope.usuario_seleccionado.usuario,
        "tipo_usuario": $scope.usuario_seleccionado.tipo,
        "contrasenia":$scope.usuario_seleccionado.contrasenia,
        "mail":$scope.usuario_seleccionado.mail,
        "telefono":$scope.usuario_seleccionado.telefono
      }
      $http.post(perfilService.getRuta()+'/usuarios/crear_usuario', data, perfilService.getConfig())
        .success(function (data, status, headers, config) {

      });
    }else{
      //funcion editar
      //Hay que usar $scope.medio_seleccionado
    }   
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
    }
});