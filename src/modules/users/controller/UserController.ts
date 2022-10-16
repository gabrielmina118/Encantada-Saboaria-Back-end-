import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class UserController {
  public create = async (req: Request, res: Response): Promise<Response> => {
    const { nome, email, senha } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({nome,email,senha});

    return res.status(201).send(user);
  };
}

export default UserController;
