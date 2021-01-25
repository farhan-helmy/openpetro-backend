const express = require('express')
const Transaction = require('../models/transaction')
const auth = require('../middleware/auth')
const router = new express.Router()

router.post('/transaction', auth, async (req, res) => {
    //const tasks = new Task(req.body)
    const transaction = new Transaction({
        ...req.body,
        price: req.body.fuel_amount * 1.9,
        customer: req.customer._id
    })
    try {
        await transaction.save()
        res.status(201).send(transaction)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/transactions', async (req, res) => {
    try {
        const transaction = await Transaction.find({})
        res.send(transaction)
    } catch (e) {
        res.status(500).send()
    }

})


module.exports = router