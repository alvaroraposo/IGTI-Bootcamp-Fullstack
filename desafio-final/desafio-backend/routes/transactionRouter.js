import express from 'express';
import controller from '../controllers/transactionController.js';
import cors from 'cors';

const app = express();
app.use(
    cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    })
);

app.post('/transaction/', controller.create);
app.get('/transaction/periods', controller.findYearMonth);
app.get('/transaction/', controller.findAll);
app.get('/transaction/:id', controller.findOne);
app.put('/transaction/:id', controller.update);
app.delete('/transaction/:id', controller.remove);
app.delete('/transaction/', controller.removeAll);

export { app as transactionRouter };
