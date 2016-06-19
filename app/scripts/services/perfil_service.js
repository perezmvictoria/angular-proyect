'use strict';

angular.module('rac')
    .service('perfilService',function(){
        var perfil= {};        
        perfil.nombre_usuario = "";
        perfil.rol_usuario    = "";
        perfil.token          = "";

        perfil.config = {
                            headers : {
                                'Content-Type' : 'application/json; charset=utf-8'
                            }
                        };
        perfil.data = {
                            "usuario_exec":"superrac",
                            "rol_exec":"super_admin"
                      };
        //ruta local
        //perfil.ruta = "http://192.168.1.108:5000";                      
        //ruta testing
        perfil.ruta = "http://190.64.30.76:5000";

        
        return{
            getRuta: function(){
                return perfil.ruta;
            },
            getConfig: function(){
                return perfil.config;
            },
            getData: function(){
                return perfil.data;
            },
            getNombreUsuario: function(){
                return perfil.nombre_usuario;
            },
            getRolUsuario: function(){
                return perfil.rol_usuario;
            },
            getToken: function(){
                return perfil.token;
            },
            setPerfil: function(nombre,rol,token){
               perfil.nombre_usuario = nombre;
               perfil.rol_usuario    = rol;
               perfil.token          = token;
            }
        };
   })