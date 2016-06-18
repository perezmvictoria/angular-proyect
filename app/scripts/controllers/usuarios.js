'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('yapp')
  .controller('UsuariosCtrl', function($scope, $location,$http) {
	$scope.listarUsuarios = function () {
		var config = {
  			headers : {
  				'Content-Type' : 'application/json; charset=utf-8'
  			}
  		}  		
		var data = {
 			"usuario_exec":"superrac",
 			"rol_exec":"super_admin"
		}
		var vm = this;
		vm.midata = [];

    	$http.post('http://192.168.1.108:5000/usuarios/listar_usuarios', data, config)
    		.success(function (data, status, headers, config) {
			//$scope.PostDataResponse = data;
			vm.midata = data;
			console.log(vm.midata);
			//$location.path('/dashboard');
			//$location.path('/usuarios');
        })
    	.error(function (data, status, header, config) {
	        $scope.ResponseDetails = "Data: " + data +
				"<hr />status: " + status +
	            "<hr />headers: " + header +
	            "<hr />config: " + config;
	        	});
			};
    $scope.listarUsuarios();
	});