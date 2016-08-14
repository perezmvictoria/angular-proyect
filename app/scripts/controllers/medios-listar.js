'use strict';

angular.module('rac')
  .controller('MediosListarCtrl', function(perfilService,mediosService,$scope, $state, $location,$http) {
  
    // Validacion de sesion
    perfilService.validarSesion($location);
  
    // Variables
    $scope.msjerror = "";
    $scope.medio_seleccionado = mediosService.getMedio();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.tienePermiso="";
    $scope.hayError=false;
  
    $scope.listarMedios = function () {
      var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      } 
   	
      $http.post(perfilService.getRuta()+'/medios/listar_medios',
      dataPost,perfilService.getConfig())
    	.success(function (data, status, headers, config) {
    		$scope.datos = data.info;
        $scope.tienePermiso=true;
        //TODO
        $scope.hayError=false; 
    		return false;
     	})
     	.error(function (data, status, header, config) {
        $scope.msjerror = data.error;
        $scope.hayError=true;
        return false;
      })
    }

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
  
    $scope.setearMedioAEliminar = function (medio) {

        mediosService.setMedio(medio);

     }
  
    $scope.eliminarMedio = function (medio) {

      var medio = mediosService.getMedio();

      var dataPost = {
        "nombre": medio.nombre,
        "usuario_exec": $scope.nombreUsuario,
        "rol_exec": $scope.rolUsuario
      }

      $http.post(perfilService.getRuta()+'/medios/eliminar_medio',
      dataPost,perfilService.getConfig())
      .success(function (data, status, headers, config) {
        $scope.datos = data.info;
        $scope.hayError=false;
        })
      .error(function (data, status, header, config) {
        $scope.msjerror = data.error;
        $scope.hayError=true;
      })

      $scope.listarMedios();
      return false;
    }

    $scope.listarMedios();

});