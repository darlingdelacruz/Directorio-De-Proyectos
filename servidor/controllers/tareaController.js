const Tarea = require ('../models/Tarea');
const Proyecto = require('../models/Proyecto');
const { validationResult } = require('express-validator');


// Crea una nueva tarea

exports.crearTarea = async (req,res) =>{

    // revisar si hay errores
    const errores = validationResult(req);
    if( !errores.isEmpty() ) {
        return res.status(400).json({errores: errores.array() })
    }

    try {

        // Extraer el proyecto y comprabar si existe

        const { proyecto} = req.body;

        const existeProyecto = await Proyecto.findById(proyecto);


        if(!existeProyecto){


                res.status(404).json({msg:'Proyecto no encontrado'});

        }


        if(existeProyecto.creador.toString()!==  req.usuario.id){
            res.status(401).json({msg:'No autorizado'});
        }

        // Creamos la tarea


        const tarea = new Tarea (req.body);
        await tarea.save();
        res.json ({tarea});


        // Revisar si el proyecto actual pertenece al usuario autenticado
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

    //Obtener tarea por proyectos

}
exports.obtenerTareas = async (req, res) =>{

    try {
     // Extraer el proyecto y comprabar si existe

    const { proyecto} = req.query;

  

    const existeProyecto = await Proyecto.findById(proyecto);


    if(!existeProyecto){


            res.status(404).json({msg:'Proyecto no encontrado'});

    }


    // Revisar si la tarea pertenece a ese usuario

    if(existeProyecto.creador.toString()!==  req.usuario.id){
        res.status(401).json({msg:'No autorizado'});
    }

    //Traemos todas las tareas del un proyecto

    const tareas = await Tarea.find({proyecto}).sort({creado: -1});
    res.json({tareas});

} catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error'); 
}

}
exports.actualizarTareas = async (req, res) =>{
    try {
        // Extraer el proyecto y comprabar si existe
   
       const { proyecto} = req.body;
   
       const existeProyecto = await Proyecto.findById(proyecto);
   
   
       if(!existeProyecto){
   
   
               res.status(404).json({msg:'Proyecto no encontrado'});}




         } 
    
    
    
    
    catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error'); 
    }
    



}
// Actualizar una tarea
exports.actualizarTarea = async (req, res ) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto, nombre, estado } = req.body;


        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }
        // Crear un objeto con la nueva información
        const nuevaTarea = {};
        nuevaTarea.nombre = nombre;
        nuevaTarea.estado = estado;

        // Guardar la tarea
        tarea = await Tarea.findOneAndUpdate({_id : req.params.id }, nuevaTarea, { new: true } );

        res.json({ tarea });

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}
exports.eliminarTarea = async (req, res) => {
    try {
        // Extraer el proyecto y comprobar si existe
        const { proyecto  } = req.query;

        // Si la tarea existe o no
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea) {
            return res.status(404).json({msg: 'No existe esa tarea'});
        }

        // extraer proyecto
        const existeProyecto = await Proyecto.findById(proyecto);

        // Revisar si el proyecto actual pertenece al usuario autenticado
        if(existeProyecto.creador.toString() !== req.usuario.id ) {
            return res.status(401).json({msg: 'No Autorizado'});
        }

        // Eliminar
        await Tarea.findOneAndRemove({_id: req.params.id});
        res.json({msg: 'Tarea Eliminada'})

    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error')
    }
}
