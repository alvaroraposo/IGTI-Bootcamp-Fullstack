import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import {transactionRouter} from './routes/transactionRouter.js';

import { db } from './models/index.js';

dotenv.config();

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(transactionRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

const porta = process.env.PORT || 8081;
app.listen(process.env.PORT || 8081, () => {
  console.log("APP INICIADA: PORTA", porta);
});
