import express from 'express';
import Book from '../Model/books.model.js';

const router = express.Router();

// Create a new book
router.post('/books', async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update an existing book
router.put('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body);
    if (!book) {
      return res.status(404).json({message : "Book does not exist"});
    }
    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all books
router.get('/books', async (req, res) => {
  try {
    const books = await Book.find({});
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete a book
router.delete('/books/:id', async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get books by author
router.get('/books/author/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const books = await Book.find({ author });
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get books by genre
router.get('/books/genre/:genre', async (req, res) => {
  try {
    const genre = req.params.genre;
    const books = await Book.find({ genre });
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
