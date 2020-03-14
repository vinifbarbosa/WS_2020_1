const mongoose = require("mongoose");
// criando os dados que será recebido 
const esquema = new mongoose.Schema({
    nome: {
        type:String,
        require: true
    },    
    telefone:String
});

const Cliente = mongoose.model("Cliente",esquema);
module.exports= Cliente;