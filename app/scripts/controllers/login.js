'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */

angular.module('yapp')
  .controller('LoginCtrl', function($scope, $location, $http) {

  	$scope.mLogin = function () {
  		var config = {
  			headers : {
  				'Content-Type' : 'application/json; charset=utf-8'
  			}
  		}

  		var data = {
			"usuario" : $scope.usuario,
			"contrasenia" : $scope.contrasenia
		}
  		$http.post('http://192.168.1.108:5000/perfil/iniciar_sesion', data, config)
    	.success(function (data, status, headers, config) {
			$scope.PostDataResponse = data;
			//console.log(data);
			$location.path('/dashboard');
        	})
    	.error(function (data, status, header, config) {
        	$scope.ResponseDetails = "Data: " + data +
				"<hr />status: " + status +
            	"<hr />headers: " + header +
            	"<hr />config: " + config;
        	});
    	};
  });