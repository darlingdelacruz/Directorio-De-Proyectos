import React,{useContext,useState,useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import TareaContext from '../../context/tareas/tareaContext';







const FormTarea = () => {
    const [error, guardarError] = useState (false);

    // Extrear si un proyecto esta activo
    const proyectosContext = useContext(ProyectoContext);
    const {proyecto} = proyectosContext;

    // obtener la funcion del context de tarea

    const tareasContext = useContext(TareaContext);
    const {tareaseleccionada,agregarTarea,errortarea,validarTarea,obtenerTareas,actualizaTarea} = tareasContext;

    //Efect que decteta si hay una tarea seleccionada


    useEffect(()=>{

        if(tareaseleccionada !== null){
            guardarTarea(tareaseleccionada)
        }
        else {
            guardarTarea({
                nombre: ''
            })
        }


    }, [tareaseleccionada]);

    //State del formulario

    const [ tarea, guardarTarea] = useState({

            nombre: ''
        })

    // Extraer el nombre del Proyecto

        const {nombre} = tarea;




    //Condicion si no hay proyecto
    if (!proyecto) return null


        // Array destructuring para extraer el proyecto actual

    const [proyectoActual] = proyecto;


            //Leer los valores del formulario

    const handleChange = e => {

        guardarTarea({
            ...tarea,
            [e.target.name ] : e.target.value
        })
                
            }



     
    const onSubmit = e =>{

        e.preventDefault();


        // validar

       // validar
       if(nombre.trim() === '' ) {
        validarTarea();
        return;
    }



          // Si es edición o si es nueva tarea
          if(tareaseleccionada === null ) {
            // agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            // actualizar tarea existente
            actualizaTarea(tarea);

            // Elimina tareaseleccionada del state
           
        }
        // Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual.id);

        // reiniciar el form
        guardarTarea({
            nombre: ''
        })
    }



return (
    <div className="formulario">
    <form
        onSubmit={onSubmit}
    >
        <div className="contenedor-input">
            <input 
                type="text"
                className="input-text"
                placeholder="Nombre Tarea..."
                name="nombre"
                value={nombre}
                onChange={handleChange}
            />
        </div>

        <div className="contenedor-input">
            <input 
                type="submit"
                className="btn btn-primario btn-submit btn-block"
                value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
            />
        </div>
    </form>

    {errortarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
</div>
    );
}

export default FormTarea;