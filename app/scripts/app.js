'use strict';

angular
  .module('rac', [
    'ui.router',
    'ngAnimate',
    'datatables'
  ]) 
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/notificaciones-listar');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
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

          .state('usuarios-listar', {
            url: '/usuarios-listar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/usuarios-listar.html',
            controller: 'UsuariosListarCtrl'
          })
          .state('usuarios-editar', {
            url: '/usuarios-editar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/usuarios-editar.html',
            controller: 'UsuariosEditarCtrl'
          })
          .state('usuarios-contrasenia', {
            url: '/usuarios-contrasenia',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/usuarios-contrasenia.html',
            controller: 'UsuarioscontraseniaCtrl'
          })       
          .state('perfil-editar', {
            url: '/perfil-editar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/perfil-editar.html',
            controller: 'PerfilEditarCtrl'
          })
          .state('perfil-contrasenia', {
            url: '/perfil-contrasenia',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/perfil-contrasenia.html',
            controller: 'PerfilContraseniaCtrl'
          })    

          .state('reglas-listar', {
            url: '/reglas-listar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reglas-listar.html',
            controller: 'ReglasListarCtrl'
          })
          .state('reglas-editar', {
            url: '/reglas-editar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reglas-editar.html',
            controller: 'ReglasEditarCtrl'
          })

          .state('medios-listar', {
            url: '/medios-listar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/medios-listar.html',
            controller: 'MediosListarCtrl'
          })
          .state('medios-editar', {
            url: '/medios-editar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/medios-editar.html',
            controller: 'MediosEditarCtrl'
          })

          .state('notificaciones-listar', {
            url: '/notificaciones-listar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/notificaciones-listar.html',
            controller: 'NotificacionesListarCtrl'
          })
          .state('reportes-listar', {
            url: '/reportes-listar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/reportes-listar.html',
            controller: 'ReportesListarCtrl'
          })
          .state('auditorias-listar', {
            url: '/auditorias-listar',
            parent: 'dashboard',
            templateUrl: 'views/dashboard/auditorias-listar.html',
            controller: 'AuditoriasListarCtrl'
          });
  });
