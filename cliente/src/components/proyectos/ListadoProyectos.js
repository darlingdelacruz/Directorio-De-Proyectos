import React,{useContext,useEffect} from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import AlertaContex from '../../context/alertas/alertaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoProyectos = () => {

//Trae los diferentes proyectos hacia aca

const proyectosContext = useContext(ProyectoContext);

//Revisar si tiene contenido

const {mensaje,proyectos,obtenerProyectos} = proyectosContext;
 
const alertaContext = useContext(AlertaContex);

const {alerta, mostrarAlerta} = alertaContext;


useEffect(()=>{
    if(mensaje){
        mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    obtenerProyectos();

  // eslint-disable-next-line
}, [mensaje] )

if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>;

    return (
        <ul className="listado-proyectos">
            {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>):null}
           <TransitionGroup>
                {proyectos.map(proyecto =>
            <CSSTransition
            key = {proyecto._id}
            timeout ={500}
            classNames = "proyecto"
                    
            >
               
                    
                        <Proyecto
                           
                            proyecto={proyecto}
                        
                        />
                
            </CSSTransition>
                )}
            </TransitionGroup> 
        </ul>
    );
}

export default ListadoProyectos;