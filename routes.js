const express = require('express')
const database = require('./database')

const router = express.Router()

router.get('/', (request, response) => {
    let user
    if(request.cookies.user) {
      user = request.cookies.user
    }
    database.getAlbumsAndReviews((error, albumsAndReviews) => {
      if (error) {
        response.status(500).render('error', { error: error })
      } else {
        user ? response.render('home',  {albumsAndReviews, user })
              : response.render('home',  {albumsAndReviews})
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
  const {username, email, password} = request.body
  database.addUser(username, email, password , (error) => {
    if(error) {
      response.status(500).render('error', { error: error })
    } else {
      database.userSignIn(username, password, (error, user) => {
        if(error) {
        response.status(500).render('error', { error: error })
      } else {
        const userInfo = user
        const userID = user[0].id
        response.cookie('user', userInfo, {expires: new Date(Date.now() + 9999999999)} )
      response.redirect(`/users/${userID}`)
    }
  })
}})})

router.get('/sign-in/:userId', (request, response) => {
})

router.post('/sign-in/user', (request, response) => {
  const {username, email, password} = request.body
  database.userSignIn(username, password , (error, user) => {
    if(error) {
      response.status(500).render('error', { error: error })
    } else {
      const userInfo = user[0]
      const userID = user[0].id
      response.cookie('user', userInfo, {expires: new Date(Date.now() + 9999999999)} )
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
  let user
  if(request.cookies.user) {
    user = request.cookies.user
  }
  const albumID = request.params.albumID

  database.albumJOINreviews(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      if (albums.length === 0) {
        database.getAlbumsByID(albumID, (error, album) => {
          if (error) {
            response.status(500).render('error', { error: error })
          } else {
            user ? response.render('album', { album, user})
                  : response.render('album', { album})
          }
        })
      } else{
      user ? response.render('album', { album: albums, user })
            : response.render('album', { album: albums })
    }
    }
  })
})

router.get('/albums/:albumID/review', (request, response) => {
  let user
  if(request.cookies.user) {
    user = request.cookies.user
  }
  const albumId = request.params.albumID
  database.getAlbumsByID(albumId, (error, album) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      user ? response.render('review', { album, user })
            : response.render('review', { album })
    }
  })
})

router.post('/albums/:albumID/review', (request, response) => {
  if(!request.cookies.user){
    response.redirect(`/`)
  }

  const albumId = request.params.albumID
  const userId = request.cookies.user.id
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
