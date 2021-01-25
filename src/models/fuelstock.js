const mongoose = require('mongoose')

const fuelStockSchema = new mongoose.Schema({

    fuel_stock_amount: {
        type: Number,
        trim: true
    },
    
    total_price: {
        type: Number,
        trim: true
    },
   
}, {
    timestamps: true
})

fuelStockSchema.virtual('stockused',{
    ref: 'FuelStock',
    localField: '_id',
    foreignField: 'fuelstock'
})
const FuelStock = mongoose.model('FuelStock', fuelStockSchema)

module.exports = FuelStock