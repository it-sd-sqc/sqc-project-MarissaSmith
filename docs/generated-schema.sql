DROP TABLE IF EXISTS chapters CASCADE;
DROP TABLE IF EXISTS books CASCADE;

-- Create the "books" table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

-- Create the "chapters" table
CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  book_title TEXT NOT NULL,
  content TEXT NOT NULL
);

