'use strict';


angular.module('rac')
  .controller('ReglasListarCtrl', function(perfilService,reglasService,$scope, $state, $location,$http) {
    
    // Validacion de sesion
    perfilService.validarSesion($location);
 	
    $scope.msjerror = "";
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.tienePermiso="";
    $scope.hayError=false;

	  $scope.listarReglas = function () {

      var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      }
      
      if (reglasService.getListaDeMedios() == undefined){
        $http.post(perfilService.getRuta()+'/medios/listar_medios', dataPost, perfilService.getConfig())
        .success(function (data, status, headers, config) {
            reglasService.setListaDeMedios(data.info);
        });
      }

      $http.post(perfilService.getRuta()+'/reglas/listar_reglas', 
        dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
        $scope.datos = data.info;
        $scope.tienePermiso=true;
        $scope.hayError=false;         
        return false;
        })
      .error(function (data, status, header, config) {
          $scope.msjerror = data.error;
          $scope.hayError=true;
          return false;
      })
    }

  	$scope.crearRegla = function () {
		reglasService.setRegla(undefined);		
		reglasService.setModoEditar(false);
		$location.path('/dashboard/reglas-editar');
		return "/dashboard/reglas-editar";
    }

    $scope.editarRegla = function (regla) {
		reglasService.setRegla(regla);				
		reglasService.setModoEditar(true);		
		$location.path('/dashboard/reglas-editar');
		return "/dashboard/reglas-editar";
    }

    $scope.setearReglaAEliminar = function (regla) {
      reglasService.setRegla(regla);
    }
  
    $scope.eliminarRegla = function (regla) {

      var reglaAEliminar = reglasService.getRegla();
      var dataPost = {
        "nombre":reglaAEliminar.nombre,
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      }

      $http.post(perfilService.getRuta()+'/reglas/eliminar_regla',
      dataPost,perfilService.getConfig())
      .success(function (data, status, headers, config) {
        $scope.datos = data.info;
        $scope.hayError=false;
        })
      .error(function (data, status, header, config) {
        $scope.msjerror = data.error;
        $scope.hayError=true;
      })

		$scope.listarReglas();
		return false;
    }

  $scope.listarReglas();

});