require('dotenv').config()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5010
const router = require('./routes/customers')

const express = require('express')
const app = express()

const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(router);


app.listen(PORT, () => console.log(`Server Started on port ${PORT}`))
mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))