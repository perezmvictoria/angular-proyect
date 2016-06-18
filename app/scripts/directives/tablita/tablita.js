'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('racApp')
    .controller('Tablita',function($scope){
          $scope.holi = 'FUNCIONAAA';
     })
    .directive('tablita',function() {
    	return {
  		templateUrl:'scripts/directives/tablita/tablita.html',
  		restrict:'E',
  		link: function(scope, elem, attrs){
          scope.holi = 'chau';        
      }		  		
  	}
  });
