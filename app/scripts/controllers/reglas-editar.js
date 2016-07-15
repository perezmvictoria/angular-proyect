'use strict';

angular.module('rac')
  .controller('ReglasEditarCtrl', function(perfilService,reglasService,$scope, $state, $location, $http) {

    $scope.regla_seleccionado =  reglasService.getRegla();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

    //Lo prolijo es obtener estos datos de un webservice, para desacoplarlo
    $scope.lstAccion = [
       { 'id': '1', 'nombre': 'Esperar' },
       { 'id': '2', 'nombre': 'Consolidar' },
       { 'id': '3', 'nombre': 'Descartar' }
    ];
    $scope.lstMedio = [
       { 'id': '1', 'nombre': 'Medio 1' },
       { 'id': '2', 'nombre': 'Medio 2' },
       { 'id': '3', 'nombre': 'Medio 3' }
    ];


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