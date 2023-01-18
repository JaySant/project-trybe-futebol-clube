import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  public matches = MatchesModel;

  public async findMatches(): Promise<MatchesModel[]> {
    const getAllMatches = await this.matches.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return getAllMatches;
  }
}
