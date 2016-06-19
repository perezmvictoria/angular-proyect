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
            getModo: function(){
                return datos.modo;
            },
            setModo: function(value){
                datos.modo = value;
            }
        };
   })
   
