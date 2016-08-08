'use strict';

angular.module('rac')
  .controller('AuditoriasListarCtrl', function(perfilService,$scope, $state,$http,$location) {
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    perfilService.validarSesion($location);
    $scope.msjerror = "";
    $scope.listaDeUsuarios = "";

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
        alert(data.error);
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

    $scope.lstAccion = [
        { 'id': '1', 'nombre': 'Esperar' },
        { 'id': '2', 'nombre': 'Consolidar' },
        { 'id': '3', 'nombre': 'Descartar' }
    ];
    
    $scope.onFocusDeTecnicos = function()
    {
      $scope.tecnicos.opciones = $scope.listaDeUsuarios;
    }

    $scope.listarAuditoria = function () {
    var dataPost = {
          "usuario_exec":$scope.nombreUsuario,
          "rol_exec":$scope.rolUsuario
    } 
    $http.post(perfilService.getRuta()+'/auditorias/listar_auditorias', 
    	dataPost,perfilService.getConfig())
    .success(function (data, status, headers, config) {    			
				$scope.datos = data.info;      
				return false;
       	})
    	.error(function (data, status, header, config) {          
          $scope.msjerror = "No se pudo cargar la lista de auditorias";          
          return false;
      })
    }

    $scope.listarAuditoria();

  });
