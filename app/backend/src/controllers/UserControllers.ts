import { Request, Response } from 'express';
import { response } from '../interfaces/IResponse';
import { IUsers } from '../interfaces/IUsers';
import UserService from '../services/UserServices';

export default class UsersController {
  public userService = new UserService();

  async authLogin(req: Request, res: Response) {
    const { body } = req;
    const { status, message } = await this.userService.authEmail(body) as {
      status: number | null, message: string
    };
    if (status) {
      return res.status(status).json({ message });
    }
    res.status(200).json({ token: message });
  }

  async tokenValidate(req: Request, res: Response) {
    const { authorization } = req.headers;
    const objectUser = this.userService.validate(authorization as string);
    const user = await this.userService.getUser(objectUser as IUsers);
    if ((user as response).status) {
      return res.status((user as response).status as number)
        .json({ message: (user as response).message });
    }
    res.status(200).json({ role: (user as IUsers).role });
  }
}
