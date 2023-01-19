import ILeaderBoard from '../interfaces/ILeaderBoard';
import Matches from '../database/models/MatchesModel';
import MatchesService from './MatcheService';
import TeamsService from './TeamService';
import leaderBoardHome from '../utils/leaderBoardHome';
import leaderBoardAway from '../utils/leaderBoardAway';

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

  public async getLeaderboardAway() {
    const teams = await this.teamsService.findTeam();
    const match = await this.matchesService.findProgress(false);

    const points = await Promise.all(teams.map((team) => (
      leaderBoardAway(this.objLeaderBoard, team, match)
    )));
    return LeaderBoardService.sortPoints(points);
  }

  public async getLeaderboardAll() {
    const allboard = await Promise.all(
      [...await this.getLeaderboardHome(), ...await this.getLeaderboardAway()],
    );
    const boardReduce = LeaderBoardService.sumPointsHomeandAway(allboard);
    // console.log(allboard);
    // console.log(boardReduce);
    return LeaderBoardService.sortPoints(boardReduce);
  }

  public static sumPointsHomeandAway(matches: ILeaderBoard[]) {
    const score = matches.reduce((acc, cur) => {
      const find = acc.find((el) => el.name === cur.name);
      if (find) {
        find.totalPoints += cur.totalPoints;
        find.totalGames += cur.totalGames;
        find.totalVictories += cur.totalVictories;
        find.totalDraws += cur.totalDraws;
        find.totalLosses += cur.totalLosses;
        find.goalsFavor += cur.goalsFavor;
        find.goalsOwn += cur.goalsOwn;
        find.goalsBalance += cur.goalsBalance;
        find.efficiency = ((find.totalPoints / (find.totalGames * 3)) * 100).toFixed(2);
      } else {
        acc.push(cur);
      }
      return acc;
    }, [] as ILeaderBoard[]);
    return score;
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
