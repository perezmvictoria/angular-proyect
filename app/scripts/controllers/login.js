'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('rac')
  .controller('LoginCtrl', function($scope, $location) {

	$scope.usuario ="fperalta";



    $scope.logueo = function() {

    //  $location.path('/notificaciones');

      return false;
    }

  });
