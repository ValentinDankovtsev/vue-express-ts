import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config';
import pg from '@database';
import { HttpException } from '@exceptions/httpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { log } from 'winston';

const getAuthorization = req => {
  const cookie = req.cookies['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const decode = (await verify(Authorization, SECRET_KEY)) as DataStoredInToken;
      if(decode) {
        next();
      } else {
        next(new HttpException(401, [{ auth: ['Wrong authentication token'] }]))
      }

      // const { rows, rowCount } = await pg.query(
      //   `
      //   SELECT
      //     "email",
      //     "password"
      //   FROM
      //     users
      //   WHERE
      //     "id" = $1
      // `,
      //   id,
      // );
      //
      // if (rowCount) {
      //   req.user = rows[0];
      //   next();
      // } else {
      //   next(new HttpException(401, [{ auth: ['Wrong authentication token'] }]));
      // }
    } else {
      next(new HttpException(404, [{ auth: ['Authentication token missing'] }]));
    }
  } catch (error) {
    next(new HttpException(401, [{ auth: ['Wrong authentication token'] }]));
  }
};
