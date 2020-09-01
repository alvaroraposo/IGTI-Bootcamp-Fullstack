import mongoose from 'mongoose';

//criação do modelo
const clientSchema = mongoose.Schema({
    agencia: {
        type: String,
        require: true
    },
    conta: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        require: true,
    },
    lastModified: {
        type: Date,
        default: Date.now
    }

});

clientSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValudators = true;
    next();
});

const jsonToClients = (itens) => {
    const clients = [];

    itens.forEach((item) => {
        const client = {
            ...item,
            lastModified: Date.now()
        };

        clients.push(client);
    })

    return clients;
}

const clientModel = mongoose.model('client', clientSchema, 'client');

export {clientModel, jsonToClients};