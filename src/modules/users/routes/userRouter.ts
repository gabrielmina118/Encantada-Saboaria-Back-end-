import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UserController from '../controller/UserController';

export const userRouter = Router();

const userController = new UserController();

userRouter.post(
  '/cadastro',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      senha: Joi.string().required(),
    },
  }),
  userController.create,
);
