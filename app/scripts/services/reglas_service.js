'use strict';

angular.module('rac')
      .service('reglasService',function(){
        var datos= {};     
        datos.regla = "";
        datos.modoEditar  = false;
        var listaDeMedios = undefined;

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
            },
            setListaDeMedios: function(lista){
                listaDeMedios = lista;
            },
            getListaDeMedios: function(){
                return listaDeMedios;
            },
            getMedio: function(medio){
                var retorno = "";
                if (listaDeMedios != undefined){
                    angular.forEach(listaDeMedios, function(value,key)
                    {
                        if (value.nombre == medio){
                            retorno = value;
                        }
                    })
                }
                return retorno;
            }
        };
   })
   
