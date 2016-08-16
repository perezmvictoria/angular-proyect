'use strict';

angular.module('rac')
  .controller('ReportesListarCtrl', function(perfilService,$scope, $state,$location,$http) {
    perfilService.validarSesion($location);
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.datos = {};
    $scope.listaUsuarios = "";

    $scope.msjerror = "Ups! Ha ocurrido un error";
      var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      } 

    $http.post(perfilService.getRuta()+'/usuarios/listar_usuarios_nombres', 
          dataPost,perfilService.getConfig())
      .success(function (data, status, headers, config) {         
      $scope.listaDeUsuarios = data.info;        
      return false;
      })
    .error(function (data, status, header, config) {
        $scope.msjerror = data.error;
        $scope.msjerror= $scope.msjerror.split(":").pop();
        alert($scope.msjerror);
        return false;
    })

    $scope.tecnicos = {
      opciones : [],
      seleccionado : {}
    };

    $scope.tecnicos.opciones = $scope.listaDeUsuarios;
    
    $scope.dataListaEstados = {
      opciones: [ { 'id': '3', 'nombre': 'resuelta' },
                  { 'id': '4', 'nombre': 'cancelada' } ],
      seleccionado: { 'id': '3', 'nombre': 'resuelta' }
    }

    $scope.dataListaFiltro = {
      opciones: [{ 'id': 1, 'nombre': 'fecha' },
                { 'id': 2, 'nombre': 'técnico' },
                { 'id': 3, 'nombre': 'estado' }],
      seleccionado: { 'id': 1, 'nombre': 'fecha' }
    }

    $scope.onFocusDeTecnicos = function()
    {
      $scope.tecnicos.opciones = $scope.listaDeUsuarios;
      if ($scope.tecnicos.opciones.length > 0){
        $scope.tecnicos.seleccionado = { 'usuario': $scope.tecnicos.opciones[0].usuario };
      }      
    }

    $scope.onFocusDeFiltro = function()
    {
      $scope.tecnicos.opciones = $scope.listaDeUsuarios;
      if ($scope.tecnicos.opciones.length > 0){
        $scope.tecnicos.seleccionado = { 'usuario': $scope.tecnicos.opciones[0].usuario };
      }      
    }

    $scope.fechaInValida = function (){
        var retorno =false;
        if ($scope.desde > $scope.hasta ){
          retorno=true;
        }
        return retorno;
    }

    $scope.ejecutarReporte = function(){

      if ($scope.dataListaFiltro.seleccionado.nombre == 'fecha'){
        // reporte por fecha

        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "fecha_inicio": $scope.desde,
          "fecha_fin": $scope.hasta
        };

        $http.post(perfilService.getRuta()+'/reportes/listar_reporte_fecha', 
          dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
          $scope.datos = data.info;
          return false;
          })
        .error(function (data, status, header, config) {
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);
            return false;
        })


      }
      else if ($scope.dataListaFiltro.seleccionado.nombre == 'técnico'){

        // reporte por tecnico

        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "usuario": $scope.tecnicos.seleccionado.usuario
        };
        $http.post(perfilService.getRuta()+'/reportes/listar_reporte_usuario', 
          dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
          $scope.datos = data.info;
          return false;
          })
        .error(function (data, status, header, config) {
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror); 
            return false;
        })

      } else if ($scope.dataListaFiltro.seleccionado.nombre == 'estado') {

        // reporte por estado

        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "estado": $scope.dataListaEstados.seleccionado.id
        };
        $http.post(perfilService.getRuta()+'/reportes/listar_reporte_estado', 
          dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
          $scope.datos = data.info;
          return false;
          })
        .error(function (data, status, header, config) {
            $scope.msjerror = data.error;
            $scope.msjerror= $scope.msjerror.split(":").pop();
            alert($scope.msjerror);     
            return false;
        })
      }
    }    
});
