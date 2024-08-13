import {Router} from 'express';
import {CreateBookDto} from '@dtos/books.dto';
import {Routes} from '@interfaces/routes.interface';
import {ValidationMiddleware} from '@middlewares/validation.middleware';
import {AuthMiddleware} from '@middlewares/auth.middleware';
import {BooksController} from '@controllers/books.controller';

export class BookRoute implements Routes {
  public path = '/books';
  public router = Router();
  public book = new BooksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.book.getBooks);
    this.router.get(`${this.path}/:id(\\d+)`, this.book.getBookById);
    this.router.post(`${this.path}`, [AuthMiddleware, ValidationMiddleware(CreateBookDto)], this.book.createBook);
    this.router.put(`${this.path}/:id(\\d+)`, this.book.updateBook);
    this.router.delete(`${this.path}/:id(\\d+)`, this.book.deleteBook);
  }
}
