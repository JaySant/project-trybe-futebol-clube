import { Request, Response } from 'express';
import MatchesService from '../services/MatcheService';

export default class MatchesControllers {
  public matcheService = new MatchesService();

  async getMatches(_req: Request, res: Response) {
    const getAllMatches = await this.matcheService.findMatches();
    return res.status(200).json(getAllMatches);
  }
}
