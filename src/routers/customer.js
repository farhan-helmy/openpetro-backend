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

router.post('/customer/login', async (req, res) => {
    try {
        const customer = await Customer.findByCreds(req.body.email, req.body.password)
        const token = await customer.generateAuth()
        res.send({
            user,
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

module.exports = router