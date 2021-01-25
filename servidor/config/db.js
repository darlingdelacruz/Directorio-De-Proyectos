const mongoose = require ('mongoose');
require ('dotenv').config ({path: 'variable.env'});

const conectarDB = async () =>{

    try {
            await mongoose.connect(process.env.DB_MONGO, {

                useNewUrlParser:true,
                useUnifiedTopology: true,
                useFindAndModify:false
            })

            console.log('DB CONECTADA');
    } catch (error) {


        console.log(error);
        process.exit(1); // se va a detener la aplicacion
    }


}





module.exports = conectarDB;