const accessDatabase = require('./accessDatabase');
const { resolve } = require('path');

const readEstadosResolve = async function() {
    const path = resolve(__dirname, "../json/Estados.json");
    const database = await accessDatabase(path);
    const data = await database.read();

    return data;
}

const readEstados = async function() {
    const result = await readEstadosResolve();

    return result;
}

module.exports = readEstados;