import React, { useReducer } from 'react';


import ProyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import {FORMULARIO_PROYECTO,OBTENER_PROYECTOS,AGREGAR_PROYECTO,
    PROYECTO_ACTUAL,ELIMINAR_PROYECTO,PROYECTO_ERROR} from '../../types';
import clienteAxios from '../../config/axios';


const ProyectoState = props =>{
 


    const initialState ={
        
        proyectos :[],
        formulario : false,
        proyecto : null,
        mensaje: null
    }
    //Dispatch para ejecutar las acciones 

    const [state, dispatch] = useReducer (ProyectoReducer,initialState)

    // Serie de funciones para el CRUD


    const mostrarFormulario = () =>{

        dispatch({

            type: FORMULARIO_PROYECTO
            
        })
    }

    const obtenerProyectos = async () => {

        try {
            const resultado = await clienteAxios.get('/api/proyectos')
         

            dispatch ({
                type: OBTENER_PROYECTOS,
                payload: resultado.data.proyectos
            })
        } catch (error) {
            const alerta ={
                msg:'Hubo un error',
                categoria:'alerta-error'
            }
        
           dispatch({
               type:PROYECTO_ERROR,
               payload: alerta
           })
        }
      
    }

    //Agregar nuevo proyecto

const agregarProyecto = async proyecto =>{

         try {
            
            const resultado = await clienteAxios.post('/api/proyectos', proyecto)
            console.log(resultado);
            dispatch({
                type:AGREGAR_PROYECTO,
                payload: resultado.data
            })
        } catch (error) {
            const alerta ={
                msg:'Hubo un error',
                categoria:'alerta-error'
            }
        
           dispatch({
               type:PROYECTO_ERROR,
               payload: alerta
           })
        }
}
    //Selecciona el Proyecto
const proyectoActual = proyectoId =>{
    dispatch({
        type:PROYECTO_ACTUAL,
        payload: proyectoId
    })
}
//ELimina un proyecto

    const eliminarProyecto = async proyectoId =>{
        try {
            await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispatch({
                type:ELIMINAR_PROYECTO,
                payload:proyectoId
            })
        } catch (error) {
            const alerta ={
                msg:'Hubo un error',
                categoria:'alerta-error'
            }
        
           dispatch({
               type:PROYECTO_ERROR,
               payload: alerta
           })
        }
        
       

    }

    return(

        <ProyectoContext.Provider
        
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                mensaje: state.mensaje,
                obtenerProyectos,
                agregarProyecto,
                proyectoActual,
                eliminarProyecto
            }}>
                {props.children}
        
        

           
        </ProyectoContext.Provider>


    )


}

export default ProyectoState;