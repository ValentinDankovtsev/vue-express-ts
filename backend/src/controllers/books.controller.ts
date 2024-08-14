import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Book } from '@interfaces/books.interface';
import { BooksService } from '@services/books.service';

export class BooksController {
  public book = Container.get(BooksService);

  public getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllBooksData: Book[] = await this.book.findAllBooks();

      res.status(200).json({ data: findAllBooksData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const BookId = Number(req.params.id);
      const findOneBookData: Book = await this.book.findBookById(BookId);

      res.status(200).json({ data: findOneBookData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.body, 'req');
    try {
      const BookData: Book = req.body;
      const createBookData: Book = await this.book.createBook(BookData);

      res.status(201).json({ data: createBookData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const BookId = Number(req.params.id);
      const BookData: Book = req.body;
      const updateBookData: Book[] = await this.book.updateBook(BookId, BookData);

      res.status(200).json({ data: updateBookData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const BookId = Number(req.params.id);
      const deleteBookData: Book[] = await this.book.deleteBook(BookId);

      res.status(200).json({ data: deleteBookData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
