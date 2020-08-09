const accessDatabase = require('./accessDatabase');
const readEstados = require('./accessEstados');
const { resolve } = require('path');

const readCidadesResolve = async function() {
    const path = resolve(__dirname, "../json/Cidades.json");
    const database = await accessDatabase(path);
    const data = await database.read();

    return data;
}

const readCidades = async function() {
    const result = await readCidadesResolve();

    return result;
}

const writeCidadesPorEstado = async function() {
    const estados = await readEstados();
    const cidades = await readCidades();

    estados.forEach(async (estado) => {
        if(!estado.ID || !estado)
            return;
        
        const cidadesPorEstado = cidades.filter((cidade) => {
            return cidade.Estado === estado.ID;
        });

        const writePath = resolve(__dirname, `../json/estados/${estado.Sigla}.json`);
        await accessDatabase(writePath).write(cidadesPorEstado);
    });
}

module.exports = writeCidadesPorEstado;