const sqreen = require('sqreen') // App Security Monitoring Plugin
const newrelic = require('newrelic') // App Performance Monitoring Plugin

const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

app.use(compression())
app.use(helmet())

// Listen to the dist folder
app.use(express.static('dist'))

app.listen(process.env.PORT, () => console.log('jakemitchell.xyz listening on port ' + process.env.PORT + '!'))
