// utils/verifyAdmin.js
import { errorHandler } from './error.js';

export const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return next(errorHandler(403, 'You are not allowed to perform this action!'));
  }
  next();
};
