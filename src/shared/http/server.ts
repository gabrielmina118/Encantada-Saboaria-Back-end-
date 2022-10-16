import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { config } from 'dotenv';
import BaseError from '../errors/BaseError';

config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof BaseError) {
    return res.status(error.statusCode).send({ message: error.message });
  }
  return res.status(500).send({ message: error.message });
});

app.listen(3003, () => {
  console.log(`Server is running on port ${process.env.APP_API_URL}`);
});
