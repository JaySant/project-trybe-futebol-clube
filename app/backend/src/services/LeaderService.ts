import ILeaderBoard from '../interfaces/ILeaderBoard';
import Matches from '../database/models/MatchesModel';
import MatchesService from './MatcheService';
import TeamsService from './TeamService';
import leaderBoardHome from '../utils.ts/leaderBoardHome';

export default class LeaderBoardService {
  matches = Matches;
  public matchesService = new MatchesService();
  public teamsService = new TeamsService();
  objLeaderBoard: ILeaderBoard = {
    name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: '',
  };

  public async getLeaderboardHome() {
    const teams = await this.teamsService.findTeam();
    const match = await this.matchesService.findProgress(false);

    const points = await Promise.all(teams.map((team) => (
      leaderBoardHome(this.objLeaderBoard, team, match)
    )));
    return LeaderBoardService.sortPoints(points);
  }

  public static sortPoints = (board: ILeaderBoard[]): ILeaderBoard[] => {
    const pointsBoard = board.sort((a, b) => {
      if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
      if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
      if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
      if (a.goalsOwn !== b.goalsOwn) return a.goalsOwn - b.goalsOwn;
      return 1;
    });
    return pointsBoard;
  };
}
