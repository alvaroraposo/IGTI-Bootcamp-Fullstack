const writeCidadesPorEstado = require('./../io/accessCidades');
const { readQuantidadeCidades, 
    readCincoEstadosMaisCidades, readCincoEstadosMenosCidades,
    readNomeMaisLongoCidade, readNomeMaisCurtoCidade,
    readNomeMaisLongoCidades, readNomeMaisCurtoCidades} = require('./../io/accessCidadesPorEstado');

async function respostas() {
    await questao01();
    await questao02("AL");
    await questao03();
    await questao04();
    await questao05("AL");
    await questao06("AL");
    await questao07();
    await questao08();
}
async function questao01() {
    console.log("01. CRIANDO ARQUIVOS - Municípios por Estado");
    await writeCidadesPorEstado();
}

async function questao02(uf) {   
    const qtd = await readQuantidadeCidades(uf);
    console.log("\n02. QUANTIDADE DE MUNICÍPIOS - Estado escolhido: " + uf);
    console.log(`${uf} - ${qtd}`);
}

async function questao03() {    
    const array = await readCincoEstadosMaisCidades();
    console.log("\n03. MAIOR QUANTIDADE DE MUNICÍPIOS - TOP 5");
    array.forEach(estado => {
        console.log(estado.uf + " - " + estado.quantidade);
    })
}

async function questao04() {
    const array = await readCincoEstadosMenosCidades();
    console.log("\n04. MENOR QUANTIDADE DE MUNICÍPIOS - TOP 5");
    array.forEach(estado => {
        console.log(estado.uf + " - " + estado.quantidade);
    })
}

async function questao05(uf) {
    const nome = await readNomeMaisLongoCidade(uf);
    console.log("\n05. NOME Município MAIS LONGO - Estado escolhido: " + uf);
    console.log(`${uf} - ${nome}`);
}

async function questao06(uf) {
    const nome = await readNomeMaisCurtoCidade(uf);
    console.log("\n06. NOME Município MAIS CURTO - Estado escolhido: " + uf);
    console.log(`${uf} - ${nome}`);
}

async function questao07() {
    const cidade = await readNomeMaisLongoCidades();
    console.log("\n07. NOME MUNICIPIO MAIS LONGO: GERAL");
    console.log(`${cidade.uf} - ${cidade.nome}`);
}

async function questao08() {
    const cidade = await readNomeMaisCurtoCidades();
    console.log("\n08. NOME MUNICIPIO MAIS CURTO: GERAL");
    console.log(`${cidade.uf} - ${cidade.nome}`);
}

module.exports = respostas;