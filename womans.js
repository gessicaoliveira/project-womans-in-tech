const express = require('express'); //iniciando express
const router = express.Router(); //config 1° parte rota

const connectDatabase = require('./database');

const connDatabase = require('./database'); //ligando ao arquivo banco de dados
connectDatabase(); //chamando função que conecta o banco

const Woman = require('.model'); //model criada
const app = express(); //iniciando app
app.use(express.json()); //dados trafegando requisição format json
const port = 3333; //criando a porta

//lista incial de mulheres
// const womans = [
//     {
//         id: '1',
//         name: 'Gessica Oliveira',
//         image: 'https://gerenciador.popload.com.br/wp-content/uploads/2018/01/180118_brodydalle2.jpg',
//         tinybio: 'Developer full stack jr',
//         quote: 'Nada resiste ao trabalho.'
//     },
//     {
//         id: '2',
//         name: 'Simara Conceição',
//         image: 'https://github.com/simaraconceicao.png',
//         tinybio: 'Developer and Instructor',
//         quote: ''
//     },
//     {
//         id: '3',
//         name: 'Nina da Hora',
//         image: 'https://bit.ly/3FKpFaz',
//         tinybio: 'Antiracist Hacker',
//         quote: ''
//     },
// ];

//GET
async function showWomans(request, response) {
    try {
        const womansFromTheDatabase = await Woman.find()

        response.json(womansFromTheDatabase);
    } catch(erro) {
        console.log(erro);
    }
}

//POST
async function createWoman(request, response) {
    const newWoman = new Woman({        
        name: request.body.name,
        image: request.body.image,
        tinybio: request.body.tinybio,
        quote: request.body.quote
    });

    try {
        const createdWoman = await newWoman.save();
        response.status(201).json(createdWoman);
    } catch(erro) {
        console.log(erro)
    }
}

//PATCH
async function correctWoman(request, response) { 

    try {
        const womanFound = await Woman.findById(request.params.id);

        if (request.body.name) {
            womanFound.name = request.body.name;
        }
        if (request.body.image) {
            womanFound.image = request.body.image;
        }
        if (request.body.tinybio) {
            womanFound.tinybio = request.body.tinybio;
        }
        if (request.body.quote) {
            womanFound.quote = request.body.quote;
        }

        const updateWomanInDb = await womanFound.save();

        response.json(updateWomanInDb);
    
    } catch(erro){
        console.log(erro)
    }
    
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