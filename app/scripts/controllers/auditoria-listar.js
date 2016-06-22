'use strict';


angular.module('rac')
  .controller('AuditoriasListarCtrl', function(perfilService,$scope, $state) {
      $scope.msjerror = "";

      $scope.filtro = { fechaIni :'',
                        fechaFin :'',
                        tecnico  :'',
                        accion   :'',};

      $scope.lstTecnicos = [
          { 'id': '1', 'nombre': 'Juan' },
          { 'id': '2', 'nombre': 'Jose' },
          { 'id': '3', 'nombre': 'Pepe' }
      ];

      $scope.lstAccion = [
          { 'id': '1', 'nombre': 'Esperar' },
          { 'id': '2', 'nombre': 'Consolidar' },
          { 'id': '3', 'nombre': 'Descartar' }
      ];
      

      $scope.listarReportes = function () {
          $scope.datos =
            [{
                  fecha :'1/1/1981',
                  tecnico :'tecnico 1',
                  accion :'accion 1',
                  descripcion :'descripcion 1',
                  comentario :'comentario 1'
              },
              {
                  fecha :'2/2/1982',
                  tecnico :'tecnico 2',
                  accion :'accion 2',
                  descripcion :'descripcion 2',
                  comentario :'comentario 2'
              }];
          return false;
      }

      $scope.listarReportes();

  });
