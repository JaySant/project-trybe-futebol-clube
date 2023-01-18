import { Request, Response } from 'express';
import TeamsService from '../services/TeamService';

export default class TeamsControllers {
  public teamService = new TeamsService();

  async getTeams(_req: Request, res: Response) {
    const getAll = await this.teamService.findTeam();
    return res.status(200).json(getAll)
   }
}