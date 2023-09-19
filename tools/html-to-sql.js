// Import required modules using ES module syntax
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'node-html-parser';

// Load and parse the HTML file
const htmlFilePath = 'C:\\Users\\msmit\\OneDrive\\Documents\\CVTC\\SQC\\sqc-project-MarissaSmith\\data\\PrideandPrejudice.htm';
 
const html = readFileSync(htmlFilePath, 'utf8'); 
const root = parse(html);

// Select elements with the id "pg-header"
const books = root.querySelectorAll('#pg-header');
const chapters = root.querySelectorAll('a.pginternal');
const texts = root.querySelectorAll('body'); 

// Process and generate SQL statements for Books
let sqlStatementsBooks = '';
books.forEach((book) => {
  const bookTitle = book.querySelector('#pg-machine-header > p:nth-child(1) > strong:nth-child(1)').text; 
  const bookAuthor = book.querySelector('#pg-header-authlist > p:nth-child(1)').text; 
  const publicationDate = book.querySelector('#pg-machine-header > p:nth-child(3)').text; 

  const insertSql = `INSERT INTO Books (title, author, publication_date) VALUES ('${bookTitle}', '${bookAuthor}', '${publicationDate}');`;
  sqlStatementsBooks += insertSql + '\n';
});

// Process and generate SQL statements for Chapters
let sqlStatementsChapters = '';
chapters.forEach((chapter) => {
  const chapterTitle = chapter.querySelector('').text; 
  const bookId = chapter.querySelector('').text; 

  const insertSql = `INSERT INTO Chapters (title, book_id) VALUES ('${chapterTitle}', ${bookId});`;
  sqlStatementsChapters += insertSql + '\n';
});

// Process and generate SQL statements for Texts
let sqlStatementsTexts = '';
texts.forEach((text) => {
  const content = text.querySelector('').text; 
  const chapterId = text.querySelector('').text; 

  const insertSql = `INSERT INTO Texts (content, chapter_id) VALUES ('${content}', ${chapterId});`;
  sqlStatementsTexts += insertSql + '\n';
});

// Write SQL statements to a file
fs.writeFileSync('./docs/generated-schema.sql', sqlStatementsBooks + sqlStatementsChapters + sqlStatementsTexts, 'utf8');
