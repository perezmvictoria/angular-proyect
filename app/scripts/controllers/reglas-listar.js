'use strict';


angular.module('rac')
  .controller('ReglasListarCtrl', function(perfilService,reglasService,$scope, $state, $location,$http) {
    perfilService.validarSesion($location);
 	
    $scope.msjerror = "";
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

	  $scope.listarReglas = function () {

      var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      } 

      $http.post(perfilService.getRuta()+'/reglas/listar_reglas', 
        dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
        $scope.datos = data.info;        
        return false;
        })
      .error(function (data, status, header, config) {          
          $scope.msjerror = "No se pudo cargar la lista de reglas";          
          return false;
      })
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