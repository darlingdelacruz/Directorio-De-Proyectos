const express = require ('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');
const auth = require ('../middleware/auth');
const { check } = require('express-validator');


//Crear un proyectos
//api/proyectos
router.post('/',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    
],

    auth,
    proyectoController.crearProyecto


);


// Obtener todos los proyectos
router.get('/',

    auth,
    proyectoController.obtenerProyectos


)
;


//Actualizar proyectos via ID

router.put('/:id',
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    auth,
    proyectoController.actualizarProyecto

);


// Para borrar

router.delete('/:id',
    
    auth,
    proyectoController.eliminarProyecto

);

module.exports = router;
