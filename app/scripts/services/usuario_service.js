'use strict';

angular.module('rac')
      .service('usuarioService',function(){
        var datos = {};
        datos.usuario = "";
        datos.modoEditar = false;
        return{
            getUsuario: function(){
                return datos.usuario;
            },
            setUsuario: function(value){
                datos.usuario=value;
            },
            isModoEditar: function(){
                return datos.modoEditar;
            },
            setModoEditar: function(value){
                datos.modoEditar = value;
            }
        };
   })
   
