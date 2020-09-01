import express from 'express';
import {clientModel} from '../models/clientModel.js'
const app = express();

//Listar todas as contas
app.get('/client', async (req, res) => {
    try {
        console.log("Rota client GET");
        const client = await clientModel.find({});
        res.send(client);
    } catch(err) {
        res.status(500).send(error);
    }
});

app.get('/client/media/:agencia', async (req, res) => {

    const agencia = req.params.agencia;
    try {
        console.log("Rota client GET");
        const clients = await clientModel.aggregate([{
            $group: {
                _id: "$agencia",
                avgBalance: { $avg: "$balance" }
            }
        }
        ]);

        console.log(clients);

        const client = clients.find((item) => {
            return item._id === agencia;
        })
        

        res.send(`Média do saldo das conta da agência ${agencia}: ${client.avgBalance}`);
    } catch(err) {
        res.status(500).send(err);
    }
});

app.get('/client/private', async (req, res) => {
    const maxBalanceClients = await clientModel.aggregate([{
        $group: {
            _id: "$agencia",
            balance: { $max : "$balance"},
        }
    }]);

    const clients = maxBalanceClients.map(async (mbc) => {        
        const client = await clientModel.findOne({ 
            agencia: mbc._id, 
            balance: mbc.balance
        });
        return client;
    })
    
    const maxClients = await Promise.all([...clients]);

    const updatedClients = maxClients.map(async (client) => {
        client.agencia = 99;
        const updatedClient = await clientModel.findByIdAndUpdate({ _id: client.id}, client, {
            new: true,
            useFindAndModify: false
        });

        return updatedClient;
    })
    
    await Promise.all([...updatedClients]);
    const allPrivate = await clientModel.find({ agencia: 99 });
    
    res.send(allPrivate);
});

app.get('/client/lista/:quantidade/:ordem', async (req, res) => {
    const quantidade = parseInt(req.params.quantidade);
    const ordem = (req.params.ordem === 'maiores' ? -1 : (req.params.ordem === 'menores') ? 1 : -1);
    console.log("quantidade e ordem", quantidade, ordem);
    try {
        const clients = await clientModel.find({}).limit(quantidade).sort({balance: ordem});
        res.send(clients);       
    } catch(err) {
        res.status(500).send(error);
    }    
})

//Consultar Saldo
app.post('/client/saldo', async (req, res) => {
    try {
        console.log("Rota client saldo");
        const client = await clientModel.findOne({...req.body});        

        res.send(client);
    } catch(err) {
        res.status(500).send(error);
    }
});

//Efetuar Depósito
app.patch('/client/deposito', async (req, res) => {
    try {        
        const agencia = req.body.agencia;
        const conta = req.body.conta;
        const deposito = req.body.valor;
        console.log("Rota client deposito");
        const client = await clientModel.findOneAndUpdate({
            agencia,
            conta
        }, { 
            $inc: {
                balance: deposito
            } 
        }, {
            useFindAndModify: false,
            new: true //retornar o documento atualizado
        });

        if(!client) {
            res.status(404).send('Agência ou Conta fornecida não foi encontrada');
        }
        res.send(client);
    } catch (err) {
        res.status(500).send(err);
    }
});

//Efetuar Saque
app.patch('/client/saque', async (req, res) => {
    try {        
        const agencia = req.body.agencia;
        const conta = req.body.conta;
        const saque = req.body.valor;
        const taxa = 1;

        console.log("Rota client saque");
        const client = await clientModel.findOne({
            agencia,
            conta
        });

        if(!client) {
            res.status(404).send('Agência ou Conta fornecida não foi encontrada');
            return;
        }

        const newBalance = client.balance - (saque + taxa);
        if(newBalance < 0) {
            res.status(500).send(`Saldo insuficiente para a operação. Total Disponível: ${client.balance}`);
            return;
        }        

        const newClient = await clientModel.findByIdAndUpdate({ _id: client._id }, {
            $set: {
                balance: newBalance                
            }
        }, {
            new: true,
            useFindAndModify: false
        });

        res.send(newClient);
    } catch (err) {
        res.status(500).send(`Erro interno no servidor ${err}`);
    }
});

//Excluir Conta  
app.delete('/client/excluirConta', async (req, res) => {

    try {
        console.log("Rota client DELETE");
        const client = await clientModel.findOneAndDelete({ ...req.body });
        if(!client) {
            res.status(404).send('Agência ou Conta fornecida não foi encontrada');
            return;
        }
        const clients = await clientModel.find({agencia: client.agencia});

        res.send(`Total de contas: ${clients.length}`);
    } catch (err) {
        res.status(500).send(error);
    }
});

//Transferência entre contas
app.patch('/client/transferencia', async (req, res) => {
    try {        
        const contaOrigem = req.body.contaOrigem;
        const contaDestino = req.body.contaDestino;
        const valor = req.body.valor;

        console.log("Rota client transferência");

        const clientOrigem = await clientModel.findOne({
            conta: contaOrigem
        });
        
        const clientDestino = await clientModel.findOne({
            conta: contaDestino
        });       

        if(!clientOrigem) {
            res.status(404).send('Agência ou Conta de Origem fornecida não foi encontrada');
            return;
        }

        if(!clientDestino) {
            res.status(404).send('Agência ou Conta de Destino fornecida não foi encontrada');
            return;
        }

        const tarifa = (clientOrigem.agencia !== clientDestino.agencia) ? 8 : 0;

        const newBalanceOrigem = clientOrigem.balance - (valor + tarifa);
        const newBalanceDestino = clientDestino.balance + valor;

        if(newBalanceOrigem < 0) {
            res.status(500).send(`Saldo insuficiente para a operação. Total Disponível: ${clientOrigem.balance}`);
            return;
        }

        const newClientOrigem = await clientModel.findByIdAndUpdate({ _id: clientOrigem._id }, {
            $set: {
                balance: newBalanceOrigem                
            }
        }, {
            new: true,
            useFindAndModify: false
        });

        const newClientDestino = await clientModel.findByIdAndUpdate({ _id: clientDestino._id }, {
            $set: {
                balance: newBalanceDestino                
            }
        }, {
            new: true,
            useFindAndModify: false
        });

        res.send(newClientOrigem);
    } catch (err) {
        res.status(500).send(err);
    }
});

export {app as clientRouter};