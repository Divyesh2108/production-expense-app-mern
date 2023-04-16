const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    userid: {
        type: String,
        require: true
    },
    amount: {
        type: Number,
        require: [true, 'amount is require']
    },
    type: {
        type: String,
        require: [true, 'type is require']
    },
    category: {
        type: String,
        require: [true, 'category is require']
    },
    refrence: {
        type: String,
    },
    description: {
        type: String,
        require: [true, 'desc is require']
    },
    date: {
        type: Date,
        require: [true, 'date is require']
    }
}, { timestamps: true })

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel