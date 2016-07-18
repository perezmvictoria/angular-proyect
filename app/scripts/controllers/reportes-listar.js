'use strict';

angular.module('rac')
  .controller('ReportesListarCtrl', function(perfilService,$scope, $state,$location) {
          perfilService.validarSesion($location);
          $scope.msjerror = "";

          $scope.filtro = { fechaIni :'',
              fechaFin :'',
              tecnico  :'',
              estado   :'',};

          $scope.lstTecnicos = [
              { 'id': '1', 'nombre': 'Juan' },
              { 'id': '2', 'nombre': 'Jose' },
              { 'id': '3', 'nombre': 'Pepe' }
          ];

          $scope.lstEstado = [
              { 'id': '1', 'nombre': 'Esperar' },
              { 'id': '2', 'nombre': 'Consolidar' },
              { 'id': '3', 'nombre': 'Descartar' }
          ];

          /*$scope.listarReportes = function () {

          $http.post(perfilService.getRuta()+'/55555555555555555/listar_auditorias', 
            perfilService.getData(),perfilService.getConfig())
            .success(function (data, status, headers, config) {         
            $scope.datos = data.info;        
            return false;
            })
            .error(function (data, status, header, config) {          
              $scope.msjerror = "No se pudo cargar la lista de usuarios";          
              return false;
            })
            }*/
          //$scope.listarReportes();
      });
