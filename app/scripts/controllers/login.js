'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('rac')
  .controller('LoginCtrl', function($scope, $location, $http) {

  	$scope.mLogin = function () {

      if ($scope.validate()){
          $location.path('/dashboard');
      }



    };
     


    $scope.validate=function(){
          return $scope.loginForm.$valid;
    };



    
  });


 /*   var config = {
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
      console.log(data);
    
      $location.path('/dashboard');
          })
      .error(function (data, status, header, config) {
          $scope.ResponseDetails = "Data: " + data +
        "<hr />status: " + status +
              "<hr />headers: " + header +
              "<hr />config: " + config;
          });*/