import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import UsersModel from '../database/models/UsersModel';
import { IUsers } from '../interfaces/IUsers';
import { response } from '../interfaces/IResponse';

dotenv.config();

export default class UserService {
  public user = UsersModel;
  public jwt = jwt;

  public async authEmail({ email, password }: IUsers): Promise<response | undefined> {
    const emailregex = /\S+@\S+\.\S+/;
    const allFields = !password || !email;
    if (allFields) {
      return { status: 400, message: 'All fields must be filled' };
    }
    const userLogin = await this.user.findOne({ where: { email } });

    if (!userLogin) return { status: 401, message: 'Incorrect email or password' };

    if (!bcrypt.compareSync(password, userLogin.password) || !emailregex.test(email)) {
      return { status: 401, message: 'Incorrect email or password' };
    }
    const token = this.generateToken((userLogin as IUsers));
    return { status: null, message: token };
  }

  public generateToken(login: IUsers) {
    const payload = { id: login.id, email: login.email, role: login.role };
    return this.jwt.sign(payload, process.env.JWT_SECRET as string, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
  }

  public async getUser(user: IUsers) {
    const userExist = await this.user.findOne({ where: { email: user.email } });
    if (!userExist) return { status: 404, message: 'User not exist' };
    return userExist;
  }

  public validate(token: string) {
    return this.jwt.verify(token, process.env.JWT_SECRET as string);
  }
}
