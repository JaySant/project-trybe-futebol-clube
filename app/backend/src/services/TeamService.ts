import { ITeams } from '../interfaces/ITeams';
import TeamsModel from '../database/models/TeamsModel';

export default class TeamsService {
  public teams = TeamsModel;

  public async findTeam(): Promise<ITeams[]> {
    const getAllTeam = await this.teams.findAll();
    return getAllTeam;
  }

  public async findById(id: string): Promise<ITeams | null> {
    const getIdTeam = await this.teams.findOne({ where: { id } });
    return getIdTeam;
  }
}
