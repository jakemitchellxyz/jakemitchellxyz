const path = require('path')
const router = require('express').Router()
const PAGE_ACCESS_TOKEN = process.env.NEXT_MOVIE_PAGE_ACCESS_TOKEN

// Expose the privacy policy to a public URL
router.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname + '/privacy-policy.html'))
})

// Handle GET requests; for verification
router.get('/webhook', (req, res) => {
  let VERIFY_TOKEN = '2Rw36ORU5riic3jsgeUh8C5xdj33Omo2'

  // Parse the query params
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED')
      res.status(200).send(challenge)
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403)
    }
  }
})

// Handle POST requests; when messenger sends a message
router.post('/webhook', (req, res) => {
  let body = req.body

  // Checks this is an event from a page subscription
  if (body.object === 'page') {
    // Iterates over each entry - there may be multiple if batched
    body.entry.forEach((entry) => {
      let webhook_event = entry.messaging[0]
      console.log(webhook_event)
    })

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED')
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404)
  }
})

module.exports = router
