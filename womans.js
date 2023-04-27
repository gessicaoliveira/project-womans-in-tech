const express = require('express'); //iniciando express
const router = express.Router(); //config 1° parte rota
const { v4:uuidv4 } = require('uuid');

const app = express(); //iniciando app
app.use(express.json()); //dados trafegando requisição format json
const port = 3333; //criando a porta

//lista incial de mulheres
const womans = [
    {
        name: 'Gessica Oliveira',
        github: 'https://github.com/gessicaoliveira',
        tinybio: 'Developer full stack jr',
    },
    {
        name: 'Conceição Evaristo',
        image: 'https://i.postimg.cc/Z9XzNNMS/conceicao-evaristo.png',
        tinybio: 'Writer',
    },
    {
        name: 'Nina da Hora',
        image: 'https://bit.ly/3FKpFaz',
        tinybio: 'Antiracist hacker',
    },
];

//GET
function showWomans(request, response) {
    response.send(womans);
}

//POST
function createWoman(request, response) {
    const newWoman = {
        id: uuidv4(),
        name: request.body.name,
        image: request.body.image,
        tinybio: request.body.tinybio
    }

    womans.push(newWoman);
    response.json(womans);
}

//PORT
function showPort() {
    console.log(`Servidor criado e rodando na porta ${port}`);
}


app.use(router.get('/womans', showWomans)); // confg rota GET /womans
app.use(router.post('/womans', createWoman)); //config rota POST /womans
app.listen(port, showPort); // servidor ouvindo porta