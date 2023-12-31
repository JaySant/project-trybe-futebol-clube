import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamsControllers {
  public teamService = new TeamService();

  async getTeams(_req: Request, res: Response) {
    const getAll = await this.teamService.findTeam();
    return res.status(200).json(getAll);
  }

  async getIdTeams(req: Request, res: Response) {
    const { id } = req.params;
    const getId = await this.teamService.findById(id);
    return res.status(200).json(getId);
  }
}
