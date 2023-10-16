// Dependencies
import 'dotenv/config'
import express from 'express'
import pkg from 'pg'
import { readFileSync, openSync, closeSync, writeFileSync } from 'fs'
import { parse } from 'node-html-parser'

const { Pool } = pkg

// Function to extract books and chapters from HTML
const extractBooksAndChapters = (root) => {
  const books = []
  const chapters = []

  // Extract books and chapters
  const bookElements = root.querySelectorAll('.book')
  bookElements.forEach((bookElement) => {
    const bookTitle = bookElement.querySelector('.book-title').text
    const chaptersElement = bookElement.querySelector('.chapters')
    const chapterElements = chaptersElement.querySelectorAll('.chapter')

    books.push({ title: bookTitle })

    chapterElements.forEach((chapterElement) => {
      const chapterTitle = chapterElement.querySelector('.chapter-title').text
      const chapterContent = chapterElement.querySelector('.chapter-content').text

      chapters.push({
        bookTitle,
        title: chapterTitle,
        content: chapterContent,
      })
    })
  })

  return { books, chapters }
}

// Configuration
const PORT = process.env.PORT || 5163
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

// Query functions
export const query = async function (sql, params) {
  let client
  let results = []
  try {
    client = await pool.connect()
    const response = await client.query(sql, params)
    if (response && response.rows) {
      results = response.rows
    }
  } catch (err) {
    console.error(err)
  } finally {
    if (client) client.release()
  }
  return results
}

// Function to fetch chapters from the database
const fetchChapters = async () => {
  const sql = 'SELECT * FROM chapters'
  return await query(sql)
}

// Configure the web server
const app = express()

app
  .use(express.static('public'))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set('views', 'views')
  .set('view engine', 'ejs')

// Routes
app
  .get('/', async function (req, res) {
    res.render('index', { pageTitle: 'Home' })
  })
  .get('/about', async function (req, res) {
    res.render('about', { pageTitle: 'About' })
  })
  .get('/guide', async function (req, res) {
    // Your logic to fetch and display chapters
    const chapters = await fetchChapters()
    res.render('guide', { pageTitle: 'Guide', chapters })
  })

// Function to generate schema from HTML and insert data into the database
const generateSchemaAndInsertData = async () => {
  const srcPath = 'data/1342-h.htm'
  const dstPath = 'docs/generated-schema.sql'

  try {
    const src = readFileSync(srcPath, 'utf8')
    const domRoot = parse(src)

    // Extract book and chapter data
    const { books, chapters } = extractBooksAndChapters(domRoot)

    // Output the data as SQL
    const fd = openSync(dstPath, 'w')

    // Create SQL schema
    // Drop existing tables if they exist
    writeFileSync(fd, 'DROP TABLE IF EXISTS chapters CASCADE;\n')
    writeFileSync(fd, 'DROP TABLE IF EXISTS books CASCADE;\n\n')

    // Create the "books" table
    writeFileSync(fd, '-- Create the "books" table\n')
    writeFileSync(fd, 'CREATE TABLE books (\n')
    writeFileSync(fd, '  id SERIAL PRIMARY KEY,\n')
    writeFileSync(fd, '  title TEXT NOT NULL\n')
    writeFileSync(fd, ');\n\n')

    // Create the "chapters" table
    writeFileSync(fd, '-- Create the "chapters" table\n')
    writeFileSync(fd, 'CREATE TABLE chapters (\n')
    writeFileSync(fd, '  id SERIAL PRIMARY KEY,\n')
    writeFileSync(fd, '  title TEXT NOT NULL,\n')
    writeFileSync(fd, '  book_title TEXT NOT NULL,\n')
    writeFileSync(fd, '  content TEXT NOT NULL\n')
    writeFileSync(fd, ');\n\n')

    // Insert book data
    books.forEach((book) => {
      const { title } = book
      writeFileSync(
        fd,
        `INSERT INTO books (title) VALUES ('${title}');\n`
      )
    })

    // Insert chapter data
    chapters.forEach((chapter) => {
      const { title, bookTitle, content } = chapter
      writeFileSync(
        fd,
        `INSERT INTO chapters (title, book_title, content) VALUES ('${title}', '${bookTitle}', '${content}');\n`
      )
    })

    closeSync(fd)

    // Run the generated schema SQL to populate the database
    const schemaSql = readFileSync(dstPath, 'utf8')
    await pool.query(schemaSql)

    console.log('Schema generated and data inserted successfully.')
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
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
//app.listen(PORT, displayPort) */