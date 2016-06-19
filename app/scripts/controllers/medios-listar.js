'use strict';

angular.module('rac')
  .controller('MediosListarCtrl', function(perfilService,mediosService,$scope, $state) {
  $scope.msjerror = "";
  	$scope.listarMedios = function () {
  		//Agregar la funcion correcta
      	/*$http.post(perfilService.getRuta()+'/usuarios/listar_usuarios', 
      				perfilService.getData(),perfilService.getConfig())
      		.success(function (data, status, headers, config) {    			
  				$scope.datos = data.info;        
  				return false;
         	})
      	.error(function (data, status, header, config) {          
            $scope.msjerror = "No se pudo cargar la lista de usuarios";          
            return false;
        })*/
    }
    $scope.listarMedios();

   	$scope.crearMedio = function () {
  		mediosService.setMedio(undefined);		
  		mediosService.setModoEditar(false);
  		$location.path('/dashboard/medios-editar');
  		return "/dashboard/medios-editar";
    }
    $scope.editarMedio = function (usuario) {
  		mediosService.setMedio(Medio);				
  		mediosService.setModoEditar(true);		
  		$location.path('/dashboard/medios-editar');
		  return "/dashboard/medios-editar";
    }
  
    $scope.eliminarMedio = function (usuario) {
  		mediosService.setMedio(undefined);	
  		//funcion para eliminar Medio
  		$scope.listarMedios();
  		return false;
    }
});