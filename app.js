'use strict'

const express = require('express')
const helmet = require('helmet') // common security setting fixes
const compression = require('compression') // gz compression
const history = require('connect-history-api-fallback') // reroute all requests to index.html, for VueJS routing
const subdomain = require('express-subdomain') // simple subdomain routing
const bodyparser = require('body-parser') // receive and interpret request content

const app = express()
const nextmovie = require('./microapps/nextmovie/app.js') // NextMovie Micro App

// Register middleware
app.use(helmet())
app.use(compression())
app.use(bodyparser.json())

// Handle all routing
app.use(nextmovie)
// app.use(subdomain('nextmovie', nextmovie))
app.use(express.static('dist'))

// Go to index.html for all routes
app.use(history())

// Turn on server
let port = process.env.PORT || 8080
app.listen(port, () => console.log('jakemitchell.xyz listening on port ' + port + '!'))
