import express from 'express';
import {studentModel} from '../models/studentModel.js'
const app = express();

//CREATE
app.post('/student', async (req, res) => {
    try {
        console.log("Rota Student POST");
        const student = new studentModel(req.body);
        await student.save();

        res.send(student);
    } catch(err) {
        res.status(500).send(error);
    }
});

//RETRIEVE
app.get('/student', async (req, res) => {
    try {
        console.log("Rota Student GET");
        const student = await studentModel.find({});
        res.send(student);
    } catch(err) {
        res.status(500).send(error);
    }
});

//UPDATE
app.patch('/student/:id', async (req, res) => {
    try {        
        const id = req.params.id;
        console.log("Rota Student PATCH", id);
        const student = await studentModel.findByIdAndUpdate({_id: id.toString()}, req.body, {
            new: true //retornar o documento atualizado
        });

        if(!student) {
            res.status(404).send('Documento não encontrado na coleção');
        }
        res.send(student);
    } catch (err) {
        res.status(500).send(err);
    }
});

//DELETE
app.delete('/student/:id', async (req, res) => {
    try {
        console.log("Rota Student DELETE");
        const id = req.params.id;
        const student = await studentModel.findByIdAndDelete({ _id: id });
        res.send(student);
    } catch (err) {
        res.status(500).send(error);
    }
})

export {app as studentRouter};