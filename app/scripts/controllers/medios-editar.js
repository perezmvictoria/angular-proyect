'use strict';

angular.module('rac')
  .controller('MediosEditarCtrl', function(perfilService,mediosService,$scope, $state) {
  
    $scope.medio_seleccionado =  mediosService.getMedio();
    $scope.msjerror = ""; 
    $scope.modoEditar = function(){
      return mediosService.isModoEditar();
    }

  $scope.cancelar = function(){
    mediosService.setMedio(undefined);
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
  }
  
  $scope.generarMedio = function () {
    mediosService.setMedio(undefined);   
    if(mediosService.isModoEditar()){      
      //Hay que usar $scope.medio_seleccionado
    }else{
      //funcion editar
      //Hay que usar $scope.medio_seleccionado
    }   
    $location.path('/dashboard/medios-listar');
    return "'/dashboard/medios-listar'";
    }
});