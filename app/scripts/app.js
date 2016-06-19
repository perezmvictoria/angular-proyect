'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */
angular
  .module('rac', [
    'ui.router',
    'ngAnimate',
    'datatables'
  ]) 
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/notificaciones');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
<<<<<<< Updated upstream
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.html',
          controller: 'DashboardCtrl'
        })
          .state('usuarios', {
            url: '/usuarios',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/usuarios.html',
            controller: 'UsuariosCtrl'
          })
          .state('usuarios-edit', {
            url: '/usuarios-edit',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/usuarios-edit.html',
            controller: 'UsuariosCtrl'
          })
          .state('notificaciones', {
            url: '/notificaciones',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/notificaciones.html'
          })
          .state('reportes', {
            url: '/reportes',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reportes.html'
          })
          .state('reglas', {
            url: '/reglas',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reglas.html'
          })
           .state('reglas-edit', {
            url: '/reglas-edit',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reglas-edit.html'
          })
          .state('medios', {
            url: '/medios',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/medios.html'
          })
          .state('auditorias', {
            url: '/auditorias',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/auditorias.html'
          });
  });
