const express = require('express'); //iniciando express
const router = express.Router(); //config 1° parte rota

//Pack cors permite consumir esta api no front
const cors = require('cors');

const connectDatabase = require('./database');

const connDatabase = require('./database'); //ligando ao arquivo banco de dados
connectDatabase(); //chamando função que conecta o banco

const Woman = require('./model'); //model criada
const app = express(); //iniciando app

app.use(express.json()); //dados trafegando requisição format json
app.use(cors());

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
//         quote: 'Quero ser <dev> mulheres plurais codando um futuro tecnológico com mais equidade.'
//     },
//     {
//         id: '3',
//         name: 'Nina da Hora',
//         image: 'https://s2.glbimg.com/XFyjolmgcp0KTCQBJQfJXKCQxUs=/0x0:620x807/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_71a8fe14ac6d40bd993eb59f7203fe6f/internal_photos/bs/2022/c/p/vuevdESXKe7xZSBA927w/2020-11-15-nina-da-hora.jpeg',
//         tinybio: 'Antiracist Hacker',
//         quote: 'I'm learning to think critically about AI and how to create decolonial technologies.'
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
async function deleteWoman(request, response) {
    try {
        await Woman.findByIdAndDelete(request.params.id);
        response.json({ mensagem:'Mulher deletada com sucesso!' });

    } catch(erro) {
        console.log(erro);
    }    
    
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