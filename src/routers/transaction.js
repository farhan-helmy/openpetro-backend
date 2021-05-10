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

router.get('/transactions', auth, async (req, res) => {
    try {
        await req.customer.populate({
            path: 'transaction'
        }).execPopulate()
        res.send(req.customer.transaction)
    } catch (e) {
        res.status(500).send()
    }

})

router.get('/transactions/all', async (req, res) => {
    try {
        const transaction = await Transaction.find({}).populate({path: 'customer'}).sort({createdAt: 'desc'})
        res.send(transaction)
    } catch (e) {
        res.status(500).send()
    }

})

router.get('/transactions/ron95', async (req, res) => {
    try {
        const transaction = await Transaction.find({fueltype:"95"}).populate({path: 'customer'}).sort({createdAt: 'desc'})
        res.send(transaction)
    } catch (e) {
        res.status(500).send()
    }

})

router.get('/transactions/all', async (req, res) => {
    try {
        const transaction = await Transaction.find({}).populate({path: 'customer'}).sort({createdAt: 'desc'})
        res.send(transaction)
    } catch (e) {
        res.status(500).send()
    }

})


module.exports = router