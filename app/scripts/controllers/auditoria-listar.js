'use strict';

angular.module('rac')
  .controller('AuditoriasListarCtrl', function(perfilService,$scope, $state,$http,$location) {
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    perfilService.validarSesion($location);
    $scope.msjerror = "";
    $scope.listaDeUsuarios = "";
    $scope.tienePermiso=true;

    var dataPost = {
      "usuario_exec":$scope.nombreUsuario,
      "rol_exec":$scope.rolUsuario
    } 

    $http.post(perfilService.getRuta()+'/usuarios/listar_usuarios', 
          dataPost,perfilService.getConfig())
      .success(function (data, status, headers, config) {         
      $scope.listaDeUsuarios = data.info;        
      return false;
      })
    .error(function (data, status, header, config) {
        $scope.msjerror = "No se pudo cargar la lista de usuarios";          
        return false;
    })

    $scope.filtro = { fechaIni :'',
                      fechaFin :'',
                      tecnico  :'',
                      accion   :'',};

    $scope.tecnicos = {
      opciones : [],
      seleccionado : {}
    };

    $scope.tecnicos.opciones = $scope.listaDeUsuarios;

    $scope.dataListaAcciones = {
      opciones: [
          { 'id': '1', 'nombre': 'info' },
          { 'id': '2', 'nombre': 'error' },
        ],
      seleccionado: {}
    }
   
    $scope.dataListaFiltro = {
      opciones: [{ 'id': 1, 'nombre': 'fecha' },
                { 'id': 2, 'nombre': 'técnico' },
                { 'id': 3, 'nombre': 'acción' }],
      seleccionado: { 'id': 2, 'nombre': 'fecha' }
    }

    $scope.onFocusDeTecnicos = function()
    {
      $scope.tecnicos.opciones = $scope.listaDeUsuarios;
    }

    $scope.listarAuditoria = function () {

      if ($scope.dataListaFiltro.seleccionado.nombre == "fecha"){

        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "fecha_inicio": $scope.desde,
          "fecha_fin": $scope.hasta
        };

        $http.post(perfilService.getRuta()+'/auditorias/listar_auditoria_fecha', 
          dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
          $scope.datos = data.info;
          return false;
          }).error(function (data, status, header, config) {
                
            return false;
        })

      }
      else if ($scope.dataListaFiltro.seleccionado.nombre == "técnico") {

        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "usuario": $scope.tecnicos.seleccionado.usuario
        };
        $http.post(perfilService.getRuta()+'/auditorias/listar_auditoria_usuario', 
          dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
          $scope.datos = data.info;
          return false;
          }).error(function (data, status, header, config) {
               
            return false;
        })

      } 
      else if ($scope.dataListaFiltro.seleccionado.nombre == "acción"){

        var dataPost = {
          "usuario_exec": $scope.nombreUsuario,
          "rol_exec": $scope.rolUsuario,
          "tipo_accion": $scope.dataListaAcciones.seleccionado.nombre
        };
        $http.post(perfilService.getRuta()+'/auditorias/listar_auditoria_tipo_accion', 
          dataPost,perfilService.getConfig())
        .success(function (data, status, headers, config) {         
          $scope.datos = data.info;
          return false;
          }).error(function (data, status, header, config) {
                
            return false;
        })
        }
  }
});
