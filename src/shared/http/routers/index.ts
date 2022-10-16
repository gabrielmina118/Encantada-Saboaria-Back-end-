import { Router } from 'express';
import { userRouter } from '../../../modules/users/routes/userRouter';

export const routes = Router();

routes.use('/usuario', userRouter);
