import express from 'express'
import BooksController from '../controllers/BooksController.js'

const router = express.Router();

router
    .get('/books', BooksController.listBooks)
    .get('/books/search', BooksController.findPublisher)
    .get('/books/:id', BooksController.getBookById)
    .post('/books', BooksController.registerBook)
    .put('/books/:id', BooksController.updateBook)
    .delete('/books/:id', BooksController.deleteBook);


export default router;