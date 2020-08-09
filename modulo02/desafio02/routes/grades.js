import express from "express";
const router = express.Router();

import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

router.post("/", async (req, res, next) => {
    try {
        let grade = req.body;

        const data = JSON.parse(await readFile(global.fileName));

        //account = {id: data.nextId++, ...account};
        //inserir somente o que interessa
        grade = { 
            id: data.nextId++,
            student: grade.student,
            subject: grade.subject,
            type: grade.type,
            value: grade.value,
            timestamp: new Date()
        }
        data.grades.push(grade);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(grade);
    }
    catch (err) {
        next(err);

    }
});

router.put("/", async (req, res, next) => {
    try {
        let grade = req.body;
        const data = JSON.parse(await readFile(global.fileName));

        const index = data.grades.findIndex(a => {
            return a.id === parseInt(grade.id);
        });

        if(index === -1) {
            throw new Error("Registro não encontrado.");
        }

        data.grades[index].student = grade.student;
        data.grades[index].subject = grade.subject;
        data.grades[index].type = grade.type;
        data.grades[index].value = grade.value;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data);
    }
    catch (err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const grade = data.grades.find(grade => {
            return grade.id === parseInt(req.params.id);
        });

        res.send(grade);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.grades = data.grades.filter(grade => {
            return grade.id !== parseInt(req.params.id);
        });

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data);
    } catch (err) {
        next(err);
    }
});

router.get("/studentSubject/:student/:subject", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const grade = data.grades.reduce((acc, curr) => {            
            return (req.params.student === curr.student && req.params.subject === curr.subject) ? acc +=  parseFloat(curr.value): acc; 
        }, 0);

        res.send(`${req.params.student} - ${req.params.subject}: ${grade}`);
    } catch (err) {
        next(err);
    }
});

router.get("/subjectType/:subject/:type", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        let count = 0;
        const grade = data.grades.reduce((acc, curr) => { 
            console.log(req.params.subject === curr.subject, req.params.type === curr.type);
            if(req.params.subject === curr.subject && req.params.type === curr.type)          
            {                
                acc +=  parseFloat(curr.value);
                count++;
            }

            return acc; 
        }, 0);

        console.log(grade + " - " + count);
        res.send(`${req.params.subject} - ${req.params.type}: ${grade/count}`);
    } catch (err) {
        next(err);
    }
});

router.get("/melhores/:subject/:type", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        let count = 0;
        const grades = data.grades.filter((curr) => {            
            return (req.params.subject === curr.subject && req.params.type === curr.type) ? true : false;
        }).sort((a, b) => {
            console.log(a.value);
            console.log(b.value);
            return parseFloat(b.value) - parseFloat(a.value);
        }).slice(0, 3);

        res.send(grades);
    } catch (err) {
        next(err);
    }
});

export default router;