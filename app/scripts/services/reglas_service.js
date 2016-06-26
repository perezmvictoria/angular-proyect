'use strict';

angular.module('rac')
      .service('reglasService',function(){
        var datos= {};     
        datos.regla = undefined;
        datos.modo  = undefined;
        return{
            getRegla: function(){
                return datos.regla;
            },
            setRegla: function(value){
                datos.regla=value;
            },
            isModoEditar: function(){
                return datos.modo;
            },
            setModoEditar: function(value){
                datos.modo = value;
            }
        };
   })
   
