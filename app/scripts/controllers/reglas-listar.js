'use strict';


angular.module('rac')
  .controller('ReglasListarCtrl', function(perfilService,reglasService,$scope, $state, $location) {
 	
    $scope.msjerror = "";
	$scope.listarReglas = function () {
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
    $scope.listarReglas();

  	$scope.crearRegla = function () {
		reglasService.setRegla(undefined);		
		reglasService.setModoEditar(false);
		$location.path('/dashboard/reglas-editar');
		return "/dashboard/reglas-editar";
    }
    $scope.editarRegla = function (usuario) {
		reglasService.setRegla(regla);				
		reglasService.setModoEditar(true);		
		$location.path('/dashboard/reglas-editar');
		return "/dashboard/reglas-editar";
    }
  
    $scope.eliminarRegla = function (usuario) {
		reglasService.setRegla(undefined);	
		//funcion para eliminar regla
		$scope.listarReglas();
		return false;
    }
});