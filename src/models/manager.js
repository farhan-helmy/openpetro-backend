const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const managerSchema = new mongoose.Schema({

    icno: {
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


managerSchema.methods.toJSON = function () {
    const staff = this
    const staffObject = staff.toObject()

    delete staffObject.password
    delete staffObject.tokens


    return staffObject
}

managerSchema.methods.generateAuth = async function () {
    const manager = this
    const token = jwt.sign({
        _id: manager.id.toString()
    }, process.env.JWT_SECRET)

    manager.tokens = manager.tokens.concat({
        token
    })
    await manager.save()

    return token
}

managerSchema.statics.findByCreds = async (email, password) => {
    const manager = await Manager.findOne({
        email
    })

    if (!manager) {
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, manager.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }

    return manager
}
//hash plain text pass
managerSchema.pre('save', async function (next) {
    const manager = this

    if (manager.isModified('password')) {
        manager.password = await bcrypt.hash(manager.password, 8)
    }
    next()
})
const Manager = mongoose.model('Manager', managerSchema)

module.exports = Manager