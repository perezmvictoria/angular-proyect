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
    
    if ($scope.checkedMail){ 
      $scope.medio_seleccionado.tipo_medio = "mail";
      $scope.medio_seleccionado.clave ="";
    }
    else{
      $scope.medio_seleccionado.tipo_medio = "sms";
    }

    if(!mediosService.isModoEditar()){
      var data = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario,
        "nombre":$scope.medio_seleccionado.nombre,
        "dominio":$scope.medio_seleccionado.dominio,
        "destino":$scope.medio_seleccionado.destino,
        "tipo_medio":$scope.medio_seleccionado.tipo_medio,
        "clave":$scope.medio_seleccionado.clave
      }
      $http.post(perfilService.getRuta()+'/medios/crear_medio', data, perfilService.getConfig())
      .success(function (data, status, headers, config) {

      });
    }else{
      var data = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario,
        "nombre":$scope.medio_seleccionado.nombre,
        "dominio":$scope.medio_seleccionado.dominio,
        "destino":$scope.medio_seleccionado.destino,
        "tipo_medio":$scope.medio_seleccionado.tipo_medio,
        "clave":$scope.medio_seleccionado.clave
      }
      $http.post(perfilService.getRuta()+'/medios/editar_medio', data, perfilService.getConfig())
      .success(function (data, status, headers, config) {

      });
    }  
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
    }
});