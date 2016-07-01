'use strict';

angular.module('rac')
    .service('perfilService',function(){
        var perfil= {};
        perfil.usuario = {}
        //perfil.usuario.nombre   = "";
        //perfil.usuario.rol      = "";
        //perfil.usuario.nombre   = "superrac";
        //perfil.usuario.rol      = "super_admin";
        perfil.usuario.password = "";
        perfil.token            = "";

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
        perfil.ruta = "http://192.168.1.108:5000";
        //ruta testing
        //perfil.ruta = "http://190.64.30.76:5000";
        
        return{
            getUsuario: function(){
                return perfil.usuario;
            },
            setUsuario: function(value){
                perfil.usuario = value;
            },            
            setPerfil: function(nombre,rol,token){
                //setea datos para mantener en la sesion
                perfil.usuario.nombre = nombre;
                perfil.usuario.rol    = rol;
                perfil.token          = token;
            },
            getRuta: function(){
                return perfil.ruta;
            },
            getConfig: function(){
                return perfil.config;
            },
            getData: function(){
                var retorno = {
                            "usuario_exec":perfil.usuario.nombre,
                            "rol_exec":perfil.usuario.rol
                      };
                return retorno;
            },
            getToken: function(){
                return perfil.token;
            }
        };
   })