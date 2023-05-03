const mongoose = require('mongoose');
require('dotenv').config()

async function connectDatabase() {
    try {
        console.log("Conexão com o Banco de Dados foi inciada!");

        await mongoose.connect(process.env.MONGO_URL);

        console.log("Conexão com o Banco de Dados foi realizada com sucesso!");        
    } catch(erro) {
        console.log(erro);
    } 
}

module.exports = connectDatabase;