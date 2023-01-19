import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { IMatches } from '../interfaces/IMatches';

export default class MatchesService {
  public matches = MatchesModel;
  public teams = TeamsModel;

  public async findMatches(): Promise<MatchesModel[] | undefined> {
    const getAllMatches = await this.matches.findAll({
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return getAllMatches;
  }

  public async findProgress(query: boolean): Promise<MatchesModel[] | undefined> {
    const findAllMatches = await this.matches.findAll({
      where: { inProgress: query },
      include: [
        { model: TeamsModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamsModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ] });
    return findAllMatches;
  }

  public async createMatche(matchesData: IMatches): Promise<MatchesModel | boolean> {
    const getTeams = await this.teams.findAll();
    const verifyHomeTeam = getTeams.some(({ id }) => matchesData.homeTeam === id);
    const verifyAwayTeam = getTeams.some(({ id }) => matchesData.awayTeam === id);

    if (!verifyAwayTeam || !verifyHomeTeam) {
      return false;
    }
    const create = await this.matches.create({ ...matchesData, inProgress: true });
    return create;
  }
}
