// Initialisation d'express
const express = require("express")
const app = express()

// Mise en palce de l'envirement 
let cors  = require('cors')
let bodyParser = require('body-parser')



app.use(cors());


// Middelwares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Mise en plase des Route
let Login = require('./Router/login')
let Register = require('./Router/register')
let event = require('./Router/events')
let participation = require('./Router/participation')




app.use('/api/login', Login )
app.use('/api/register', Register )
app.use('/api/event', event )
app.use('/api/participation', participation )


let PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})