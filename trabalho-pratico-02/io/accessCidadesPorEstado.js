const accessDatabase = require('./accessDatabase');
const readEstados = require('./accessEstados');
const { resolve } = require('path');

const readCidades = async function(uf) {
    const path = resolve(__dirname, `../json/estados/${uf}.json`);
    const data = await accessDatabase(path).read();

    return data;
}

const readQuantidadeCidades = async function(uf) {
    const data = await readCidades(uf);
    return data.length;
}

const readNomeMaisLongoCidade = async function(uf) {
    const data = await readCidades(uf);
    
    data.sort((a,b) => {
        if(a.Nome.length > b.Nome.length)
            return -1;
        else if(a.Nome.length < b.Nome.length)
            return 1;
        else 
            return a.Nome.localeCompare(b.Nome);
    })

    return data[0].Nome;
}

const readNomeMaisCurtoCidade = async function(uf) {
    const data = await readCidades(uf);
    
    data.sort((a,b) => {
        if(a.Nome.length < b.Nome.length)
            return -1;
        else if(a.Nome.length > b.Nome.length)
            return 1;
        else 
            return a.Nome.localeCompare(b.Nome);
    })

    return data[0].Nome;
}

const readNomeMaisLongoCidadeUf = async function () {
    const estados = await readEstados();

    const promises = estados.map(async (estado) => {
        const nome = await readNomeMaisLongoCidade(estado.Sigla);
        const obj = { uf: estado.Sigla, nome: nome };

        return obj;        
    })

    const array = await Promise.all(promises);

    return array;
}

const readNomeMaisCurtoCidadeUf = async function () {
    const estados = await readEstados();

    const promises = estados.map(async (estado) => {
        const nome = await readNomeMaisCurtoCidade(estado.Sigla);
        const obj = { uf: estado.Sigla, nome: nome };

        return obj;        
    })

    const array = await Promise.all(promises);

    return array;
}

const readNomeMaisLongoCidades = async function() {
    const array = await readNomeMaisLongoCidadeUf();
    array.sort((a, b) => {
        if(a.nome.length > b.nome.length)
            return -1;
        else if(a.nome.length < b.nome.length)
            return 1;
        else
            return a.nome.localeCompare(b.nome);
    }); 
      
    return array[0];
}

const readNomeMaisCurtoCidades = async function() {
    const array = await readNomeMaisCurtoCidadeUf();

    array.sort((a, b) => {
        if(a.nome.length < b.nome.length)
            return -1;
        else if(a.nome.length > b.nome.length)
            return 1;
        else
            return a.nome.localeCompare(b.nome);
    }); 
      
    return array[0];
}

const readArrayQuantidadeCidadesUf = async function () {
    const estados = await readEstados();

    const promises = estados.map(async (estado) => {
        const qtd = await readQuantidadeCidades(estado.Sigla);
        const obj = { uf: estado.Sigla, quantidade: qtd };

        return obj;        
    })

    const array = await Promise.all(promises);

    return array;
}

const readCincoEstadosMaisCidades = async function() {
    const array = await readArrayQuantidadeCidadesUf();
    array.sort((a, b) => {
        if(a.quantidade > b.quantidade)
            return -1;
        else if(a.quantidade < b.quantidade)
            return 1;
        else
            return a.uf.localeCompare(b.uf);
    }); 
      
    return array.slice(0, 5);
}

const readCincoEstadosMenosCidades = async function() {
    const array = await readArrayQuantidadeCidadesUf();
    array.sort((a, b) => {
        if(a.quantidade < b.quantidade)
            return -1;
        else if(a.quantidade > b.quantidade)
            return 1;
        else
            return a.uf.localeCompare(b.uf);
    }); 
      
    return array.slice(0, 5);
}

module.exports = {readQuantidadeCidades, 
    readCincoEstadosMaisCidades, readCincoEstadosMenosCidades, 
    readNomeMaisLongoCidade, readNomeMaisCurtoCidade, 
    readNomeMaisLongoCidades, readNomeMaisCurtoCidades};