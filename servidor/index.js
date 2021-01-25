const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

// crear el servidor


const app  = express();

// Conectar la base de datos

conectarDB();

// habilitar cors
app.use(cors());

// Habilitar express.json


app.use(express.json({extended: true}));

// Puerto al cual se va a conectar
const PORT = process.env.PORT || 4000;

//Importar Rutas

app.use('/api/usuarios', require ('./routers/usuarios'));
app.use('/api/auth', require ('./routers/auth'));
app.use('/api/proyectos', require ('./routers/proyectos'));
app.use('/api/tareas', require ('./routers/tareas'));
// arrancar la app

app.listen (PORT, () => {

    console.log (`El servidor esta funcionando en el puerto ${PORT}`);
})