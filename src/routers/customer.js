const express = require('express')
const auth = require('../middleware/auth')
const Customer = require('../models/customer')
const router = new express.Router()

router.post('/customers', async (req, res) => {
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
router.get('/customers', async (req, res) => {

    try {
        const customers = await Customer.find({})
        res.send(customers)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router