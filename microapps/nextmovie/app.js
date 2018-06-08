const PAGE_ACCESS_TOKEN = process.env.NEXT_MOVIE_PAGE_ACCESS_TOKEN
const WEBHOOK_VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN
const TMDB_API_KEY = process.env.TMDB_API_KEY
const DATABASE = process.env.DATABASE_URL

const path = require('path')
const router = require('express').Router()
const request = require('request')
const { Pool } = require('pg')
const pool = new Pool({
  connectionString: DATABASE,
  ssl: true
})

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
    'recipient': {
      'id': sender_psid
    },
    'message': response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    'uri': 'https://graph.facebook.com/v2.6/me/messages',
    'qs': { 'access_token': PAGE_ACCESS_TOKEN },
    'method': 'POST',
    'json': request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('Message sent!')
    } else {
      console.error('Unable to send message:' + err)
    }
  })
}

// Render view for the chat extension
router.get('/webview', (req, res) => {
  res.sendFile(path.join(__dirname + '/webview.html'))
})

// Get list of movies given thread_id
router.get('/list/:thread_id', async (req, res) => {
  try {
    const client = await pool.connect()
    const movies = await client.query('SELECT movies FROM lists WHERE thread_id = \'' + req.params.thread_id + '\' LIMIT 1')
    res.status(200).send(movies)
    client.release()
  } catch (err) {
    res.status(500).send('Error ' + err)
  }
})

// Add movie to list
router.post('/add/:thread_id/:movie_id', async (req, res) => {
  try {
    const client = await pool.connect()
    const movies = await client.query('SELECT movies FROM lists WHERE thread_id = \'' + req.params.thread_id + '\' LIMIT 1')
    if (movies != null) {
      let movieData = JSON.parse(movies)
      movieData.push(req.params.movie_id)
      const update = await client.query('UPDATE lists SET movies = \'' + JSON.stringify(movieData) + '\' WHERE thread_id = \'' + req.params.thread_id + '\';')
    } else {
      let movieData = [ req.params.movie_id ]
      const update = await client.query('INSERT INTO lists (thread_id, movies) VALUES (\'' + req.params.thread_id + '\', \'' + JSON.stringify(movieData) + '\');')
    }
    res.status(200).send('OK')
    client.release()
  } catch (err) {
    res.status(500).send('Error ' + err)
  }
})

// Search api to call TMDb API
router.get('/search/:query', (req, res) => {
  request({
    'uri': 'https://api.themoviedb.org/3/search/movie',
    'qs': { 'api_key': TMDB_API_KEY, 'query': req.params.query },
    'method': 'GET'
  }, (error, response, body) => {
    if (!error) {
      res.status(200).send(body)
    } else {
      res.status(401).send('Error performing query: ' + error)
    }
  })
})

// Details api to call TMDb API
router.get('/details/:id', (req, res) => {
  request({
    'uri': 'https://api.themoviedb.org/3/movie/' + req.params.id,
    'qs': { 'api_key': TMDB_API_KEY },
    'method': 'GET'
  }, (error, response, body) => {
    if (!error) {
      res.status(200).send(body)
    } else {
      res.status(401).send('Error getting details: ' + error)
    }
  })
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
  // Parse the query params
  let mode = req.query['hub.mode']
  let token = req.query['hub.verify_token']
  let challenge = req.query['hub.challenge']

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === WEBHOOK_VERIFY_TOKEN) {
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
