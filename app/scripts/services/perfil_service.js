'use strict';

angular.module('rac')
    .service('perfilService',function(){
        var perfil= {};
        perfil.rolesUsuario = "";
        perfil.usuario = {};
        perfil.usuario.password = "";
        perfil.listaUsuarios = "";

        perfil.config = {
                            headers : {
                                'Content-Type' : 'application/json; charset=utf-8'
                            }
                        };
        perfil.data = {
                            "usuario_exec":perfil.usuario.nombre,
                            "rol_exec":perfil.usuario.rol
                      };
        //ruta local
        //perfil.ruta = "http://192.168.1.149:5000";
        //ruta testing
        perfil.ruta = "http://190.64.30.76:5000";
        return{
            getUsuario: function(){
                return perfil.usuario;
            },
            setUsuario: function(value){
                perfil.usuario = value;
            },            
            setPerfil: function(nombre,rol,token){
                perfil.usuario.nombre = nombre;
                perfil.usuario.rol    = rol;
                perfil.token          = token;
            },
            setRolesUsuario: function(roles){                
                perfil.rolesUsuario = roles;
            },
            getRolesUsuario: function(){                
                return perfil.rolesUsuario;
            },
            setListaUsuarios: function(usuarios){                
                perfil.listaUsuarios = usuarios;
            },
            getListaUsuarios: function(){                
                return perfil.listaUsuarios;
            },
            getRuta: function(){
                return perfil.ruta;
            },
            getConfig: function(){
                return perfil.config;
            },
            getData: function(){
                return perfil.data;
            },            
            validarSesion: function($location){                
                if ((perfil.usuario == null || perfil.usuario.nombre == undefined )){
                    $location.path('/login');
                    return "/login";                    
                }
                return false;
                
            }
        };
   })