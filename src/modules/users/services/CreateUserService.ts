import { getCustomRepository } from 'typeorm';
import BaseError from '../../../shared/errors/BaseError';
import HashManager from '../serviceLibrary/HashManager';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  nome: string;
  email: string;
  senha: string;
}

interface IResponse {
  id: string;
  nome: string;
  email: string;
}

class CreateUserService {
  public async execute({ nome, email, senha }: IRequest):Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const userExist = await userRepository.findByEmail(email);

    if (userExist) {
      throw new BaseError('Já possui um usuário com esse email', 401);
    }

    const hashPassword = await new HashManager().hash(senha);

    const user = userRepository.create({ nome, email, password: hashPassword });

    await userRepository.save(user);

    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
    };
  }
}

export default CreateUserService;
