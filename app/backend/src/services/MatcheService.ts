import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import { IMatches } from '../interfaces/IMatches';
import { response } from '../interfaces/IResponse';

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

  public async createMatche(matchesData: IMatches): Promise<response> {
    const { awayTeam, awayTeamGoals, homeTeam, homeTeamGoals } = matchesData;
    if (awayTeam === homeTeam) {
      return { status: 422, response: 'It is not possible to create a match with two equal teams' };
    }
    const getHome = await this.teams.findByPk(homeTeam);
    const getAwayTeam = await this.teams.findByPk(awayTeam);

    if (!getHome || !getAwayTeam) {
      return { status: 404, response: 'There is no team with such id!' };
    }
    const create = await this.matches
      .create({ awayTeam, awayTeamGoals, homeTeam, homeTeamGoals, inProgress: true });
    return { status: null, response: create };
  }

  public async updateMatches(id: string): Promise<response> {
    await this.matches.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }
}
