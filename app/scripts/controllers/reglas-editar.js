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
       { 'id': '1', 'nombre': 'esperar' },
       { 'id': '2', 'nombre': 'descartar' },
       { 'id': '3', 'nombre': 'consolidar' }
    ];
    $scope.dataListaAcciones = {
      opciones: [],
      seleccionado: {}
    }
    $scope.dataListaAcciones.opciones = $scope.lstAccion;
    
     //debugger;
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

    $scope.dataListaMedios = {
    opciones: [],
    seleccionado: {}
    };
    
    $scope.dataListaMedios.opciones = reglasService.getListaDeMedios();

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

        var listaDeMediosParaEnviar =  [];
        angular.forEach($scope.dataListaMedios.seleccionado, function(value,key)
          {
            listaDeMediosParaEnviar.push(value.nombre);

            //console.log(listaDeMediosParaEnviar);
          }
          );
  
        var listaDeAccionesParaEnviar = [];
        //listaDeAccionesParaEnviar.push(1);
        //console.log(listaDeAccionesParaEnviar);
        listaDeAccionesParaEnviar = [{"accion": "2", "tiempo": $scope.regla_seleccionada.segundos}];
      //Hay que usar $scope.regla_seleccionado
      //debugger;
      var data = {
        "usuario_exec" : $scope.nombreUsuario,
        "rol_exec" : $scope.rolUsuario,
        "nombre" : $scope.regla_seleccionada.nombre,
        "condicion" : $scope.regla_seleccionada.condicion,
        //"descripcion":
        "orden" : "1",
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