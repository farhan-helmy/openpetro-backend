const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

    fuel_amount: {
        type: Number,
        trim: true
    },
    fuel_pump_no: {
        type: Number,
        trim: true
    },
    price: {
        type: Number,
        trim: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    }
}, {
    timestamps: true
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction