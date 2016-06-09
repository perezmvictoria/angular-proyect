'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('rac')
  .controller('UsuariosCtrl', function($scope, $http) {


//    $scope.$state = $state;
//usuario_exec
//rol_exec

  	$scope.listarUsuarios = function () {

		$http.get('http://192.168.1.108:5000/usuarios/listar_usuarios', {params:{"usuario_exec":"superrac","rol_exec":"super_admin"}}).
        success(function(data) {
			console.log(data);
            //$scope.greeting = data;
        });

//$http.get("/url/to/resource/", {params:{"param1": val1, "param2": val2}})
    //.then(function (response) { /* */ })...


  		/*$http.post('http://192.168.1.108:5000/usuarios/listar_usuarios', data, config)
    	.success(function (data, status, headers, config) {
			$scope.PostDataResponse = data;
			console.log(data);
			$location.path('/dashboard');
        	})
    	.error(function (data, status, header, config) {
        	$scope.ResponseDetails = "Data: " + data +
				"<hr />status: " + status +
            	"<hr />headers: " + header +
            	"<hr />config: " + config;
        	});*/
    	};
  });
