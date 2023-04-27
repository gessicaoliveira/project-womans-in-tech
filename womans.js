const express = require('express'); //iniciando express
const router = express.Router(); //config 1° parte rota
const { v4:uuidv4 } = require('uuid'); //biblioteca que gera id automaticamente
const connectDatabase = require('./database');

const connDatabase = require('./database'); //ligando ao arquivo banco de dados
connectDatabase(); //chamando função que conecta o banco

const app = express(); //iniciando app
app.use(express.json()); //dados trafegando requisição format json
const port = 3333; //criando a porta

//lista incial de mulheres
const womans = [
    {
        id: '1',
        name: 'Gessica Oliveira',
        image: 'https://gerenciador.popload.com.br/wp-content/uploads/2018/01/180118_brodydalle2.jpg',
        tinybio: 'Developer full stack jr',
        quote: 'Nada resiste ao trabalho.'
    },
    {
        id: '2',
        name: 'Simara Conceição',
        image: 'https://github.com/simaraconceicao.png',
        tinybio: 'Developer and Instructor',
        quote: ''
    },
    {
        id: '3',
        name: 'Nina da Hora',
        image: 'https://bit.ly/3FKpFaz',
        tinybio: 'Antiracist Hacker',
        quote: ''
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

//PATCH
function correctWoman(request, response) {
    function findWoman(woman) {
        if (woman.id === request.params.id) {
            return woman;
        }
    }

    const womanFound = womans.find(findWoman);

    if (request.body.name) {
        womanFound.name = request.body.name;
    }
    if (request.body.image) {
        womanFound.image = request.body.image;
    }
    if (request.body.tinybio) {
        womanFound.tinybio = request.body.tinybio;
    }

    response.json(womans);

}

//DELETE
function deleteWoman(request, response) {
    function allButHer(woman) {
        if (woman.id !== request.params.id) {
            return woman;
        }
    }
    const womenWhoStayed = womans.filter(allButHer);
    response.json(womenWhoStayed);
}

//PORT
function showPort() {
    console.log(`Servidor criado e rodando na porta ${port}`);
}

app.use(router.get('/womans', showWomans)); // confg rota GET /womans
app.use(router.post('/womans', createWoman)); //config rota POST /womans
app.use(router.patch('/womans/:id', correctWoman)); //config rota PATCH /womans/:id
app.use(router.delete('/womans/:id', deleteWoman)); // config rota DELETE /womans/:id
app.listen(port, showPort); // servidor ouvindo porta