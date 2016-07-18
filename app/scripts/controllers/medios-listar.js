'use strict';

angular.module('rac')
  .controller('MediosListarCtrl', function(perfilService,mediosService,$scope, $state, $location,$http) {
  $scope.msjerror = "";
  $scope.medio_seleccionado = mediosService.getMedio();
  $scope.nombreUsuario = perfilService.getUsuario().nombre;
  $scope.rolUsuario    = perfilService.getUsuario().rol;
  $scope.listarMedios = function () {
    var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
    } 
   	$http.post(perfilService.getRuta()+'/medios/listar_medios', 
  	dataPost,perfilService.getConfig())
  	.success(function (data, status, headers, config) {    			
  		$scope.datos = data.info;        
  		return false;
   	})
   	.error(function (data, status, header, config) {          
      $scope.msjerror = "No se pudo cargar la lista de medios";          
      return false;
    })
  }
  $scope.listarMedios();

  $scope.crearMedio = function () {
    mediosService.setMedio(undefined);		
  	mediosService.setModoEditar(false);
  	$location.path('/dashboard/medios-editar');
  	return "/dashboard/medios-editar";
  }
  
  $scope.editarMedio = function (medio) {
  	mediosService.setMedio(medio);				
  	mediosService.setModoEditar(true);		
  	$location.path('/dashboard/medios-editar');
	  return "/dashboard/medios-editar";
  }
  
  $scope.setearMedioAEliminar = function (medio){
      mediosService.setMedio(medio);      
   }
  $scope.eliminarMedio = function (medio) {
  	mediosService.setMedio(medio);	
    //$scope.medio_seleccionado = medio;      
    var dataPost = {
      "nombre":medio.nombre,
      "usuario_exec":$scope.nombreUsuario,
      "rol_exec":$scope.rolUsuario
    }
    $http.post(perfilService.getRuta()+'/medios/eliminar_medio', 
    dataPost,perfilService.getConfig())
    .success(function (data, status, headers, config) {         
      $scope.datos = data.info;        
        return false;
      })
    .error(function (data, status, header, config) {          
      $scope.msjerror = "Error de conexion al servidor";          
      return false;
    })
  $scope.listarMedios();
  return false;
  }
});