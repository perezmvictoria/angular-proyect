'use strict';

angular.module('rac')
      .service('mediosService',function(){
        var datos= {};     
        datos.medio = undefined;
        datos.modoEditar = false;     
        return{
            getMedio: function(){
                return datos.medio;
            },
            setMedio: function(value){
                datos.medio=value;
            },
            isModoEditar: function(){
                return datos.modo;
            },
            setModoEditar: function(value){
                datos.modoEditar = value;
            }
        };
   })
   
