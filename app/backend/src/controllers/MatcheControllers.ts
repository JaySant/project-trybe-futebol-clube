import { Request, Response } from 'express';
import MatchesService from '../services/MatcheService';

export default class MatchesControllers {
  public matcheService = new MatchesService();

  async getMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    if (inProgress === 'false' && inProgress !== undefined) {
      const findFalseProgress = await this.matcheService.findProgress(false);
      return res.status(200).json(findFalseProgress);
    }
    if (inProgress === 'true' && inProgress !== undefined) {
      const findTrueProgress = await this.matcheService.findProgress(true);
      res.status(200).json(findTrueProgress);
    } else {
      const getAllMatches = await this.matcheService.findMatches();
      res.status(200).json(getAllMatches);
    }
  }

  async createMatches(req: Request, res: Response) {
    const create = await this.matcheService
      .createMatche(req.body);
    if (create.status) {
      return res.status(create.status as number).json({ message: create.response });
    }
    return res.status(201).json(create.response);
  }

  async uptadeMatches(req: Request, res: Response) {
    const { id } = req.params;
    const updateFinish = await this.matcheService.updateMatches(id as string);
    res.status(200).json(updateFinish);
  }
}
