'use strict';

angular.module('rac')
  .controller('NotificacionesListarCtrl', function(perfilService,$scope, $state, $http,$location) {

      perfilService.validarSesion($location);
      $scope.$state = $state;
      $scope.filtro = { fechaIni :'', fechaFin :''};
      $scope.nombreUsuario = perfilService.getUsuario().nombre;
      $scope.rolUsuario    = perfilService.getUsuario().rol;

      $scope.notificacion_seleccionada = "";

      $scope.setNotificacion = function (notificacion){
        $scope.notificacion_seleccionada = notificacion;
      }

      $scope.resolverNotificacion = function(){

        console.log($scope.notificacion_seleccionada);

      }

      $scope.cerrarNotificacion = function(){
        console.log($scope.notificacion_seleccionada);
      }

      $scope.asignarNotificacion = function(){

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
          return false;
        })
        .error(function (data, status, header, config) {
          $scope.msjerror = "Error";
          return false;
        })

        console.log($scope.notificacion_seleccionada);

        $location.path('/dashboard/notificaciones-listar');
        return "/dashboard/notificaciones-listar";
      }

      $scope.listarNotificaciones = function () {
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
          $scope.msjerror = "No se pudo cargar la lista de notificaciones";
          return false;
        })
      }
    $scope.listarNotificaciones();
  });