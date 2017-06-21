const pg = require('pg')

const dbName = 'vinyl'
const connectionString = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`
const client = new pg.Client(connectionString)

client.connect()

// Query helper function
const query = function(sql, variables, callback){
  console.log('QUERY ->', sql.replace(/[\n\s]+/g, ' '), variables)

  client.query(sql, variables, function(error, result){
    if (error){
      console.log('QUERY <- !!ERROR!!')
      console.error(error)
      callback(error)
    }else{
      console.log('QUERY <-', JSON.stringify(result.rows))
      callback(error, result.rows)
    }
  })
}

const getAlbums = function(callback) {
  query("SELECT * FROM albums", [], callback)
}

const getAlbumsByID = function(albumID, callback) {
  query("SELECT * FROM albums WHERE id = $1", [albumID], callback)
}
const addUser = function(username, email, password, callback) {
  query("INSERT INTO users VALUES (DEFAULT, $1, $2, $3)", [username, email, password], callback)
}

const userSignIn = function(username, password, callback) {
  query("SELECT * FROM users WHERE username = $1 AND password = $2", [username, password], callback)
}

const addReview = function(userId, albumId, content, callback) {
  query("INSERT INTO reviews VALUES (DEFAULT, $1, $2, $3)", [userId, albumId, content], callback)
}

const getReviewsByRecordId = function(albumId, callback){
  query('SELECT * FROM reviews WHERE album_id = $1',[albumId], callback)
}

const outerJoinTry = function(albumId, callback){
  query('SELECT * FROM albums INNER JOIN reviews ON albums.id = reviews.album_id WHERE album_id = $1',[albumId], callback)

}

// const getRecordData = function(albumId, callback) {
//   return new Promise( (resolve, reject) => { getAlbumsByID(albumId, (error, response) => resolve(response[0])) })
//     .then( (res) => {
//       const album = res
//       return new Promise( (resolve, reject) => {
//        getReviewsByRecordId(album.id, (error, response) => {
//         album.reviews = response
//         console.log( "=-=-=-> album", album )
//         resolve(album)
//       })
//     })
//     })
//     .catch( error => {
//     console.log( "=-=-=-> error", error )
//   })
// }

module.exports = {
  getAlbums,
  getAlbumsByID,
  addUser,
  userSignIn,
  addReview,
  getReviewsByRecordId,
  getRecordData,
  outerJoinTry
}
