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

  async createMatches(req: Request, res: Response) {
    const { homeTeam, awayTeam, awayTeamGoals, homeTeamGoals } = req.body;

    const dataMatch = await this.matcheService
      .createMatche({ homeTeam, awayTeam, awayTeamGoals, homeTeamGoals });
    if (homeTeam === awayTeam) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    if (!dataMatch) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(dataMatch);
  }
}
