// import express from 'express'
// import axios from 'axios'
// import dotenv from 'dotenv'
// import open from 'open'
// import qs from 'querystring'
//
// dotenv.config()
//
// const app = express()
// const port = 3000
//
// const CLIENT_ID = process.env.TWITTER_CLIENT_ID
// const CLIENT_SECRET = process.env.TWITTER_SECRET
// const REDIRECT_URI = 'http://localhost:3000/callback'
//
// // Step 1: Redirect user to Twitter login
// app.get('/login', (req, res) => {
//    const url =
//       `https://twitter.com/i/oauth2/authorize?` +
//       qs.stringify({
//          response_type: 'code',
//          client_id: CLIENT_ID,
//          redirect_uri: REDIRECT_URI,
//          scope: 'tweet.read users.read bookmarks.read offline.access',
//          state: 'state', // your own CSRF token
//          code_challenge: 'challenge', // use real PKCE challenge here
//          code_challenge_method: 'plain', // use 'S256' for production
//       })
//    res.redirect(url)
// })
//
// // Step 2: Twitter redirects back with code
// app.get('/callback', async (req, res) => {
//    const { code } = req.query
//    try {
//       const tokenRes = await axios.post(
//          'https://api.twitter.com/2/oauth2/token',
//          qs.stringify({
//             grant_type: 'authorization_code',
//             client_id: CLIENT_ID,
//             redirect_uri: REDIRECT_URI,
//             //@ts-ignore
//             code,
//             code_verifier: 'challenge', // must match code_challenge from /login
//          }),
//          {
//             headers: {
//                'Content-Type': 'application/x-www-form-urlencoded',
//                Authorization:
//                   'Basic ' +
//                   Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
//                      'base64'
//                   ),
//             },
//          }
//       )
//
//       const access_token = tokenRes.data.access_token
//
//       // Fetch bookmarks
//       const bookmarks = await axios.get(
//          'https://api.twitter.com/2/users/me/bookmarks',
//          {
//             headers: {
//                Authorization: `Bearer ${access_token}`,
//             },
//          }
//       )
//
//       res.json(bookmarks.data)
//    } catch (err) {
//       console.error(err.response?.data || err.message)
//       res.status(500).send('Authentication failed')
//    }
// })
//
// app.listen(port, () => {
//    console.log(`🚀 Visit http://localhost:${port}/login to authenticate`)
//    open(`http://localhost:${port}/login`)
// })
