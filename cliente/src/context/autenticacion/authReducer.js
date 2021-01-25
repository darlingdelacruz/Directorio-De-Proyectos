
import { useCallback } from 'react';
import {REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SECCION} from '../../types';

export default (state, action) => {
    switch(action.type) {

            case REGISTRO_EXITOSO:
            case LOGIN_EXITOSO:
               localStorage.setItem('token', action.payload.token);
                return{
                     ...state,
                    token: null,
                    autenticado:true,
                    mensaje:null,
                    cargando:false
                }
                case OBTENER_USUARIO:
                    return{
                        ...state,
                        autenticado:true,
                        cargando:false,
                        usuario: action.payload
                    }
            case CERRAR_SECCION:
            case LOGIN_ERROR:
            case REGISTRO_ERROR: 
                localStorage.removeItem('token');
                return{
                    ...state,
                    token: null,
                    usuario: null,
                    autenticado:null,
                    cargando:false,
                    mensaje:action.payload
                }
        
        default:
            return state;
    }
}
