import express from 'express';
import mongoose from 'mongoose';
import {studentRouter} from './routes/studentRouter.js';

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
app.use(studentRouter);



app.listen(3000, () => console.log("app iniciada na porta 3000"));


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