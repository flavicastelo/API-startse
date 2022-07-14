//
import express, { application, request, response } from "express";
import { StatusCodes } from "http-status-codes";

const app = express();
const PORT = process.env.PORT || 3000;
let users =[
    {id: 1, name: 'Flaviana Castelo', age: 32},
    {id: 2, name: 'Kalel Castelo', age: 3},
];
app.use(express.json()); //PARA GARANTIR QUE TODAS AS NOSSAS REQUESTS SAO NO FORMATO JSON
//CRIAR A PORTA
app.listen(PORT, () => {
    //QUANDO DER CERTO, QUANDO ESCUTAQR A PORT ELE EXECUTA A FUNCAO
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//CRIAR A ROTA GET '/'
app.get('/', (request, response)=> {
    return response.send('<h1>Trabalhando com servidor express</h1>');
});

//CRIANDO A ROTA GET USERS -> pega a lista de usuarios 
app.get('/users', (request, response) =>{
    return response.send(users);
})

//CRIANDO A ROTA GET USERS/ID -> pega um usuario especifico
app.get('/users/:userId', (request, response) => {
    const userId = request.params.userId; //PARA PEGAR O PARAMENTRO DE ROTA
    const user = users.find(user => { //find: PERCORRE TODO O ARRAY PROCURANDO E RETORNA O PRIMEIRO ELEMENTO QUE ENCONTRAR
       return (user.id === Number(userId));
    })
    return response.send(user);
})

// //CRIANDO O POST
app.post('/users', (request, response)=>{
    const newUser = request.body;
    users.push(newUser);
    return response.status(StatusCodes.CREATED).send(newUser); //STATUS CODES PARA DEFINIR QUAL STATUS RETORNAR
});

//PARA ATUALIZAR MEU JSON
app.put('/users/:userId', (request, response) => {
    const userId = request.params.userId;
    const updateUser = request.body;

    users = users.map (user => {
        if(Number(userId) === user.id) { //TESTA SE O ID É O MESMO DO USER Q QUER TROCAR
            return updateUser; //TROCA O USER PELO UPDATEUSER
        } //SE NAO FOR O MESMO ID, NAO TROCA
        return user;
    });
    return response.send(updateUser);
});

//REMOVER UM USUARIO
app.delete('/users/:userId', (request, response) =>{
    const userId = request.params.userId;

    users = users.filter((user) => user.id !== Number(userId)); //PROCURA OS USUARIOS COM ID DIFERENTES DO QUE QUERO REMOVER E JOGA NA LISTA USERS
    return response.status(StatusCodes.NO_CONTENT).send();
});