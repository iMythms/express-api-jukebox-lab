const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const B_PORT = process.env.B_PORT
const F_PORT = process.env.F_PORT

const trackRouter = require('./controllers/tracks')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => {
	console.log(`Connected to MongoDB ${mongoose.connection.name}.`)
})

app.use(express.json())
app.use(cors({ origin: `http://localhost:${F_PORT}` }))

// Routes go here
app.use('/tracks', trackRouter)

app.listen(B_PORT, () => {
	console.log(`Running on http://localhost:${B_PORT}`)
})
