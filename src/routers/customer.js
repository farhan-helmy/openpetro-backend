const express = require('express')
const auth = require('../middleware/auth')
const Customer = require('../models/customer')
const router = new express.Router()

router.post('/customers/register', async (req, res) => {
    const customer = new Customer(req.body)

    try {
        await customer.save()
        const token = await customer.generateAuth()
        res.status(201).send({
            customer,
            token
        })
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/customers/login', async (req, res) => {
    try {
        const customer = await Customer.findByCreds(req.body.email, req.body.password)
        const token = await customer.generateAuth()
        res.send({
            customer,
            token
        })
    } catch (e) {
        res.status(400).send() 
    }
})

router.get('/customers',auth, async (req, res) => {

    try {
        const customers = await Customer.find({})
        res.send(customers)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/customers/me', auth, async (req, res) => {
    res.send(req.customer)
})

router.post('/customers/logout', auth, async (req, res) => {
    try {
        req.customer.tokens = req.customer.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.customer.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/customers/topup', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowed = ['topup_balance']
    const isValidOperation = updates.every((update) => allowed.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({
            error: 'invalid updates'
        })
    }
    try {        
        updates.forEach((update) => req.customer[update] = req.body[update])
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        await req.customer.save()
        res.send(req.customer)
    } catch (e) {
        res.status(400).send({
            error: '?????'
        })
    }
})

module.exports = router