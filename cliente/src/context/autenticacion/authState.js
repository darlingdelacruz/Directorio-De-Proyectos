
import React, {useReducer} from 'react';
import authContext from './authContext';
import AuthReducer from './authReducer';

import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/token';

import {REGISTRO_EXITOSO,
    REGISTRO_ERROR,
   OBTENER_USUARIO,
    LOGIN_EXITOSO,
     LOGIN_ERROR,
    CERRAR_SECCION} from '../../types';




const AuthState = props =>{

    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        cargando:true,
        usuario: null, 
        mensaje: null
        
    }

    const [state, dispatch] = useReducer(AuthReducer,initialState);


    // Las funciones

    const registrarUsuario = async datos => {
        try{

            const respuesta  = await clienteAxios.post('/api/usuarios', datos);
            console.log(respuesta.data);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data 
            });

            //Obtener el usuario
            usuarioAutenticado();

        } catch (error){
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }
    //Retorna el usuario autenticado

    const usuarioAutenticado = async () =>{
        const token = localStorage.getItem('token');

        if(token){
            //TODO: FUNCION PARA ENVIAR EL TOKEN POR HEADERS
            tokenAuth(token);

        }
        try{
            const respuesta = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario

            })
            
        }catch(error){

            dispatch({
                type: LOGIN_ERROR
            })
        }
    }


    //Cuando el usuario inicia seccion  

    const iniciarSesion = async datos =>{
        try {

            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type:LOGIN_EXITOSO,
                payload: respuesta.data
            })
            
            //Obtener el usuario
            usuarioAutenticado();
            
        } catch (error) {
            console.log(error.response.data.msg);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    

      const cerrarSesion = () =>{
          dispatch({
            type:CERRAR_SECCION
          })
         
      }





    return(

            <authContext.Provider
            
            value ={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                registrarUsuario,
                usuarioAutenticado,
                cargando:state.cargando,
                iniciarSesion,
                cerrarSesion
           

            }}
            
            
            > {props.children}
              
            </authContext.Provider>


    )
}

export default AuthState;