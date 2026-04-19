import { type Request, type Response, type NextFunction } from 'express';
import { NewEntrySchema } from './types.ts';
import { z } from 'zod';

export const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const errorMiddleware = (error: unknown, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof z.ZodError) {
    const errorMessages = error.issues.map((issue) => {
      const field = issue.path[0] as string;
      const value = req.body[field] !== undefined ? `: ${req.body[field]}` : '';
      return `Incorrect ${field}${value}`;
    });
    res.status(400).send(`Error: ${errorMessages.join(', ')}`);
  } else {
    next(error);
  }
};
