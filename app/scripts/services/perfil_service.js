'use strict';

angular.module('rac')
    .service('perfilService',function(){
        var perfil= {};
        perfil.rolesUsuario = "";
        perfil.usuario = {};
        perfil.usuario.password = "";
        perfil.listaUsuarios = "";
        perfil.datosPerfil = "";
        perfil.permisos = "";

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
        //ruta christian
        //perfil.ruta = "http://192.168.1.2:5000";
        //perfil.ruta = __env.rutaServer;
        //ruta prod
       // perfil.ruta="http://190.64.30.85:5000";

        return{
            setRuta : function(ruta){
                perfil.ruta = ruta;
            },
            setPermisos: function(permisos){
                perfil.permisos = permisos;
            },
            getPermisos: function(){
                return perfil.permisos;
            },
            getPermiso: function(permiso){
                var retorno = false;
                if(perfil.permisos.indexOf(permiso) !== -1) {
                    retorno = true;
                }
                return retorno;
            },
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
            setDatosPerfil: function(datos){                
                perfil.datosPerfil = datos;
            },
            getDatosPerfil: function(){                
                return perfil.datosPerfil;
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
