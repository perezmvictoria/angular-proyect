'use strict';

angular.module('rac')
  .controller('ReglasEditarCtrl', function(perfilService,reglasService,$scope, $state) {

    $scope.regla_seleccionado =  reglasService.getregla();
    $scope.msjerror = ""; 
    $scope.modoEditar = function(){
      return reglasService.isModoEditar();
    }

  $scope.cancelar = function(){
    reglasService.setRegla(undefined);
    $location.path('/dashboard/reglas-listar');
    return "'/dashboard/reglas-listar'";
  }
  
  $scope.generarregla = function () {
    reglasService.setRegla(undefined);   
    if(reglasService.isModoEditar()){      
      //Hay que usar $scope.regla_seleccionado
    }else{
      //funcion editar
      //Hay que usar $scope.regla_seleccionado
    }   
    $location.path('/dashboard/reglas-listar');
    return "'/dashboard/reglas-listar'";
    }
});