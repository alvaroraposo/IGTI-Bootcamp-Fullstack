import { db } from '../models/index.js';
import { logger } from '../config/logger.js';

const findYearMonth = async (req, res) => {
  try {
    const transaction = await db.model.find().distinct('yearMonth');
    const sortedTransaction = transaction.sort((a,b) => {
      return a.localeCompare(b);
    })

    res.send(sortedTransaction);
    logger.info(`GET /transaction/periods`);
  } catch(error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os períodos' });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};
//CREATE
const create = async (req, res) => {
  try {
    const body = req.body;   
    body.day = parseInt(body.yearMonthDay.substring(8));
    body.month = parseInt(body.yearMonthDay.substring(6,7));
    body.year = parseInt(body.yearMonthDay.substring(0, 4));
    body.yearMonth = body.yearMonthDay.substring(0,7);

    const transaction = new db.model(body);
    await transaction.save();
    res.send({ message: 'transaction inserido com sucesso' });
    logger.info(`POST /transaction - ${JSON.stringify(body)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /transaction - ${JSON.stringify(error.message)}`);
  }
};

//RETRIEVE
const findAll = async (req, res) => {
  const yearMonth = req.query.yearMonth;  
  //condicao para o filtro no findAll
  var condition = yearMonth
    ? { yearMonth }
    : {};

  try {
    const transaction = await db.model.find(condition).sort({day: 1});
    const distinct = await db.model.find(condition).sort({day: 1}).distinct('day');
    
    const mappedTransaction = distinct.map((item) => {
      return {
        day: item,
        transactions: transaction.filter((t) => {
          if(t.day === item)
            return true;
        })
      }
    })

    res.send(mappedTransaction);
    logger.info(`GET /transaction`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;
  
  try {
    const transaction = await db.model.findById({_id: id.toString()});
    res.send(transaction);
    logger.info(`GET /transaction - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o transaction id: ' + id });
    logger.error(`GET /transaction - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    logger.info(`PUT /transaction - ${id} - ${JSON.stringify(req.body)}`);
    const transaction = await db.model.findByIdAndUpdate({_id: id}, req.body, {
      new: true,
      useFindAndModify: false
    });
    if(!transaction) {
      res.status(404).send('Documento não encontrado na coleção');
    }
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a transaction id: ' + id });
    logger.error(`PUT /transaction - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    logger.info(`DELETE /transaction - ${id}`);
    const transaction = await db.model.findByIdAndDelete({_id: id});
    res.send(transaction);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o transaction id: ' + id });
    logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {
  try {
    logger.info(`DELETE /transaction`);
    const transaction = await db.model.deleteMany({});
    res.send(transaction);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as transactions' });
    logger.error(`DELETE /transaction - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, findYearMonth, update, remove, removeAll };
