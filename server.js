// Dependencies ////////////////////////////////////////////
import express from 'express'

// Configuration ///////////////////////////////////////////
const PORT = 5163

// Web server setup ////////////////////////////////////////
const app = express()

// This line configures your server to serve static files from the './public/' directory.
app.use(express.static('public'))

// Ready for browsers to connect ///////////////////////////
const displayPort = function () {
  console.log('Listening on ' + PORT)
}

// This line starts your server and makes it listen on port 5163.
app.listen(PORT, displayPort)
