// Dependencies ///////////////////////////////////////////
import express from 'express';

// Configuration //////////////////////////////////////////
const PORT = process.env.PORT || 5163;

// Configure the web server ///////////////////////////////
const app = express();

// Set the 'views' directory and view engine (EJS)
app.set('views', 'views');
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes /////////////////////////////////////////////////

app.get('/', (req, res) => {
  res.render('pages/index', { pageTitle: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('pages/about', { pageTitle: 'About' });
});

// Ready for browsers to connect //////////////////////////
app.listen(PORT, () => {
  console.log('Listening on ' + PORT);
});



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