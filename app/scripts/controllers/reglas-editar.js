'use strict';

angular.module('rac')
  .controller('ReglasEditarCtrl', function(perfilService,reglasService,$scope, $state, $location, $http) {
    perfilService.validarSesion($location);

    $scope.regla_seleccionada =  reglasService.getRegla();
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
    //debugger;
    //var largoLista = reglasService.getListaDeMedios();

    if (reglasService.getListaDeMedios() == undefined){

      var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
        } 
        $http.post(perfilService.getRuta()+'/medios/listar_medios', dataPost, perfilService.getConfig())
        .success(function (data, status, headers, config) {
            //listaDeMedios = data.info;
            //debugger;
            reglasService.setListaDeMedios(data.info);
        });
            // "/medios/listar_medios"
    }

    $scope.lstMedio = reglasService.getListaDeMedios();
    

    $scope.modoEditar = function(){
      return reglasService.isModoEditar();
    }

  $scope.cancelar = function(){
    reglasService.setRegla(undefined);
    $location.path('/dashboard/reglas-listar');
    return "'/dashboard/reglas-listar'";
  }
  
  $scope.generarRegla = function () {
    if(!reglasService.isModoEditar()){
        //reglasService.setRegla(undefined);   
  
      //Hay que usar $scope.regla_seleccionado
      //debugger;
      var data = {
        "usuario_exec" : $scope.nombreUsuario,
        "rol_exec" : $scope.rolUsuario,
        "nombre" : $scope.regla_seleccionada.nombre,
        "condicion" : $scope.regla_seleccionada.condicion,
        //"descripcion":
        "orden" : "1",
        "medios" : "medio1",
        "acciones" : "descartar"
      }
      $http.post(perfilService.getRuta()+'/reglas/crear_regla', data, perfilService.getConfig())
        .success(function (data, status, headers, config) {

          });


    }else{
      //funcion editar
      //Hay que usar $scope.regla_seleccionado
    }   
    $location.path('/dashboard/reglas-listar');
    return "'/dashboard/reglas-listar'";
    }
});