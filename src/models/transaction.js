const mongoose = require('mongoose')
const mongooseDateFormat = require('mongoose-date-format')

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
    },
    fuel_type:{
        type: String,
        trim: true,
        default: 'Unknown'
    }
}, {
    timestamps: true
})

transactionSchema.virtual('stockused', {
    ref: 'StockUsed',
    localField: '_id',
    foreignField: 'transaction_id'
})

transactionSchema.virtual('sales', {
    ref: 'Sales',
    localField: 'price',
    foreignField: 'sales'
})

transactionSchema.plugin(mongooseDateFormat)

const Transaction = mongoose.model('Transaction', transactionSchema)

module.exports = Transaction