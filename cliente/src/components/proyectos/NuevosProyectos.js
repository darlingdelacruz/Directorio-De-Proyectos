import React, {Fragment,useState,useContext} from 'react';

import ProyectoContext from '../../context/proyectos/ProyectoContext';



const NuevosProyectos = () => {


    const proyectosContext = useContext(ProyectoContext);

    const {formulario,mostrarFormulario,agregarProyecto} = proyectosContext;
   
    const [proyecto,guardarProyecto] = useState({

        nombre:''

    });
    const [error, guardarError] = useState (false);
    const {nombre} = proyecto;
   
   
    const onChange = e =>{
     guardarProyecto({
         ...proyecto,
        [e.target.name] : e.target.value})
        


        
   }

   //declarar el error
   
   const onsubmit = e => {
        e.preventDefault();

        
        if(nombre === '') 
        
        {
            guardarError(true);
            return;
        }

        agregarProyecto(proyecto)
        guardarProyecto({

            nombre: ''

        }

        )

        guardarError(false);
        
   }

  
   
    return (

        <Fragment>
            <button
            type="button"
            className="btn btn-block btn-primario"
            onClick ={()=>mostrarFormulario()}
            >Nuevo Proyecto</button>

           {formulario ? (<form 
            className="formulario-nuevo-proyecto"
                onSubmit ={onsubmit}
           >
               <input
                type="text"
                className="input-text"
                name ="nombre"
                value= {nombre}
                onChange ={onChange}
                placeholder ="Nombre Proyecto"
               
               />

                <input
                    type="submit"
                    className="btn btn-block btn-primario"
                    value ="Agregar Proyecto"
                
                />
           </form> ):
           
           null } 

           {error ? <p className='mensaje error'>El nombre del Proyecto es obligatorio</p>: null}

           
           
          


        </Fragment>
        
    );
}

export default NuevosProyectos;