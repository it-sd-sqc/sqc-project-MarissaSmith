// Dependencies ///////////////////////////////////////////
import 'dotenv/config'
import express from 'express'
import pkg from 'pg'
const { Pool } = pkg

// Configuration //////////////////////////////////////////
const PORT = process.env.PORT || 5163;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})
export const query = async function (sql, params) {
  let client
  let results = []
  try {
    client = await pool.connect()
    const response = client.query(sql, params)
    if (response && response.rows) {
      results = response.rows
    }
  } catch (err) {
    console.error(err)
  }
  if (client) client.release()
  return results
}

// Configure the web server ///////////////////////////////
express()
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  .set('views', 'views')
  .set('view engine', 'ejs')
.get('/', function (req, res) {
  res.render('pages/index', {title: 'Home'})
})

.listen(PORT, () => console.log(`Listening on ${PORT}`))

// // Set the 'views' directory and view engine (EJS)
// app.set('views', 'views');
// app.set('view engine', 'ejs');

// // Serve static files from the 'public' directory
// app.use(express.static('public'));

// Routes /////////////////////////////////////////////////

// app.get('/', (req, res) => {
//   res.render('pages/index', { pageTitle: 'Home' });
// });

// app.get('/about', (req, res) => {
//   res.render('pages/about', { pageTitle: 'About' });
// });

// // Ready for browsers to connect //////////////////////////
// app.listen(PORT, () => {
//   console.log('Listening on ' + PORT);
// });



/*// Configuration ///////////////////////////////////////////
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
*/