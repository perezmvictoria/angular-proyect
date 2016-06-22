'use strict';

angular.module('rac')
  .controller('NotificacionesListarCtrl', function(perfilService,$scope, $state) {
      $scope.msjerror = "";

      $scope.filtro = { fechaIni :'',
                        fechaFin :'',
                        tecnico  :'',
                        accion   :''
                      };

      $scope.listarReportes = function () {

      }
      $scope.listarReportes();

  });
