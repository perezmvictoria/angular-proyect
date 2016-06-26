'use strict';

angular.module('rac')
  .controller('NotificacionesListarCtrl', function(perfilService,$scope, $state, $http) {

    $scope.$state = $state;

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
