'use strict';

angular.module('rac')
      .service('mediosService',function(){
        var datos= {};     
        datos.medio = undefined;
        datos.modo  = undefined;
        return{
            getMedio: function(){
                return datos.medio;
            },
            setMedio: function(value){
                datos.medio=value;
            },
            getModo: function(){
                return datos.modo;
            },
            setModo: function(value){
                datos.modo = value;
            }
        };
   })
   
