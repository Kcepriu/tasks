import { Response, Request, NextFunction } from 'express';
import HttpError from '../helpers/HttpError';
import { getPayloadAccessToken } from '../helpers/crypto';
import { User } from '../entities/User';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization = '' } = req.headers;
  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer') {
    next(HttpError(401));
  }

  try {
    // @ts-ignore
    const { id = '' } = getPayloadAccessToken(token) || {};

    const user = await User.findOneBy({ id });

    if (!user || !user.accessToken || user.accessToken !== token) {
      next(HttpError(401));
    }

    // @ts-ignore
    req.user = user;

    next();
  } catch (error) {
    next(HttpError(401));
  }
};
