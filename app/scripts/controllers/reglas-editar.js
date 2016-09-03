/*
Controller reglas-editar
*/
'use strict';

angular.module('rac')
  .controller('ReglasEditarCtrl', function(perfilService,reglasService,$scope, $state, $location, $http) {
    perfilService.validarSesion($location);

    $scope.regla_seleccionada =  reglasService.getRegla();
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.msjerror = "Ups! Ha ocurrido un error";

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
        }).error(function(data) {
            $scope.msjerror=data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);
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

        var condicionDeRegla = $scope.regla_seleccionada.condicion;
        var inicioTrigger = condicionDeRegla.indexOf("<trigger>");
        $scope.regla_seleccionada.evento = condicionDeRegla.substr(inicioTrigger + 9, condicionDeRegla.length - inicioTrigger - 19);
        $scope.regla_seleccionada.condicion = condicionDeRegla.substr(0+7,inicioTrigger - 15);

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
        
        // esto es para evitar que guarde undefined en la base cuando es una regla de tipo
        // descartar
        if ($scope.regla_seleccionada.evento == undefined){
            $scope.regla_seleccionada.evento = "";
        }

        var condicion = "<regla>" + $scope.regla_seleccionada.condicion + "</regla><trigger>" + $scope.regla_seleccionada.evento + "</trigger>";

        var data = {
            "usuario_exec" : $scope.nombreUsuario,
            "rol_exec" : $scope.rolUsuario,
            "nombre" : $scope.regla_seleccionada.nombre,
            "condicion" : condicion,
            "orden" : $scope.regla_seleccionada.orden,
            "medios" : listaDeMediosParaEnviar,
            "acciones" : listaDeAccionesParaEnviar
        }
        $http.post(perfilService.getRuta()+'/reglas/crear_regla', data, perfilService.getConfig())
        .success(function (data, status, headers, config) {
        }).error(function(data) {
            $scope.msjerror=data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);
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
        // esto es para evitar que guarde undefined en la base cuando es una regla de tipo
        // descartar
        if ($scope.regla_seleccionada.evento == undefined){
            $scope.regla_seleccionada.evento = "";
        }

        // si la accion es esperar y el tiempo es 0 no mando trigger
        if ($scope.dataListaAcciones.seleccionado.nombre == "esperar" && $scope.regla_seleccionada.segundos == 0)
        {
            var condicion = "<regla>" + $scope.regla_seleccionada.condicion + "</regla><trigger></trigger>";
        }
        else
        {
            var condicion = "<regla>" + $scope.regla_seleccionada.condicion + "</regla><trigger>" + $scope.regla_seleccionada.evento + "</trigger>";
        }

        var data = {
            "usuario_exec" : $scope.nombreUsuario,
            "rol_exec" : $scope.rolUsuario,
            "nombre" : $scope.regla_seleccionada.nombre,
            "condicion" : condicion,
            "orden" : $scope.regla_seleccionada.orden,
            "medios" : listaDeMediosParaEnviar,
            "acciones" : listaDeAccionesParaEnviar
        }

        $http.post(perfilService.getRuta()+'/reglas/editar_regla', data, perfilService.getConfig())
        .success(function (data, status, headers, config) {
        }).error(function(data) {
            $scope.msjerror=data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);
        });

    }   
    $location.path('/dashboard/reglas-listar');
    return "'/dashboard/reglas-listar'";
    }
});