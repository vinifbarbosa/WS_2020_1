const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/exemploarquivos';

mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected', () => console.log('Mongoose! Connectado em ' +dbURI));

mongoose.connection.on('disconnected', () => console.log('Mongoose! Desconectado em ' +dbURI));

mongoose.connection.on('error', (erro) => console.log('Mongoose! Erro na conexão ' +erro));

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose! Desconectado pelo término da aplicação');
        process.exit(0);
    });
});