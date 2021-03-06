import React,{useContext} from 'react';
import TareaContext from '../../context/tareas/tareaContext';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
const Tarea = ({tarea}) => {


    // obtener el state del proyecto
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto} = proyectosContext;

      // obtener la funcion del context de tarea

      const tareasContext = useContext(TareaContext);
      const {eliminarTarea,obtenerTareas,actualizarTarea,guardarTareaActual} = tareasContext;

      const [proyectoActual] = proyecto;

    //Funcion que se ejecuta cuando el usuario presiona el btn de eliminar tarea  

        const tareaEliminar = id =>{
            eliminarTarea(id,proyectoActual._id);
            obtenerTareas(proyecto[0]._id)
        }

        // Función que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado) {
            tarea.estado = false;
        } else {
            tarea.estado = true
        }
        actualizarTarea(tarea);
    }


    // Selecciona la tarea actual
        const seleccionarTarea = tarea =>{
            guardarTareaActual(tarea);
        }

    return (
        <li className ="tarea sombra">
                <p>{tarea.nombre}</p>
                <div className="estado">

                    {tarea.estado
                    ?
                    (
                       <button
                            type ="button"
                            className ="completo"
                            onClick =  {() => cambiarEstado(tarea)}
                       >Completo</button> 
                    )
                    
                    :
                    (
                        <button
                        type="button"
                        className="incompleto"
                        onClick={() => cambiarEstado(tarea)}
                    >Incompleto</button>
                     )
                   
                }
                </div>

                <div className="acciones">

                    <button
                        type = "button"
                        className ="btn btn-primario"
                        onClick = {() => seleccionarTarea (tarea)}
                    >Editar</button>
                    <button
                        type = "button"
                        className ="btn btn-secundario"
                        onClick = {() => tareaEliminar(tarea._id)}
                    >Eliminar</button>
                </div>
        </li>
    );
}

export default Tarea;