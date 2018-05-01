const sqreen = require('sqreen') // App Security Monitoring Plugin
const newrelic = require('newrelic') // App Performance Monitoring Plugin

const express = require('express')
const helmet = require('helmet') // common security setting fixes
const compression = require('compression') // gz compression
const history = require('connect-history-api-fallback') // reroute all requests to index.html, for VueJS routing

const app = express()

// Register middleware
app.use(compression())
app.use(helmet())
app.use(history())

// Listen to the dist folder
app.use(express.static('dist'))

// Turn on server
app.listen(process.env.PORT, () => console.log('jakemitchell.xyz listening on port ' + process.env.PORT + '!'))
