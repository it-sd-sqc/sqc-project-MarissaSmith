-- Drop existing tables if they exist
DROP TABLE IF EXISTS chapters CASCADE;
DROP TABLE IF EXISTS books CASCADE;

-- Create the "Books" table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL
);

-- Create the "Chapters" table
CREATE TABLE chapters (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  book_title TEXT NOT NULL,
  content TEXT NOT NULL
);

