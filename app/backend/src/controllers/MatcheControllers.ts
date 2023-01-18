import { Request, Response } from 'express';
import MatchesService from '../services/MatcheService';

export default class MatchesControllers {
  public matcheService = new MatchesService();

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    console.log(inProgress);
    if (inProgress === 'false' && inProgress !== undefined) {
      const findFalseProgress = await this.matcheService.findProgress(false);
      console.log('deu false');
      return res.status(200).json(findFalseProgress);
    }
    if (inProgress === 'true' && inProgress !== undefined) {
      const findTrueProgress = await this.matcheService.findProgress(true);
      console.log('deu verdadeiro');
      res.status(200).json(findTrueProgress);
    } else {
      const getAllMatches = await this.matcheService.findMatches();
      console.log('listamos todos');
      res.status(200).json(getAllMatches);
    }
  }
}
