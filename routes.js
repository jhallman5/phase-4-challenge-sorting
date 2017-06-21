const express = require('express')
const database = require('./database')

const router = express.Router()



router.get('/', (request, response) => {
  console.log( "=-=-=-> request.cookies", request.cookies )
    database.getAlbums((error, albums) => {
      if (error) {
        response.status(500).render('error', { error: error })
      } else {
        const album = albums[0]
    response.render('splash',  {albums})
  }
})
})

router.get('/sign-up', (request, response) => {
  response.render('sign-up')
})

router.get('/review', (request, response) => {
  response.render('review')
})

router.get('/sign-in', (request, response) => {
  response.render('sign-in')
})

router.post('/sign-up/user', (request, response) => {
  const {username, email, password} = request.body
  database.addUser(username, email, password , (error) => {
    if(error) {
      response.status(500).render('error', { error: error })
    } else {
      response.cookie('user', {username, email, password}, {expires: new Date(Date.now() + 1000 + 60 + 5)} )
      response.render('user_profile', {username})
    }
  })
})

router.post('/sign-in/user', (request, response) => {
  const {username, email, password} = request.body
  database.userSignIn(username, password , (error) => {
    if(error) {
      response.status(500).render('error', { error: error })
    } else {
      response.cookie('user', {username, email, password}, {expires: new Date(Date.now() + 1000 + 60 + 5)} )
      response.render('user_profile', {username: username})
    }
  })
})

// router.post('/log_out/user', (request, response) => {
//   response.clearCookie('user' )
//   response.render('splash')
// })

router.get('/albums/:albumID', (request, response ) => {
  const albumID = request.params.albumID

  database.outerJoinTry(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      response.render('album', { album: albums })
    }
  })
})

router.get('/albums/:albumID/review', (request, response) => {
  const albumId = request.params.albumID
  database.getAlbumsByID(albumId, (error, album) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      response.render('review', { album: album })
    }
  })
})

module.exports = router
