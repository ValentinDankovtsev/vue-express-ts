import { hash } from 'bcrypt';
import { Service } from 'typedi';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { Book } from '@interfaces/books.interface';

@Service()
export class BooksService {
  public async findAllBooks(): Promise<Book[]> {
    const { rows } = await pg.query(`
    SELECT
      *
    FROM
      books
    `);
    return rows;
  }

  public async findBookById(bookId: number): Promise<Book> {
    const { rows, rowCount } = await pg.query(
      `
    SELECT
      *
    FROM
      books
    WHERE
      id = $1
    `,
      [bookId],
    );
    if (!rowCount) throw new HttpException(409, [{ book: ["book doesn't exist"] }]);

    return rows[0];
  }

  public async createBook(bookData: Book): Promise<Book> {
    const { description, title } = bookData;
    const { rows } = await pg.query(
      `
    SELECT EXISTS(
      SELECT
        title
      FROM
        books
      WHERE
        title = $1
    )`,
      [title],
    );
    if (rows[0].exists) throw new HttpException(409, [{ title: [`This title ${title} already exists`] }]);

    const { rows: createBookData } = await pg.query(
      `
      INSERT INTO
        books(
          "title",
          "description"
        )
      VALUES ($1, $2)
      RETURNING "title", "description"
      `,
      [title, description],
    );

    return createBookData[0];
  }

  public async updateBook(bookId: number, bookData: Book): Promise<Book[]> {
    const { rows: findBook, rowCount } = await pg.query(
      `
    SELECT
      id
    FROM
      books
    WHERE
      id = $1
    `,
      [bookId],
    );

    console.log(findBook, 'findBook');

    if (findBook[0].exists) throw new HttpException(409, [{ book: ["book doesn't exist"] }]);

    const { description, title } = bookData;

    const { rows: updateBookData } = await pg.query(
      `
      UPDATE
        books
      SET
        "title" = $2,
        "description" = $3
      WHERE
        "id" = $1
      RETURNING "title", "description"
    `,
      [bookId, title, description],
    );

    return updateBookData;
  }

  public async deleteBook(bookId: number): Promise<Book[]> {

    const { rows: findBook } = await pg.query(
      `
        SELECT
          id
        FROM
          books
        WHERE
          id = $1
      `,
      [bookId],
    );

    console.log(findBook, 'findBook')

    if (findBook[0].exists) throw new HttpException(409, [{ book: ["book doesn't exist"] }]);

    const { rows: deleteBookData } = await pg.query(
      `
      DELETE
      FROM
        books
      WHERE
        id = $1
      RETURNING "title", "description"
      `,
      [bookId],
    );

    return deleteBookData;
  }
}
