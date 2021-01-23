const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const customerSchema = new mongoose.Schema({

    icno : {
        type: Number,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.includes('password')) {
                throw new Error('Cannot use password password')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})

customerSchema.virtual('transaction', {
    ref: 'Transaction',
    localField: '_id',
    foreignField: 'customer'
})

customerSchema.methods.toJSON = function () {
    const customer = this
    const customerObject = customer.toObject()

    delete customerObject.password
    delete customerObject.tokens
   

    return customerObject
}

customerSchema.methods.generateAuth = async function () {
    const customer = this
    const token = jwt.sign({
        _id: customer.id.toString()
    }, process.env.JWT_SECRET)

    customer.tokens = customer.tokens.concat({
        token
    })
    await customer.save()

    return token
}

customerSchema.statics.findByCreds = async (email, password) => {
    const customer = await Customer.findOne({
        email
    })

    if (!customer) {
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, customer.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }

    return customer
}
//hash plain text pass
customerSchema.pre('save', async function (next) {
    const customer = this

    if (customer.isModified('password')) {
        customer.password = await bcrypt.hash(customer.password, 8)
    }
    next()
})
const Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer