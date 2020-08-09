import express from "express";
const router = express.Router();

import { promises as fs } from "fs";

const { readFile, writeFile } = fs;

// para liberar cors somente de uma rota: 
// importar cors e passar cors() como 2o parâmetro depois de "/"
router.post("/", async (req, res, next) => {
    try {
        let account = req.body;

        // == null para inserir zero
        if(!account.name || account.balance == null) {
            throw new Error("Name e Balance são obrigatórios.");
        }
        const data = JSON.parse(await readFile(global.fileName));

        //account = {id: data.nextId++, ...account};
        //inserir somente o que interessa
        account = { 
            id: data.nextId++,
            name: account.name,
            balance: account.balance
        }
        data.accounts.push(account);

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(account);

        logger.info(`POST /account - ${JSON.stringify(account)}`);
    }
    catch (err) {
        next(err);

    }
});

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        delete data.nextId;
        res.send(data);
        logger.info(`GET /account`);
    } catch(err) {
        next(err);

    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        const account = data.accounts.find(account => {
            return account.id === parseInt(req.params.id);
        });

        res.send(account);
        logger.info(`GET /account/:id`);
    } catch (err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        data.accounts = data.accounts.filter(account => {
            return account.id !== parseInt(req.params.id);
        });

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data);
        logger.info(`DELETE /account/:id - ${req.params.id}`);
    } catch (err) {
        next(err);
    }
});

router.put("/", async (req, res, next) => {
    try {
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName));

        const index = data.accounts.findIndex(a => {
            return a.id === parseInt(account.id);
        });

        if(index === -1) {
            throw new Error("Registro não encontrado.");
        }

        // == null para inserir zero
        if(!account.id || !account.name || account.balance == null) {
            throw new Error("ID, Name e Balance são obrigatórios.");
        }

        console.log("index", index);
        data.accounts[index].name = account.name;
        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data);
        logger.info(`PUT /account - ${JSON.stringify(account)}`);
    }
    catch (err) {
        next(err);
    }
})

router.patch("/updateBalance", async (req, res, next) => {
    try {
        let account = req.body;
        const data = JSON.parse(await readFile(global.fileName));

        const index = data.accounts.findIndex(a => {
            return a.id === parseInt(account.id);
        });

        if(!account.id || account.balance == null) {
            throw new Error("ID e Balance são obrigatórios.");
        }

        if(index === -1) {
            throw new Error("Registro não encontrado.");
        }

        console.log("index", index);
        data.accounts[index].balance = account.balance;

        await writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data);
    }
    catch (err) {
        next(err);
    }
    logger.info(`PATCH /account - ${JSON.stringify(account)}`);
});

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
    res.status(400).send({ error: err.message });
})


export default router;