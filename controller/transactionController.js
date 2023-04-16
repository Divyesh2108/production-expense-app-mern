const moment = require("moment/moment");
const transactionModel = require("../models/transactionMode");

const getAllTransaction = async (req, res) => {
    const { frequency, selectedDate, type } = req.body
    try {
        const transactions = await transactionModel.find({
            ...(frequency !== "custom" ?
                {
                    date: { $gt: moment().subtract(Number(frequency), 'd').toDate() },
                } :
                { date: { $gte: selectedDate[0], $lte: selectedDate[1] } }
            ),
            userid: req.body.userid,
            ...(type !== 'all' && { type })
        });
        res.status(200).json({
            message: 'success',
            transactions
        })
    } catch (error) {
        res.status(400).json(error)
        console.log(error)
    }
};

const editTransaction = async(req,res) =>{
    try {
        const updateTransaction =  await transactionModel.findOneAndUpdate({_id: req.body.transactionId},req.body.payload)
        res.status(200).json({
            message: 'success',
            updateTransaction
        })
    } catch (error) {
        res.status(400).json({
            error,
            success:false
        })
    }
}


const addTransaction = async (req, res) => {
    try {
        const newTransaction = new transactionModel(req.body)
        await newTransaction.save()
        // await transactionModel.create(req.body)
        res.status(200).json({
            message: "success",
            newTransaction
        })
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};

const deleteTransaction = async(req,res) =>{
    try {
     await transactionModel.findOneAndDelete({_id: req.body.transactionId})
        res.status(200).json({
            success :true,
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message,
            success:false
        })
    }
}

module.exports = { getAllTransaction, addTransaction,editTransaction,deleteTransaction }