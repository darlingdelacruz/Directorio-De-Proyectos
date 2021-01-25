import React, {Fragment,useContext} from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const ListadoTareas = () => {



      // obtener la tareas del proyecto

      const tareasContext = useContext(TareaContext);
      const {tareasproyecto} = tareasContext

     // obtener el state del proyecto
      const proyectosContext = useContext(ProyectoContext);
      const {proyecto,eliminarProyecto} = proyectosContext;


      //Condicion si no hay proyecto


      if (!proyecto) return <h2>Selecciona un proyecto</h2>


    //Array destructuring para extraer el proyecto actual

    const [proyectoActual] = proyecto;



  
    const onclickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)
    }
    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre} </h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>) 
                    : 
                    <TransitionGroup>
                    {tareasproyecto.map(tarea => (
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea 
                                tarea={tarea}
                            />
                        </CSSTransition>
                    ))}
                    </TransitionGroup>
                }
            </ul>

            <button     
                type="button"
                className="btn btn-eliminar"
                onClick={onclickEliminar}
            >Eliminar Proyecto &times;</button>
        </Fragment>
    );
}

export default ListadoTareas;