import mongoose from 'mongoose';

// mongoose.connect('mongodb+srv://raposo:afqassvv@raposocluster.tuiq3.mongodb.net/<db_name>', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log("CONNECTED"))
// .catch(() => consolelog("DB ERROR"));

// conectar ao MongoDB pelo Mongoose
(async () => {
    try {
        await mongoose.connect('mongodb+srv://raposo:afqassvv@raposocluster.tuiq3.mongodb.net/igti_bootcamp', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }
    catch(err) {
        console.log("Erro ao conectar ao Mongo DB");
    }
})();

//criação do modelo
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }

});

//definindo o modelo da coleção - 2o 'student' para manter no singular
mongoose.model('student', studentSchema, 'student');

const student = mongoose.model('student');

new student({
    name: "Alvaro Raposo",
    subject: "Lógica de Programação",
    type: "Trabalho Pratico",
    value: 100
})
.save()
.then(() => console.log("Documento Inserido"))
.catch((err) => {
    console.log("Erro ao inserir documento");
});