'use strict';

angular.module('rac')
  .controller('ReglasEditarCtrl', function(perfilService,reglasService,$scope, $state, $location, $http) {
    perfilService.validarSesion($location);

    $scope.regla_seleccionada =  reglasService.getRegla();
    $scope.msjerror = ""; 
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;

    // estructura para manejar el combo box de acciones
    $scope.dataListaAcciones = {
      opciones: [{ 'id': 1, 'nombre': 'esperar' },
                { 'id': 2, 'nombre': 'descartar' },
                { 'id': 3, 'nombre': 'consolidar' }],
      seleccionado: { 'id': 2, 'nombre': 'descartar' }
    }

    // estructura para manejar el textbox de lista de medios
    // lo defino con opciones vacio para luego llenarlo con datos que se consultaron
    // en el server
    $scope.dataListaMedios = {
        opciones: [],
        seleccionado: {}
    };

    // La consulta al web service solo se realiza si la lista de medios de reglasService está vacio
    // no debería ejecutar nunca, porque esto ya lo debe realizar desde reglas-listar
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
    
    // Seteo la lista de opciones de medios del reglas-service
    $scope.dataListaMedios.opciones = reglasService.getListaDeMedios();

    if (reglasService.isModoEditar()){
        $scope.regla_seleccionada.segundos = $scope.regla_seleccionada.acciones[0].tiempo;
        // armo un array con los objetos completos para seleccionar medios
        var arrayParaSeleccionMedios = [];
        angular.forEach($scope.regla_seleccionada.medios, function(value,key){
          arrayParaSeleccionMedios.push(reglasService.getMedio(value));
        }
        )
        $scope.dataListaMedios.seleccionado = arrayParaSeleccionMedios;
        // para seleccionar accion
        $scope.dataListaAcciones.seleccionado = { 'nombre': $scope.regla_seleccionada.acciones[0].accion_nombre };
    }

    $scope.modoEditar = function(){
      return reglasService.isModoEditar();
    }

  $scope.cancelar = function(){
    reglasService.setRegla(undefined); // seteo la regla actual en undefined
    $location.path('/dashboard/reglas-listar');
    return "'/dashboard/reglas-listar'";
  }
  
  $scope.generarRegla = function () {

    if(!reglasService.isModoEditar()){ // Si estoy creando la regla
        // Armo una array con la lista de medios para enviar en el web service.
        // Solo tengo que enviar el nombre del medio, por eso es otro array distinto al que
        // maneja el textbox {"medio001","medio002","medio003"}
        var listaDeMediosParaEnviar =  [];
        angular.forEach($scope.dataListaMedios.seleccionado, function(value,key){
                listaDeMediosParaEnviar.push(value.nombre);
            }
        );

        // armo un array con la lista de acciones para enviar.
        // en este caso es un array con una unica accion
        // {"accion: nombreDeLaAccion,tiempo: segundos"}
        var listaDeAccionesParaEnviar = [];
        if ($scope.regla_seleccionada.segundos == undefined){
            $scope.regla_seleccionada.segundos = 0;
        }
        listaDeAccionesParaEnviar = [{"accion": $scope.dataListaAcciones.seleccionado.id, "tiempo": $scope.regla_seleccionada.segundos}];
      
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
    }
    else { // Si estoy editando la regla
        // Armo una array con la lista de medios para enviar en el web service.
        // Solo tengo que enviar el nombre del medio, por eso es otro array distinto al que
        // maneja el textbox {"medio001","medio002","medio003"}
        var listaDeMediosParaEnviar =  [];
        angular.forEach($scope.dataListaMedios.seleccionado, function(value,key)
        {
            listaDeMediosParaEnviar.push(value.nombre);
        }
        );

        // armo un array con la lista de acciones para enviar.
        // en este caso es un array con una unica accion
        // el tipo de accion no cambia, el combo box está deshabilitado
        // {"accion: nombreDeLaAccion,tiempo: segundos"}
        var listaDeAccionesParaEnviar = [];
        if ($scope.regla_seleccionada.segundos == undefined)
        {
          $scope.regla_seleccionada.segundos = 0;
        }
        listaDeAccionesParaEnviar = [{"accion": $scope.regla_seleccionada.acciones[0].accion_valor, "tiempo": $scope.regla_seleccionada.segundos}];

        var data = {
            "usuario_exec" : $scope.nombreUsuario,
            "rol_exec" : $scope.rolUsuario,
            "nombre" : $scope.regla_seleccionada.nombre,
            "condicion" : $scope.regla_seleccionada.condicion,
            "orden" : $scope.regla_seleccionada.orden,
            "medios" : listaDeMediosParaEnviar,
            "acciones" : listaDeAccionesParaEnviar
        }
        $http.post(perfilService.getRuta()+'/reglas/editar_regla', data, perfilService.getConfig())
        .success(function (data, status, headers, config) {

          });
    }   
    $location.path('/dashboard/reglas-listar');
    return "'/dashboard/reglas-listar'";
    }
});