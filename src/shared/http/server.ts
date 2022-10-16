import { config } from 'dotenv';
import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { routes } from './routers';
import cors from 'cors';
import BaseError from '../errors/BaseError';
import { errors } from 'celebrate';
import "../typeorm"
config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());


app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof BaseError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  return res.status(500).send({ message: error.message });
});

app.listen(3003, () => {
  console.log(`Server is running on port ${process.env.APP_API_URL}`);
});
