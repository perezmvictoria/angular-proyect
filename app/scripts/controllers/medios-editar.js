'use strict';

angular.module('rac')
  .controller('MediosEditarCtrl', function(perfilService,mediosService,$scope, $location, $http) {
    // Validacion existe sesion 
    perfilService.validarSesion($location);
    
    $scope.medio_seleccionado =  mediosService.getMedio();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.editar = mediosService.isModoEditar();
    $scope.msjerror = "Ups! Ha ocurrido un error";

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

  // Set de modo de pantalla en editar
  $scope.modoEditar = function(){
    return mediosService.isModoEditar();
  }
  
  // Cancelo la edicion del medio, vuelvo al lista de medios
  $scope.cancelar = function(){
    mediosService.setMedio(undefined);
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
  }

  $scope.generarMedio = function () {
    if(!$scope.editar){ // Si estoy creando el medio
      if ($scope.dataTipoMedio.seleccionada.tipo == "sms") // Si estoy creando un medio SMS
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
      else // Si estoy creando un medio MAIL
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

      }).error(function(data) {
          $scope.msjerror= data.error;
          $scope.msjerror= $scope.msjerror.split(":").pop();
          alert($scope.msjerror);
        });
    }else{ // Si estoy editando el medio

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

      }).error(function(data) {
          $scope.msjerror=data.error;
          $scope.msjerror= $scope.msjerror.split(":").pop();
          alert($scope.msjerror);
        });
    }  
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
    }
});