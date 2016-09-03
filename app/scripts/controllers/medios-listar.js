'use strict';

angular.module('rac')
  .controller('MediosListarCtrl', function(perfilService,mediosService,$scope, $state, $location,$http) {
  
    // Validacion de sesion
    perfilService.validarSesion($location);
  
    // Variables
    $scope.medio_seleccionado = mediosService.getMedio();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.msjerror = "Ups! Ha ocurrido un error";
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
    		return false;
     	})
     	.error(function (data, status, header, config) {
        $scope.msjerror = data.error;
        $scope.msjerror = $scope.msjerror.split(":").pop();
        alert($scope.msjerror)
        return false;
      })
    }

    // Crear un medio
    $scope.crearMedio = function () {
      mediosService.setMedio(undefined); // Seteo medio en undefined (limpio el medio)
      mediosService.setModoEditar(false); // Seteo modo de edicion a false
    	$location.path('/dashboard/medios-editar'); // Redirect a medios editar
    	return "/dashboard/medios-editar";      
    }
  
    // Editar medio
    $scope.editarMedio = function (medio) {
    	mediosService.setMedio(medio); // Seteo medio a editar con el medio seleccionado
      mediosService.setModoEditar(true); // Seteo modo de edicion a true
      $location.path('/dashboard/medios-editar'); // Redirect a medios editar
  	  return "/dashboard/medios-editar";
    }
  
    $scope.setearMedioAEliminar = function (medio) {
        mediosService.setMedio(medio); // Seteo medio a eliminar
     }
  
    // Eliminar medio
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
        })
      .error(function (data, status, header, config) {
        $scope.msjerror = data.error;
        $scope.msjerror= $scope.msjerror.split(":").pop();
        alert($scope.msjerror)
      })

      $scope.listarMedios();
      return false;
    }

    $scope.listarMedios();

});