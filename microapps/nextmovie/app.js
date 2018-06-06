const path = require('path')
const router = require('express').Router()
const request = require('request')
const PAGE_ACCESS_TOKEN = process.env.NEXT_MOVIE_PAGE_ACCESS_TOKEN

// Handles Webhook messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let payload = received_postback.payload
  if (payload === 'NEW_USER') {
    callSendAPI(sender_psid, { 'text': 'Welcome to Next Movie! Start using the extension in one of your chats!' })
  }
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('Message sent!')
    } else {
      console.error("Unable to send message:" + err)
    }
  })
}

// Render view for the chat extension
router.get('/webview', (req, res) => {
  res.sendFile(path.join(__dirname + '/webview.html'))
})

// Expose the terms and conditions to a public URL
router.get('/terms-and-conditions', (req, res) => {
  res.sendFile(path.join(__dirname + '/terms-and-conditions.html'))
})

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

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id
      if (webhook_event.postback) {
        handlePostback(sender_psid, webhook_event.postback)
      }
    })

    // Returns a '200 OK' response to all requests
    res.status(200).send('EVENT_RECEIVED')
  } else {
    // Returns a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404)
  }
})

module.exports = router
