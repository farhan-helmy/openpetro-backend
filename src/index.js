const express = require('express')
require('./db/mongoose')
const customerRouter = require('./routers/customer')
const transactionRouter = require('./routers/transaction')



const app = express()
const port = process.env.PORT

// app.use((req, res, next) => {
//   if (req.method === 'GET') {
//     res.send('GET req are disabled')        
//   } else { 
//     next()
//   }
// })
app.use(express.json())
app.use(customerRouter)
app.use(transactionRouter)



app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})