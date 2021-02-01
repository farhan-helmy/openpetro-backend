const mongoose = require('mongoose')

const staffManageSchema = new mongoose.Schema({

    staff_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Staff'
    },
    fuel_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'FuelStock'
    }
}, {
    timestamps: true
})
const StockUsed = mongoose.model('StaffManage', staffManageSchema)

module.exports = StockUsed