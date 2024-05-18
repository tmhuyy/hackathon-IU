require('dotenv').config()
// dependencies
const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const cors = require('cors')

// routes
const testRouter = require('./routes/test.route')

const app = express()

// middleware
// app.enable('trust proxy')
app.use(cors())
app.options('*', cors())

// Set security HTTP headers
app.use(helmet())

app.use(express.json())

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(cookieParser())

app.use(compression())

app.get('/health-check', (req, res) => {
    res.status(200).send('WELCOME TO BE SERVICE')
})

app.use('/api/v1/test', testRouter)

app.all('*', (req, res, next) => {
    // next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
    res.status(404).send(`Can't find ${req.originalUrl} on this server!`)
})

module.exports = app
