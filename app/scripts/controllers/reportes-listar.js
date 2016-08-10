'use strict';

angular.module('rac')
  .controller('ReportesListarCtrl', function(perfilService,$scope, $state,$location,$http) {
    perfilService.validarSesion($location);
    $scope.msjerror = "";
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.datos = {};
    $scope.listaUsuarios = "";
    //cambiar al cablear
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
        //alert(data.error);
        $scope.msjerror = "No se pudo cargar la lista de usuarios";
        return false;
    })

   $scope.filtro = { fechaIni :'',
        fechaFin :'',
        tecnico  :'',
        estado   :'',
    };

    $scope.tecnicos = {
      opciones : [],
      seleccionado : {}
    };

    $scope.tecnicos.opciones = $scope.listaDeUsuarios;
    
    $scope.lstEstado = [
        { 'id': '1', 'nombre': 'resuelta' },
        { 'id': '2', 'nombre': 'cancelada' }
    ];

    $scope.dataListaFiltro = {
      opciones: [{ 'id': 1, 'nombre': 'fecha' },
                { 'id': 2, 'nombre': 'técnico' },
                { 'id': 3, 'nombre': 'estado' }],
      seleccionado: { 'id': 2, 'nombre': 'fecha' }
    }

    $scope.onFocusDeTecnicos = function()
    {
      $scope.tecnicos.opciones = $scope.listaDeUsuarios;
    }
    //if (perfilService.getListaUsuarios.length == 0){

/*
        .success(function (data, status, headers, config) {  
        })
        .error(function (data, status, header, config) {          
          $scope.msjerror = "No se pudo cargar la lista de usuarios";          
        })*/
    //}

    


          /*$scope.listarReportes = function () {

          $http.post(perfilService.getRuta()+'/55555555555555555/listar_auditorias', 
            perfilService.getData(),perfilService.getConfig())
            .success(function (data, status, headers, config) {         
            $scope.datos = data.info;        
            return false;
            })
            .error(function (data, status, header, config) {          
              $scope.msjerror = "No se pudo cargar la lista de usuarios";          
              return false;
            })
            }*/
          //$scope.listarReportes();
      });
