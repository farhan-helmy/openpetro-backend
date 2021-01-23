const express = require('express')
require('./db/mongoose')
const customerRouter = require('./routers/customer')


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


app.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})