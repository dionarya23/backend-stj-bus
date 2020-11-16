const express = require('express')
require("dotenv").config()

const { json, urlencoded } = require("body-parser")
const morgan = require('morgan')
const compression = require('compression')
const app = express()

const db = require('./config/database')

db.sync({
    forced: false
}).then(() => console.log(`db connected`));

/**
 * Routes
 */
const INDEX = require('./routes/index')
const USER = require('./routes/user')

app.use(morgan("dev"))
app.use(compression())
app.use(urlencoded({extended: false}))
app.use(json())

app.use("/", INDEX)
app.use("/api/v1/user", USER)

app.listen(process.env.PORT || 3000, () => console.log(`App running on port ${process.env.PORT || 3000}`))