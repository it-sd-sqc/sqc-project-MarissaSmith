// Import required modules using ES module syntax
import { readFileSync, writeFileSync } from 'fs';
import { parse } from 'node-html-parser';

// Load and parse the HTML file
const htmlFilePath = 'C:\\Users\\msmit\\OneDrive\\Documents\\CVTC\\SQC\\sqc-project-MarissaSmith\\data\\PrideandPrejudice.htm';
 // Update this path to your actual HTML file
const html = readFileSync(htmlFilePath, 'utf8'); // Use readFileSync from the imported fs module
const root = parse(html);

// The rest of your script remains unchanged


// Select elements with the id "pg-header"
const books = root.querySelectorAll('#pg-header');
const chapters = root.querySelectorAll('a.pginternal');
const texts = root.querySelectorAll('body'); // Update this selector to match your HTML structure

// Process and generate SQL statements for Books
let sqlStatementsBooks = '';
books.forEach((book) => {
  const bookTitle = book.querySelector('#pg-machine-header > p:nth-child(1) > strong:nth-child(1)').text; // Update this selector to match your HTML structure
  const bookAuthor = book.querySelector('#pg-header-authlist > p:nth-child(1)').text; // Update this selector to match your HTML structure
  const publicationDate = book.querySelector('.publication-date').text; // Update this selector to match your HTML structure

  const insertSql = `INSERT INTO Books (title, author, publication_date) VALUES ('${bookTitle}', '${bookAuthor}', '${publicationDate}');`;
  sqlStatementsBooks += insertSql + '\n';
});

// Process and generate SQL statements for Chapters
let sqlStatementsChapters = '';
chapters.forEach((chapter) => {
  const chapterTitle = chapter.querySelector('.title').text; // Update this selector to match your HTML structure
  const bookId = chapter.querySelector('.book-id').text; // Update this selector to match your HTML structure

  const insertSql = `INSERT INTO Chapters (title, book_id) VALUES ('${chapterTitle}', ${bookId});`;
  sqlStatementsChapters += insertSql + '\n';
});

// Process and generate SQL statements for Texts
let sqlStatementsTexts = '';
texts.forEach((text) => {
  const content = text.querySelector('.content').text; // Update this selector to match your HTML structure
  const chapterId = text.querySelector('.chapter-id').text; // Update this selector to match your HTML structure

  const insertSql = `INSERT INTO Texts (content, chapter_id) VALUES ('${content}', ${chapterId});`;
  sqlStatementsTexts += insertSql + '\n';
});

// Write SQL statements to a file
fs.writeFileSync('./docs/generated-schema.sql', sqlStatementsBooks + sqlStatementsChapters + sqlStatementsTexts, 'utf8');
