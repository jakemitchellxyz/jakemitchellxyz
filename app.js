const express = require('express')
const helmet = require('helmet')
const compression = require('compression')
const app = express()

app.use(compression())
app.use(helmet())

// Listen to the dist folder
app.use(express.static('dist'))

app.listen(3000, () => console.log('JakeMitchell.xyz listening on port 3000!'))
