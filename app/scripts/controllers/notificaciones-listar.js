'use strict';

angular.module('rac')
  .controller('NotificacionesListarCtrl', function(perfilService,$scope, $state, $http,$location,$route) {

      perfilService.validarSesion($location);
      $scope.$state = $state;
      $scope.filtro = { fechaIni :'', fechaFin :''};
      $scope.nombreUsuario = perfilService.getUsuario().nombre;
      $scope.rolUsuario    = perfilService.getUsuario().rol;
      $scope.msjerror = "Ups! Ha ocurrido un error";
      $scope.notificacion_seleccionada = "";

      $scope.tengoPermiso = function(permiso){
        return perfilService.getPermiso(permiso);
      }

      $scope.setNotificacion = function (notificacion){
        $scope.notificacion_seleccionada = notificacion;
      }

      $scope.resolverNotificacion = function(){

        // Resolver notificacion
        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "identificador": $scope.notificacion_seleccionada.identificador,
          "usuario": $scope.nombreUsuario,
          "comentario": $scope.notificacion_seleccionada.comentario
        }

        $http.post(perfilService.getRuta()+'/notificaciones/resolver_notificacion',
        dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {
          $scope.datos = data.info;
        })
        .error(function (data, status, header, config) {
          if (data.error != undefined){
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);
          }
        })
        
        //$scope.listarNotificaciones();
        $state.reload();
        return false;
      }

      $scope.cerrarNotificacion = function(){

        // Cerrar notificacion
        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "identificador": $scope.notificacion_seleccionada.identificador,
          "usuario": $scope.nombreUsuario,
          "comentario": $scope.notificacion_seleccionada.comentarioCerrar
        }

        $http.post(perfilService.getRuta()+'/notificaciones/cerrar_notificacion',
        dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {
          $scope.datos = data.info;
        })
        .error(function (data, status, header, config) {
          if (data.error != undefined){
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);
          }
        })
        //$scope.listarNotificaciones();
        $state.reload();
        return false;
      }

      $scope.asignarNotificacion = function(){

        // Asignar notificacion
        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "identificador": $scope.notificacion_seleccionada.identificador,
          "usuario": $scope.nombreUsuario
        }

        $http.post(perfilService.getRuta()+'/notificaciones/asignar_notificacion',
        dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {
          $scope.datos = data.info;
        })
        .error(function (data, status, header, config) {
          if (data.error != undefined){
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);   
          }
        })
        //$scope.listarNotificaciones();
        $state.reload();
        return false;
      }

      $scope.listarNotificaciones = function () {
        
        // Listar notificaciones
        var dataPost = {
          "usuario_exec":$scope.nombreUsuario,
          "rol_exec":$scope.rolUsuario
        } 
        $http.post(perfilService.getRuta()+'/notificaciones/listar_notificaciones',
        dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {
          $scope.datos = data.info;
          return false;
        })
        .error(function (data, status, header, config) {
          if (data.error != undefined){
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror); 
          }
          return false;
        })
      }

      $scope.reloadRoute = function() {
        $state.reload();
      }

    $scope.listarNotificaciones();
  });