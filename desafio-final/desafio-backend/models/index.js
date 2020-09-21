import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true,
        min: 1900,
        max: 3000
    },
    month: {
        type: Number,
        require: true,
        min: 1,
        max: 12
    },
    day: {
        type: Number,
        require: true,
        min: 1,
        max: 31
    },
    yearMonth: {
        type: String,
        require: true
    },
    yearMonthDay: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    }
});
const transactionModel = mongoose.model('transactions', transactionSchema, 'transactions');
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;
db.model = transactionModel;

export { db };
