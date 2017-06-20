const express = require('express')

const router = express.Router()

router.get('/', (request, response) => {
  response.render('splash')
})

router.get('/sign-up', (request, response) => {
  response.render('sign-up')
})

router.post('/sign-up', (request, response) => {
  response.render('sign-up')
})


router.get('/sign-in', (request, response) => {
  response.render('sign-in')
})


router.get('/albums/:albumID', (request, response) => {
  const albumID = request.params.albumID

  database.getAlbumsByID(albumID, (error, albums) => {
    if (error) {
      response.status(500).render('error', { error: error })
    } else {
      const album = albums[0]
      response.render('album', { album: album })
    }
  })
})

module.exports = router
