const express = require('express')
const bodyParser = require('body-parser')
const database = require('./database')
const app = express()
const router = require('./routes')
const cookieParser = require('cookie-parser')

require('ejs')
app.set('view engine', 'ejs');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(router)

// app.get('/', (request, response) => {
//   database.getAlbums((error, albums) => {
//     if (error) {
//       response.status(500).render('error', { error: error })
//     } else {
//       response.render('index', { albums: albums })
//     }
//   })
// })



app.use((request, response) => {
  response.status(404).render('not_found')
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}...`)
})
