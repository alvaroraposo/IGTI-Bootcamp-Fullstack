import express from 'express';
import mongoose from 'mongoose';
import {clientRouter} from './routes/clientRouter.js';
import { clientModel, jsonToClients } from './models/clientModel.js';
import createRepository from './io/database/createRepository.js';

const app = express();

//Conectando a base de dados
(async () => {
    try {
        await mongoose.connect('mongodb+srv://raposo:SENHA@raposocluster.tuiq3.mongodb.net/igti_bootcamp', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("Connectado ao Mongo DB");
    }
    catch(err) {
        console.log("Erro ao conectar ao Mongo DB" + err);
    }
})();

app.use(express.json());
app.use(clientRouter);



app.listen(3000, async () => {
    const clients = await clientModel.find({});
    if(clients && clients.length === 0){
        const itens = await createRepository("accounts-5").read('client');
        const clients = jsonToClients(itens);
        clientModel.insertMany(clients);
    }
    console.log("app iniciada na porta 3000")
});


// new student({
//     name: "Alvaro Raposo",
//     subject: "Lógica de Programação",
//     type: "Trabalho Pratico",
//     value: 100
// })
// .save()
// .then(() => console.log("Documento Inserido"))
// .catch((err) => {
//     console.log("Erro ao inserir documento");
// });