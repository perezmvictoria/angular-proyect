'use strict';

angular.module('rac')
      .service('usuarioService',function(){
        var datos= {};        
        datos.usuario = "";        
        datos.modo = "";     
        return{
            getUsuario: function(){
                return datos.usuario;
            },
            setUsuario: function(value){
                datos.usuario=value;
            },
            getModo: function(){
                return datos.modo;
            },
            setModo: function(value){
                datos.modo = value;
            },
            setUsuario: function(value){
                datos.modo=value;
            }

        };
   })
   
