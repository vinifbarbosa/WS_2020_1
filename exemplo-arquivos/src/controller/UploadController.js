const fs = require('fs');

const controller = {

    realizarUpload: (req, res) => {
        const {
            name,
            mimetype,
            data
        } = req.files['arquivo'];

        const nomeArquivo = `${new Date().getTime()}`;
        console.log(nomeArquivo);


        fs.writeFileSync(nomeArquivo, data);


        const readStream = fs.createReadStream(nomeArquivo);

        const Arquivo = require('../models/Arquivo');
        const metadados= {
             filename: name,
             contentType:mimetype
            };
            
        if(metadados.contentType === 'image/jpeg' || metadados.contentType === 'image/jpg' || metadados.contentType === 'image/png'){
            Arquivo.write(metadados, readStream, (erro, arquivo)=>{
                fs.unlinkSync(nomeArquivo);
                if(erro){
                    console.log(erro);
                        res.status(500).json({erro: 'Erro ao tentar salvar o arquivo'})
                } else{
                res.status(201).json({mensagem: 'Arquivo salvo', id: arquivo._id});
                }
            });
        }else{
            res.status(500).json({mensagem: 'Arquivo inválido'});
        }
    }
};
module.exports = controller;