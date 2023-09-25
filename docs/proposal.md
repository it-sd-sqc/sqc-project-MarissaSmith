# My Project: Text Insights Explorer

An application designed for retrieving text from Gutenberg books.

## Data source

- [Pride and Prejudice](https://www.gutenberg.org/ebooks/1342) by Jane Austen

## Items of interest

- Chapters
- Character dialogues
- Themes and motifs

## Proposed layout

![Proposed Layout](../docs/layout.png "Sample Layout")

## ER Diagrams
```mermaid
---
title: Text Explorer Diagram
---
erDiagram
  Books ||--o{ Chapters : "Contains"
  Chapters }o--|| Texts : "Contains"

  Books {
    id SERIAL pk
    title TEXT "Book title"
    author TEXT "Author's name"
    publication_date DATE "Publication date"
  }

  Chapters {
    id SERIAL pk
    title TEXT "Chapter title"
    book_id INTEGER fk "Book"
  }

  Texts {
    id SERIAL pk
    content TEXT "Text content"
    chapter_id INTEGER fk "Chapter"
  }
```
