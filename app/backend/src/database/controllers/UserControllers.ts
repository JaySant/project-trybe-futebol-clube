import { Request, Response } from 'express';
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
}
