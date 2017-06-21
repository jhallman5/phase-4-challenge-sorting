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
    response.render('home',  {albums})
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

router.post('/sign-up', (request, response) => {
  console.log( "=-=-=-> request.cookies", request.cookies )
  const {username, email, password} = request.body
  database.addUser(username, email, password , (error) => {
    if(error) {
      response.status(500).render('error', { error: error })
    } else {
      response.cookie('user', {username, email, password}, {expires: new Date(Date.now() + 1000 + 60 + 5)} )
      response.redirect(`/sign-in/${userId}`, {username})
    }
  })
})

router.get('/sign-in/:userId', (request, response) => {
})

router.post('/sign-in/user', (request, response) => {
  const {username, email, password} = request.body
  database.userSignIn(username, password , (error, user) => {
    if(error) {
      response.status(500).render('error', { error: error })
    } else {
      const userI = user[0]
      const userID = user[0].id
      console.log( "=-=-=-> userI", userI.id )
      response.cookie('user', userI, {expires: new Date(Date.now() + 9999999999)} )
      response.redirect(`/users/${userID}`)
    }
  })
})

router.post('/log_out', (request, response) => {
  response.clearCookie('user' )
  response.redirect('/')
})

router.get('/users/:userID', (request, response) => {
  const user = request.cookies.user
  response.render('user_profile', {user})
})

router.get('/albums/:albumID', (request, response ) => {
  const albumID = request.params.albumID

  database.outerJoinTry(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
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

router.post('/albums/:albumID/review', (request, response) => {
  const albumId = request.params.albumID
  const userId = 1
  const content = request.body.userReview
  database.addReview(userId, albumId, content, (error, album) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      response.redirect(`/albums/${albumId}`)
    }
  })
})

module.exports = router
