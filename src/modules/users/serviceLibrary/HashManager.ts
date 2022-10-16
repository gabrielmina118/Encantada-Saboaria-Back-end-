import { compare, genSalt, hash } from 'bcryptjs';
import { config } from 'dotenv';
config();

class HashManager {
  async hash(password: string): Promise<string> {
    const cost = Number(process.env.COST_HASH);
    const salt = await genSalt(cost);
    const hashPassword = await hash(password, salt);

    return hashPassword;
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    const hashCompare = await compare(password, hash);
    return hashCompare;
  }
}

export default HashManager;
