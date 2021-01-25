import React,{useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {
    // obtener el state del proyecto
        const proyectosContext = useContext(ProyectoContext);
        const {proyectoActual} = proyectosContext;

    // obtener la funcion del context de tarea

        const tareasContext = useContext(TareaContext);
        const {obtenerTareas} = tareasContext


    //Funcion para agregar el proyecto actual
        const seleccionarProyecto = id =>{
            proyectoActual(id); // fijar un proyecto actual
            obtenerTareas(id);     //filtrar la tareas cuando se le da click

        }



   
    return (
        <li>

            <button
                type ="button"
                className = "btn btn-blank"
                onClick = {() => seleccionarProyecto(proyecto._id)}
            
    >{proyecto.nombre}</button>

        </li>
    );
}

export default Proyecto;