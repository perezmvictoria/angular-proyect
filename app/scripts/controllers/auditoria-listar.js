'use strict';


angular.module('rac')
  .controller('AuditoriasListarCtrl', function(perfilService,$scope, $state,$http) {

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
      
    $scope.listarAuditoria = function () {
    	$http.post(perfilService.getRuta()+'/auditorias/listar_auditorias', 
    				perfilService.getData(),perfilService.getConfig())
    		.success(function (data, status, headers, config) {    			
				$scope.datos = data.info;        
				return false;
       	})
    	.error(function (data, status, header, config) {          
          $scope.msjerror = "No se pudo cargar la lista de usuarios";          
          return false;
      })
    }

    $scope.listarAuditoria();

  });
