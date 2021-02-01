const mongoose = require('mongoose')

const salesSchema = new mongoose.Schema({

    sales: {
        type: mongoose.Schema.Types.Number,
        trim: true,
        ref: 'Sales'
    }
}, {
    timestamps: true
})

transactionSchema.virtual('stockused', {
    ref: 'StockUsed',
    localField: '_id',
    foreignField: 'transaction_id'
})

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction