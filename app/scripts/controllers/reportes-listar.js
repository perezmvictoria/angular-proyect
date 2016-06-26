'use strict';

angular.module('rac')
  .controller('ReportesListarCtrl', function(perfilService,$scope, $state) {
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

          $scope.listarReportes = function () {

          }
          $scope.listarReportes();


      });
