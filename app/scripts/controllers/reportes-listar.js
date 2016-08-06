'use strict';

angular.module('rac')
  .controller('ReportesListarCtrl', function(perfilService,$scope, $state,$location,$http) {
    perfilService.validarSesion($location);
    $scope.msjerror = "";
    $scope.nombreUsuario = perfilService.getUsuario().nombre;
    $scope.rolUsuario    = perfilService.getUsuario().rol;
    $scope.datos = {};
    $scope.listaUsuarios = "";
    
    $scope.filtro = { fechaIni :'',
        fechaFin :'',
        tecnico  :'',
        estado   :'',
    };

    $scope.lstTecnicos = {
      opciones: [],
      seleccionado: {}
    };

    //if (perfilService.getListaUsuarios.length == 0){

      var dataPost = {
        "usuario_exec":$scope.nombreUsuario,
        "rol_exec":$scope.rolUsuario
      } 



      $http.post(perfilService.getRuta()+'/usuarios/listar_usuarios', 
        dataPost,perfilService.getConfig())
        .then(function (response){
          //debugger;
          perfilService.setListaUsuarios(response.data.info);       
        }, function (error){
          var data = error.data;
          $scope.msjerror = "Error en carga de datos";
        }

      
      );


/*
        .success(function (data, status, headers, config) {  
        })
        .error(function (data, status, header, config) {          
          $scope.msjerror = "No se pudo cargar la lista de usuarios";          
        })*/
    //}

    $scope.lstTecnicos.opciones = perfilService.getListaUsuarios();

    $scope.lstEstado = [
        { 'id': '1', 'nombre': 'Esperar' },
        { 'id': '2', 'nombre': 'Consolidar' },
        { 'id': '3', 'nombre': 'Descartar' }
    ];

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
