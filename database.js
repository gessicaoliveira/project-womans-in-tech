const mongoose = require('mongoose');

async function connectDatabase() {
    try {
        console.log("Conexão com o Banco de Dados foi inciada!");

        await mongoose.connect('mongodb+srv://gessica:XA0zMhEBs8e4avCZ@clusterwomans.1jocnui.mongodb.net/?retryWrites=true&w=majority');

        console.log("Conexão com o Banco de Dados foi realizada com sucesso!");        
    } catch(erro) {
        console.log(erro);
    } 
}

module.exports = connectDatabase;