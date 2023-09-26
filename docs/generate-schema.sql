-- Drop existing tables
DROP TABLE IF EXISTS "Texts";
DROP TABLE IF EXISTS "Chapters";
DROP TABLE IF EXISTS "Books";

-- Create the "Books" table
CREATE TABLE "Books" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "author" TEXT NOT NULL,
  "publicationDate" DATE
);

-- Create the "Chapters" table
CREATE TABLE "Chapters" (
  "id" SERIAL PRIMARY KEY,
  "title" TEXT NOT NULL,
  "bookId" INTEGER REFERENCES "Books"("id") NOT NULL
);

-- Create the "Texts" table
CREATE TABLE "Texts" (
  "id" SERIAL PRIMARY KEY,
  "content" TEXT NOT NULL,
  "chapterId" INTEGER REFERENCES "Chapters"("id") NOT NULL
);

