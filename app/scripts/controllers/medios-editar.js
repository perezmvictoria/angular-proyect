'use strict';

angular.module('rac')
  .controller('MediosEditarCtrl', function(perfilService,mediosService,$scope, $location, $http) {
    $scope.medio_seleccionado =  mediosService.getMedio();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.editar = mediosService.isModoEditar();

    if (!$scope.editar)
    {
      $scope.dataTipoMedio = {
        opciones: [
          { 'id': '1', 'tipo': 'SMS' },
          { 'id': '2', 'tipo': 'Mail' }
        ],
        seleccionada: { 'id': '2', 'tipo': 'Mail' }
      };
    }
    else
    {
      var tipo = ""
      switch ($scope.medio_seleccionado.tipo_medio){
        case "SMS":
          tipo = "1";
          break;
        case "Mail":
          tipo = "2";
          break;
      }
      $scope.dataTipoMedio = {
        opciones: [
          { 'id': '1', 'tipo': 'SMS' },
          { 'id': '2', 'tipo': 'Mail' }
        ],
        seleccionada: { 'id': tipo }
      };
    }

  $scope.modoEditar = function(){
    return mediosService.isModoEditar();
  }
  
  $scope.cancelar = function(){
    mediosService.setMedio(undefined);
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
  }

  $scope.generarMedio = function () {
    if(!$scope.editar){
      var data = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario,
        "nombre":$scope.medio_seleccionado.nombre,
        "dominio":$scope.medio_seleccionado.dominio,
        "destino":$scope.medio_seleccionado.destino,
        "tipo_medio":$scope.dataTipoMedio.seleccionada.id,
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
        "tipo_medio":$scope.dataTipoMedio.seleccionada.id,
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