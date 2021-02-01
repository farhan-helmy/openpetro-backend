const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const staffSchema = new mongoose.Schema({

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
        },
        role: {
            type: String,
            required: true,
            trim: true
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


customerSchema.virtual('staff', {
    ref: 'Staff',
    localField: '_id',
    foreignField: 'staff_id'
})

staffSchema.methods.toJSON = function () {
    const staff = this
    const staffObject = staff.toObject()

    delete staffObject.password
    delete staffObject.tokens


    return staffObject
}

staffSchema.methods.generateAuth = async function () {
    const staff = this
    const token = jwt.sign({
        _id: staff.id.toString()
    }, process.env.JWT_SECRET)

    staff.tokens = staff.tokens.concat({
        token
    })
    await staff.save()

    return token
}

staffSchema.statics.findByCreds = async (email, password) => {
    const staff = await Staff.findOne({
        email
    })

    if (!staff) {
        throw new Error('unable to login')
    }

    const isMatch = await bcrypt.compare(password, staff.password)

    if (!isMatch) {
        throw new Error('unable to login')
    }

    return staff
}
//hash plain text pass
staffSchema.pre('save', async function (next) {
    const staff = this

    if (staff.isModified('password')) {
        staff.password = await bcrypt.hash(staff.password, 8)
    }
    next()
})
const Staff = mongoose.model('Staff', staffSchema)

module.exports = Staff