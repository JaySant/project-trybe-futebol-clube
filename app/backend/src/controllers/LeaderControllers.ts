import { Request, Response } from 'express';
import LeaderService from '../services/LeaderService';

export default class LeaderController {
  public leaderService = new LeaderService();

  public async getLeaderHome(_req: Request, res: Response) {
    const getLead = await this.leaderService.getLeaderboardHome();
    res.status(200).json(getLead);
  }

  public async getLeaderAway(_req: Request, res: Response) {
    const getLeadAway = await this.leaderService.getLeaderboardAway();
    res.status(200).json(getLeadAway);
  }
}
