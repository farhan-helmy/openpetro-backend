const mongoose = require('mongoose')

const stockUsedSchema = new mongoose.Schema({

    amountleft: {
        type: Number,
        trim: true
    },
    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Transaction'
    },
    fuelstock: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'FuelStock'
    }
}, {
    timestamps: true
})
const StockUsed = mongoose.model('StockUsed', stockUsedSchema)

module.exports = StockUsed