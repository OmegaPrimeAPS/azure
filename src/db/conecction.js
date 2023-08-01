const {MongoClient} = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_DB_CONNECTION_STRING;

async function conectarBaseDeDatos(){
    try{
        const client = await MongoClient(url, { useUnifiedTopology: true });
        const db = client.db ('test_db');
        return db;
    }catch(error){
        console.error('Error al Conectarse a la base de datos:',error)
        throw error;
    }

}
module.exports = conectarBaseDeDatos;