import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';

export default class MatchesService {
  public matches = MatchesModel;

  public async findMatches(): Promise<MatchesModel[] | undefined> {
    const getAllMatches = await this.matches.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return getAllMatches;
  }

  public async findProgress(query: boolean): Promise<MatchesModel[] | undefined> {
    // console.log(query);
    const findAllMatches = await this.matches.findAll({
      where: { inProgress: query },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return findAllMatches;
  }
}
