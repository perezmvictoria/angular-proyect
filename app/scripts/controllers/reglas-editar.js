'use strict';

angular.module('rac')
  .controller('ReglasEditarCtrl', function(perfilService,reglasService,$scope, $state, $location, $http) {
    perfilService.validarSesion($location);

    $scope.regla_seleccionada =  reglasService.getRegla();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

    //Lo prolijo es obtener estos datos de un webservice, para desacoplarlo

    $scope.dataListaAcciones = {
      opciones: [{ 'id': 1, 'nombre': 'esperar' },
                { 'id': 2, 'nombre': 'descartar' },
                { 'id': 3, 'nombre': 'consolidar' }],
      seleccionado: { 'id': 1, 'nombre': 'esperar' }
    }
    //$scope.dataListaAcciones.opciones = $scope.lstAccion;
    // La consulta al web service solo se realiza si la lista de medios de reglasService está vacio
    if (reglasService.getListaDeMedios() == undefined){
      var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
        }
        $http.post(perfilService.getRuta()+'/medios/listar_medios', dataPost, perfilService.getConfig())
        .success(function (data, status, headers, config) {
            reglasService.setListaDeMedios(data.info);
        });
    }

    $scope.dataListaMedios = {
    opciones: [],
    seleccionado: {}
    };
    
    $scope.dataListaMedios.opciones = reglasService.getListaDeMedios();

    if (reglasService.isModoEditar()){
        $scope.regla_seleccionada.segundos = $scope.regla_seleccionada.acciones[0].tiempo;

        // tengo que armar un array para esto !!
        var arrayParaSeleccionMedios = [];
        angular.forEach($scope.regla_seleccionada.medios, function(value,key){
          console.log(reglasService.getMedio(value))
          arrayParaSeleccionMedios.push(reglasService.getMedio(value));
        }
        )
        $scope.dataListaMedios.seleccionado = arrayParaSeleccionMedios;

    }

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

        var listaDeMediosParaEnviar =  [];
        angular.forEach($scope.dataListaMedios.seleccionado, function(value,key)
        {
            listaDeMediosParaEnviar.push(value.nombre);
        }
        );
        //debugger;
        //console.log($scope.dataListaMedios.seleccionado);
        var listaDeAccionesParaEnviar = [];
        //debugger;
        if ($scope.regla_seleccionada.segundos == undefined)
        {
          $scope.regla_seleccionada.segundos = 0;
        }
        listaDeAccionesParaEnviar = [{"accion": $scope.dataListaAcciones.seleccionado.id, "tiempo": $scope.regla_seleccionada.segundos}];
      //Hay que usar $scope.regla_seleccionado
      var data = {
        "usuario_exec" : $scope.nombreUsuario,
        "rol_exec" : $scope.rolUsuario,
        "nombre" : $scope.regla_seleccionada.nombre,
        "condicion" : $scope.regla_seleccionada.condicion,
        "orden" : $scope.regla_seleccionada.orden,
        "medios" : listaDeMediosParaEnviar,
        "acciones" : listaDeAccionesParaEnviar
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