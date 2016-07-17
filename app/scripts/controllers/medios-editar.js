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
          { 'tipo': 'sms' },
          { 'tipo': 'mail' }
        ],
        seleccionada: { 'tipo': 'mail' }
      };
    }
    else
    {
      $scope.dataTipoMedio = {
        opciones: [
          { 'tipo': 'sms' },
          { 'tipo': 'mail' }
        ],
        seleccionada: { 'tipo': $scope.medio_seleccionado.tipo }
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
    debugger;
    if(!$scope.editar){
      if ($scope.dataTipoMedio.seleccionada.tipo == "sms")
      {
        var data = {
          "usuario_exec":$scope.nombreUsuario,
          "rol_exec":$scope.rolUsuario,
          "nombre":$scope.medio_seleccionado.nombre,
          "dominio":$scope.medio_seleccionado.dominio,
          "destino":$scope.medio_seleccionado.destino,
          "tipo_medio":$scope.dataTipoMedio.seleccionada.tipo,
          "clave":$scope.medio_seleccionado.clave
        }
      }
      else
      {
        var data = {
          "usuario_exec":$scope.nombreUsuario,
          "rol_exec":$scope.rolUsuario,
          "nombre":$scope.medio_seleccionado.nombre,
          "dominio":$scope.medio_seleccionado.dominio,
          "destino":$scope.medio_seleccionado.destino,
          "tipo_medio":$scope.dataTipoMedio.seleccionada.tipo,
        }
      }
      $http.post(perfilService.getRuta()+'/medios/crear_medio', data, perfilService.getConfig())
      .success(function (data, status, headers, config) {
      });
    }else{

      if ($scope.dataTipoMedio.seleccionada.tipo == "sms")
      {
        // SMS
        var data = {
          "usuario_exec":$scope.nombreUsuario,
          "rol_exec":$scope.rolUsuario,
          "nombre":$scope.medio_seleccionado.nombre,
          "dominio":$scope.medio_seleccionado.dominio,
          "destino":$scope.medio_seleccionado.destino,
          "tipo_medio":$scope.dataTipoMedio.seleccionada.tipo,
          "clave":$scope.medio_seleccionado.clave
        }
      }
      else{
        // Mail
        var data = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario,
        "nombre":$scope.medio_seleccionado.nombre,
        "dominio":$scope.medio_seleccionado.dominio,
        "destino":$scope.medio_seleccionado.destino,
        "tipo_medio":$scope.dataTipoMedio.seleccionada.tipo
        }
      }      
      $http.post(perfilService.getRuta()+'/medios/editar_medio', data, perfilService.getConfig())
      .success(function (data, status, headers, config) {
      });
    }  
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
    }
});