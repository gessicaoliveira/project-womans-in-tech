const express = require('express');
const router = express.Router();

const app = express();
const port = 3333;

const womans = [
    {
        nome: 'Gessica Oliveira',
        github: 'https://github.com/gessicaoliveira',
        tinybio: 'Developer full stack jr',
    },
    {
        nome: 'Conceição Evaristo',
        image: 'https://i.postimg.cc/Z9XzNNMS/conceicao-evaristo.png',
        tinybio: 'Writer',
    },
    {
        nome: 'Nina da Hora',
        image: 'https://bit.ly/3FKpFaz',
        tinybio: 'Antiracist hacker',
    },
];

function showWomans(request, response) {
    response.send(womans);
}

function showPort() {
    console.log(`Servidor criado e rodando na porta ${port}`);
}

app.use(router.get('/womans', showWomans));
app.listen(port, showPort);