'use strict';

angular.module('rac')
      .service('reglasService',function(){
        var datos= {};     
        datos.regla = "";
        datos.modoEditar  = false;
        return{
            getRegla: function(){
                return datos.regla;
            },
            setRegla: function(value){
                datos.regla=value;
            },
            isModoEditar: function(){
                return datos.modoEditar;
            },
            setModoEditar: function(value){
                datos.modoEditar = value;
            }
        };
   })
   
